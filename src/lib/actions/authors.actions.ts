'use server'
import prismaService from '@/lib/config/prisma.service'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { uploadAuthorImage, updateAuthorImage, deleteImage } from '@/lib/images/cloudinary.service'
import { writeFile, unlink } from 'fs/promises'
import { join } from 'path'

// Esquemas de validación
const CreateAuthorSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre debe tener máximo 100 caracteres'),
  link: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  description: z.string().max(500, 'La descripción debe tener máximo 500 caracteres').optional(),
  twitter: z.string().max(100, 'El usuario de Twitter debe tener máximo 100 caracteres').optional(),
  instagram: z.string().max(100, 'El usuario de Instagram debe tener máximo 100 caracteres').optional(),
  facebook: z.string().max(100, 'El usuario de Facebook debe tener máximo 100 caracteres').optional(),
  linkedin: z.string().max(100, 'El usuario de LinkedIn debe tener máximo 100 caracteres').optional(),
  profilePicture: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  profileImageId: z.string().optional(),
  userId: z.string().optional(),
  // Nuevo campo para imagen como File
  imageFile: z.any().optional()
})

const UpdateAuthorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre debe tener máximo 100 caracteres'),
  link: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  description: z.string().max(500, 'La descripción debe tener máximo 500 caracteres').optional(),
  twitter: z.string().max(100, 'El usuario de Twitter debe tener máximo 100 caracteres').optional(),
  instagram: z.string().max(100, 'El usuario de Instagram debe tener máximo 100 caracteres').optional(),
  facebook: z.string().max(100, 'El usuario de Facebook debe tener máximo 100 caracteres').optional(),
  linkedin: z.string().max(100, 'El usuario de LinkedIn debe tener máximo 100 caracteres').optional(),
  profilePicture: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
  profileImageId: z.string().optional(),
  userId: z.string().optional(),
  // Nuevo campo para imagen como File
  imageFile: z.any().optional()
})

export type CreateAuthorInput = z.infer<typeof CreateAuthorSchema>
export type UpdateAuthorInput = z.infer<typeof UpdateAuthorSchema>

// Función helper para procesar imagen
async function processAuthorImage(imageFile: File, authorName: string): Promise<{
  imageRecord: any,
  cloudinaryPublicId: string
} | null> {
  if (!imageFile) return null;

  try {
    // Convertir File a buffer y guardarlo temporalmente
    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear archivo temporal
    const tempPath = join('/tmp', `temp_${Date.now()}_${imageFile.name}`);
    await writeFile(tempPath, buffer);

    // Subir a Cloudinary
    const cloudinaryResult = await uploadAuthorImage(tempPath, authorName);

    // Limpiar archivo temporal
    await unlink(tempPath);

    // Crear registro en la base de datos con los campos correctos
    const imageRecord = await prismaService.prisma.image.create({
      data: {
        url: cloudinaryResult.secure_url,
        alt: `Imagen de perfil de ${authorName}`,
        width: cloudinaryResult.width || null,
        height: cloudinaryResult.height || null,
        format: cloudinaryResult.format || null,
        publicId: cloudinaryResult.public_id,
        folder: 'authors',
        size: cloudinaryResult.bytes || null
      }
    });

    return {
      imageRecord,
      cloudinaryPublicId: cloudinaryResult.public_id
    };
  } catch (error) {
    console.error('Error processing author image:', error);
    throw new Error('Error al procesar la imagen');
  }
}

// Crear autor
export async function createAuthor(formData: FormData) {
  try {
    // Extraer datos del FormData
    const rawData = {
      name: formData.get('name') as string,
      link: formData.get('link') as string,
      description: formData.get('description') as string,
      twitter: formData.get('twitter') as string,
      instagram: formData.get('instagram') as string,
      facebook: formData.get('facebook') as string,
      linkedin: formData.get('linkedin') as string,
      profilePicture: formData.get('profilePicture') as string,
      profileImageId: formData.get('profileImageId') as string,
      userId: formData.get('userId') as string,
      imageFile: formData.get('imageFile') as File
    };

    const validatedData = CreateAuthorSchema.parse(rawData);

    // Verificar que el nombre no exista
    const existingAuthor = await prismaService.prisma.author.findFirst({
      where: {
        name: validatedData.name
      }
    });

    if (existingAuthor) {
      return {
        success: false,
        error: `Ya existe un autor con el nombre "${validatedData.name}"`
      };
    }

    // Si se proporciona userId, verificar que no esté ya asociado a otro autor
    if (validatedData.userId) {
      const existingUserAuthor = await prismaService.prisma.author.findFirst({
        where: {
          userId: validatedData.userId
        }
      });

      if (existingUserAuthor) {
        return {
          success: false,
          error: 'Este usuario ya está asociado a otro autor'
        };
      }
    }

    // Procesar imagen si existe
    let imageData = null;
    if (validatedData.imageFile && validatedData.imageFile.size > 0) {
      imageData = await processAuthorImage(validatedData.imageFile, validatedData.name);
    }

    // Crear autor con la imagen procesada
    const author = await prismaService.prisma.author.create({
      data: {
        name: validatedData.name,
        link: validatedData.link || null,
        description: validatedData.description,
        twitter: validatedData.twitter,
        instagram: validatedData.instagram,
        facebook: validatedData.facebook,
        linkedin: validatedData.linkedin,
        profilePicture: validatedData.profilePicture || null,
        profileImageId: imageData?.imageRecord.id || validatedData.profileImageId || null,
        userId: validatedData.userId || null
      },
      include: {
        blogAuthors: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        profileImage: true,
        socialMedia: true
      }
    });

    revalidatePath('/admin/authors');
    revalidatePath('/api/blogs/authors');

    return {
      success: true,
      data: author
    };
  } catch (error) {
    console.error('Error creating author:', error);
    return {
      success: false,
      error: error instanceof z.ZodError
        ? error.issues.map(e => e.message).join(', ')
        : 'Error interno del servidor'
    };
  }
}

// Actualizar autor
export async function updateAuthor(formData: FormData) {
  try {
    // Extraer datos del FormData
    const rawData = {
      id: formData.get('id') as string,
      name: formData.get('name') as string,
      link: formData.get('link') as string,
      description: formData.get('description') as string,
      twitter: formData.get('twitter') as string,
      instagram: formData.get('instagram') as string,
      facebook: formData.get('facebook') as string,
      linkedin: formData.get('linkedin') as string,
      profilePicture: formData.get('profilePicture') as string,
      profileImageId: formData.get('profileImageId') as string,
      userId: formData.get('userId') as string,
      imageFile: formData.get('imageFile') as File
    };

    const validatedData = UpdateAuthorSchema.parse(rawData);

    // Verificar que el autor existe
    const existingAuthor = await prismaService.prisma.author.findUnique({
      where: { id: validatedData.id },
      include: {
        profileImage: true
      }
    });

    if (!existingAuthor) {
      return {
        success: false,
        error: 'Autor no encontrado'
      };
    }

    // Verificar que el nombre no esté en uso por otro autor
    const conflictingAuthor = await prismaService.prisma.author.findFirst({
      where: {
        AND: [
          { id: { not: validatedData.id } },
          { name: validatedData.name }
        ]
      }
    });

    if (conflictingAuthor) {
      return {
        success: false,
        error: `Ya existe otro autor con el nombre "${validatedData.name}"`
      };
    }

    // Si se cambia el userId, verificar que no esté ya asociado a otro autor
    if (validatedData.userId && validatedData.userId !== existingAuthor.userId) {
      const existingUserAuthor = await prismaService.prisma.author.findFirst({
        where: {
          userId: validatedData.userId
        }
      });

      if (existingUserAuthor) {
        return {
          success: false,
          error: 'Este usuario ya está asociado a otro autor'
        };
      }
    }

    // Procesar nueva imagen si existe
    let imageData = null;
    if (validatedData.imageFile && validatedData.imageFile.size > 0) {
      // Si hay una imagen anterior, obtener su public_id
      const oldPublicId = existingAuthor.profileImage?.publicId;

      imageData = await processAuthorImage(validatedData.imageFile, validatedData.name);

      // Eliminar la imagen anterior si existe
      if (oldPublicId) {
        try {
          await deleteImage(oldPublicId);
          // Eliminar registro de la base de datos
          if (existingAuthor.profileImageId) {
            await prismaService.prisma.image.delete({
              where: { id: existingAuthor.profileImageId }
            });
          }
        } catch (error) {
          console.warn('Error deleting old image:', error);
        }
      }
    }

    const updatedAuthor = await prismaService.prisma.author.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        link: validatedData.link || null,
        description: validatedData.description,
        twitter: validatedData.twitter,
        instagram: validatedData.instagram,
        facebook: validatedData.facebook,
        linkedin: validatedData.linkedin,
        profilePicture: validatedData.profilePicture || null,
        profileImageId: imageData?.imageRecord.id || existingAuthor.profileImageId,
        userId: validatedData.userId || null
      },
      include: {
        blogAuthors: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        profileImage: true,
        socialMedia: true
      }
    });

    revalidatePath('/admin/authors');
    revalidatePath('/api/blogs/authors');

    return {
      success: true,
      data: updatedAuthor
    };
  } catch (error) {
    console.error('Error updating author:', error);
    return {
      success: false,
      error: error instanceof z.ZodError
        ? error.issues.map(e => e.message).join(', ')
        : 'Error interno del servidor'
    };
  }
}

// Eliminar autor (completar transacción)
export async function deleteAuthor(id: string) {
  try {
    // Verificar que el autor existe
    const existingAuthor = await prismaService.prisma.author.findUnique({
      where: { id },
      include: {
        blogAuthors: true,
        profileImage: true
      }
    });

    if (!existingAuthor) {
      return {
        success: false,
        error: 'Autor no encontrado'
      };
    }

    // Usar transacción para mantener integridad referencial
    await prismaService.prisma.$transaction(async (tx) => {
      // Primero eliminar todas las relaciones BlogAuthor
      await tx.blogAuthor.deleteMany({
        where: { authorId: id }
      });

      // Eliminar relaciones de redes sociales
      await tx.socialMedia.deleteMany({
        where: {
          AND: [
            { userId: null },
            {
              OR: [
                { authorId: id },
                { userId: existingAuthor.userId }
              ]
            }
          ]
        }
      });

      // Eliminar imagen de perfil si existe
      if (existingAuthor.profileImage) {
        // Eliminar de Cloudinary
        try {
          await deleteImage(existingAuthor.profileImage.publicId);
        } catch (error) {
          console.warn('Error deleting image from Cloudinary:', error);
        }

        // Eliminar registro de imagen de la BD
        await tx.image.delete({
          where: { id: existingAuthor.profileImage.id }
        });
      }

      // Luego eliminar el autor
      await tx.author.delete({
        where: { id }
      });
    });

    revalidatePath('/admin/authors');
    revalidatePath('/api/blogs/authors');

    return {
      success: true,
      message: `Autor "${existingAuthor.name}" eliminado correctamente${existingAuthor.blogAuthors.length > 0 ? ` (se desvinculó de ${existingAuthor.blogAuthors.length} blog(s))` : ''}`
    };
  } catch (error) {
    console.error('Error deleting author:', error);
    return {
      success: false,
      error: 'Error al eliminar el autor'
    };
  }
}

// ...resto de las funciones existentes sin cambios...
export async function getAllAuthors(includeBlogs = false, includeUser = false) {
  try {
    const authors = await prismaService.prisma.author.findMany({
      orderBy: {
        name: 'asc'
      },
      include: {
        blogAuthors: includeBlogs ? {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                views: true,
                readTime: true
              }
            }
          }
        } : false,
        user: includeUser ? {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        } : false,
        profileImage: true,
        socialMedia: true,
        _count: {
          select: {
            blogAuthors: true
          }
        }
      }
    });

    return {
      success: true,
      data: authors
    };
  } catch (error) {
    console.error('Error fetching authors:', error);
    return {
      success: false,
      error: 'Error al obtener los autores'
    };
  }
}

export async function getAuthorById(id: string) {
  try {
    const author = await prismaService.prisma.author.findUnique({
      where: { id },
      include: {
        blogAuthors: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                views: true,
                readTime: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        profileImage: true,
        socialMedia: true,
        _count: {
          select: {
            blogAuthors: true
          }
        }
      }
    });

    if (!author) {
      return {
        success: false,
        error: 'Autor no encontrado'
      };
    }

    return {
      success: true,
      data: author
    };
  } catch (error) {
    console.error('Error fetching author:', error);
    return {
      success: false,
      error: 'Error al obtener el autor'
    };
  }
}

export async function getAuthorByUserId(userId: string) {
  try {
    const author = await prismaService.prisma.author.findUnique({
      where: { userId },
      include: {
        blogAuthors: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                views: true,
                readTime: true
              }
            }
          }
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true
          }
        },
        profileImage: true,
        socialMedia: true
      }
    });

    if (!author) {
      return {
        success: false,
        error: 'Autor no encontrado para este usuario'
      };
    }

    return {
      success: true,
      data: author
    };
  } catch (error) {
    console.error('Error fetching author by user:', error);
    return {
      success: false,
      error: 'Error al obtener el autor'
    };
  }
}

export async function getPopularAuthors(limit = 10) {
  try {
    const authors = await prismaService.prisma.author.findMany({
      include: {
        _count: {
          select: {
            blogAuthors: true
          }
        },
        profileImage: true
      },
      orderBy: {
        blogAuthors: {
          _count: 'desc'
        }
      },
      take: limit
    });

    return {
      success: true,
      data: authors
    };
  } catch (error) {
    console.error('Error fetching popular authors:', error);
    return {
      success: false,
      error: 'Error al obtener los autores populares'
    };
  }
}

export async function searchAuthors(query: string, limit = 20) {
  try {
    const authors = await prismaService.prisma.author.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } }
        ]
      },
      include: {
        _count: {
          select: {
            blogAuthors: true
          }
        },
        profileImage: true
      },
      orderBy: [
        { name: 'asc' }
      ],
      take: limit
    });

    return {
      success: true,
      data: authors
    };
  } catch (error) {
    console.error('Error searching authors:', error);
    return {
      success: false,
      error: 'Error al buscar autores'
    };
  }
}

export async function getAuthorStats() {
  try {
    const [totalAuthors, authorsWithBlogs, authorsWithUsers] = await Promise.all([
      prismaService.prisma.author.count(),
      prismaService.prisma.author.count({
        where: {
          blogAuthors: {
            some: {}
          }
        }
      }),
      prismaService.prisma.author.count({
        where: {
          userId: {
            not: null
          }
        }
      })
    ]);

    const topAuthor = await prismaService.prisma.author.findFirst({
      include: {
        _count: {
          select: {
            blogAuthors: true
          }
        }
      },
      orderBy: {
        blogAuthors: {
          _count: 'desc'
        }
      }
    });

    return {
      success: true,
      data: {
        totalAuthors,
        authorsWithBlogs,
        authorsWithUsers,
        topAuthor: topAuthor ? {
          name: topAuthor.name,
          blogCount: topAuthor._count.blogAuthors
        } : null
      }
    };
  } catch (error) {
    console.error('Error fetching author stats:', error);
    return {
      success: false,
      error: 'Error al obtener estadísticas de autores'
    };
  }
}

export async function validateAuthorBlogAssociation(authorId: string, blogId: string) {
  try {
    const [author, blog] = await Promise.all([
      prismaService.prisma.author.findUnique({
        where: { id: authorId },
        select: { name: true }
      }),
      prismaService.prisma.blog.findUnique({
        where: { id: blogId },
        select: { title: true }
      })
    ]);

    if (!author || !blog) {
      return {
        success: false,
        error: 'Autor o Blog no encontrado'
      };
    }

    // Verificar si ya existe la asociación
    const existingAssociation = await prismaService.prisma.blogAuthor.findFirst({
      where: {
        authorId,
        blogId
      }
    });

    return {
      success: true,
      data: {
        compatible: true,
        alreadyAssociated: !!existingAssociation,
        author: { name: author.name },
        blog: { title: blog.title }
      }
    };
  } catch (error) {
    console.error('Error validating author-blog association:', error);
    return {
      success: false,
      error: 'Error al validar la asociación'
    };
  }
}