'use server'

import prismaService from '@/lib/config/prisma.service'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Esquemas de validación
const CreateTagSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre debe tener máximo 100 caracteres'),
  slug: z.string().min(1, 'El slug es requerido').max(100, 'El slug debe tener máximo 100 caracteres'),
  description: z.string().optional(),
  baseLanguage: z.string().default('es')
})

const UpdateTagSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre debe tener máximo 100 caracteres'),
  slug: z.string().min(1, 'El slug es requerido').max(100, 'El slug debe tener máximo 100 caracteres'),
  description: z.string().optional(),
  baseLanguage: z.string().default('es')
})

export type CreateTagInput = z.infer<typeof CreateTagSchema>
export type UpdateTagInput = z.infer<typeof UpdateTagSchema>

// Crear tag (con validación de idioma)
export async function createTag(data: CreateTagInput) {
  try {
    const validatedData = CreateTagSchema.parse(data)
    
    // Verificar que el nombre y slug no existan EN EL MISMO IDIOMA
    const existingTag = await prismaService.prisma.tag.findFirst({
      where: {
        baseLanguage: validatedData.baseLanguage,
        OR: [
          { name: validatedData.name },
          { slug: validatedData.slug }
        ]
      }
    })

    if (existingTag) {
      return {
        success: false,
        error: `Ya existe un tag con ese nombre o slug en el idioma ${validatedData.baseLanguage}`
      }
    }

    const tag = await prismaService.prisma.tag.create({
      data: validatedData,
      include: {
        blogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                baseLanguage: true
              }
            }
          }
        }
      }
    })

    revalidatePath('/admin/tags')
    revalidatePath('/api/blogs/tags')
    
    return {
      success: true,
      data: tag
    }
  } catch (error) {
    console.error('Error creating tag:', error)
    return {
      success: false,
      error: error instanceof z.ZodError 
        ? error.errors.map(e => e.message).join(', ')
        : 'Error interno del servidor'
    }
  }
}

// Obtener todos los tags (con filtro de idioma opcional)
export async function getAllTags(includeBlogs = false, language?: string) {
  try {
    const tags = await prismaService.prisma.tag.findMany({
      where: language ? { baseLanguage: language } : undefined,
      orderBy: {
        name: 'asc'
      },
      include: includeBlogs ? {
        blogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                baseLanguage: true
              }
            }
          }
        }
      } : undefined
    })

    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('Error fetching tags:', error)
    return {
      success: false,
      error: 'Error al obtener los tags'
    }
  }
}

// Obtener tag por ID
export async function getTagById(id: string) {
  try {
    const tag = await prismaService.prisma.tag.findUnique({
      where: { id },
      include: {
        blogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                views: true,
                baseLanguage: true
              }
            }
          }
        }
      }
    })

    if (!tag) {
      return {
        success: false,
        error: 'Tag no encontrado'
      }
    }

    return {
      success: true,
      data: tag
    }
  } catch (error) {
    console.error('Error fetching tag:', error)
    return {
      success: false,
      error: 'Error al obtener el tag'
    }
  }
}

// Obtener tag por slug
export async function getTagBySlug(slug: string) {
  try {
    const tag = await prismaService.prisma.tag.findUnique({
      where: { slug },
      include: {
        blogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                dateCreated: true,
                views: true,
                readTime: true,
                baseLanguage: true
              }
            }
          }
        }
      }
    })

    if (!tag) {
      return {
        success: false,
        error: 'Tag no encontrado'
      }
    }

    return {
      success: true,
      data: tag
    }
  } catch (error) {
    console.error('Error fetching tag by slug:', error)
    return {
      success: false,
      error: 'Error al obtener el tag'
    }
  }
}

// Actualizar tag (con validación de idioma)
export async function updateTag(data: UpdateTagInput) {
  try {
    const validatedData = UpdateTagSchema.parse(data)
    
    // Verificar que el tag existe
    const existingTag = await prismaService.prisma.tag.findUnique({
      where: { id: validatedData.id }
    })

    if (!existingTag) {
      return {
        success: false,
        error: 'Tag no encontrado'
      }
    }

    // Verificar que el nombre y slug no estén en uso por otro tag EN EL MISMO IDIOMA
    const conflictingTag = await prismaService.prisma.tag.findFirst({
      where: {
        AND: [
          { id: { not: validatedData.id } },
          { baseLanguage: validatedData.baseLanguage },
          {
            OR: [
              { name: validatedData.name },
              { slug: validatedData.slug }
            ]
          }
        ]
      }
    })

    if (conflictingTag) {
      return {
        success: false,
        error: `Ya existe otro tag con ese nombre o slug en el idioma ${validatedData.baseLanguage}`
      }
    }

    const updatedTag = await prismaService.prisma.tag.update({
      where: { id: validatedData.id },
      data: {
        name: validatedData.name,
        slug: validatedData.slug,
        description: validatedData.description,
        baseLanguage: validatedData.baseLanguage
      },
      include: {
        blogs: {
          include: {
            blog: {
              select: {
                id: true,
                title: true,
                slug: true,
                baseLanguage: true
              }
            }
          }
        }
      }
    })

    revalidatePath('/admin/tags')
    revalidatePath('/api/blogs/tags')
    
    return {
      success: true,
      data: updatedTag
    }
  } catch (error) {
    console.error('Error updating tag:', error)
    return {
      success: false,
      error: error instanceof z.ZodError 
        ? error.errors.map(e => e.message).join(', ')
        : 'Error interno del servidor'
    }
  }
}

// Eliminar tag (manteniendo integridad referencial)
export async function deleteTag(id: string) {
  try {
    // Verificar que el tag existe
    const existingTag = await prismaService.prisma.tag.findUnique({
      where: { id },
      include: {
        blogs: true
      }
    })

    if (!existingTag) {
      return {
        success: false,
        error: 'Tag no encontrado'
      }
    }

    // Usar transacción para mantener integridad referencial
    await prismaService.prisma.$transaction(async (tx) => {
      // Primero eliminar todas las relaciones BlogTag
      await tx.blogTag.deleteMany({
        where: { tagId: id }
      })
      
      // Luego eliminar el tag
      await tx.tag.delete({
        where: { id }
      })
    })

    revalidatePath('/admin/tags')
    revalidatePath('/api/blogs/tags')
    
    return {
      success: true,
      message: `Tag "${existingTag.name}" eliminado correctamente${existingTag.blogs.length > 0 ? ` (se desvinculó de ${existingTag.blogs.length} blog(s))` : ''}`
    }
  } catch (error) {
    console.error('Error deleting tag:', error)
    return {
      success: false,
      error: 'Error al eliminar el tag'
    }
  }
}

// Obtener tags más utilizados (con filtro de idioma opcional)
export async function getPopularTags(limit = 10, language?: string) {
  try {
    const tags = await prismaService.prisma.tag.findMany({
      where: language ? { baseLanguage: language } : undefined,
      include: {
        _count: {
          select: {
            blogs: true
          }
        }
      },
      orderBy: {
        blogs: {
          _count: 'desc'
        }
      },
      take: limit
    })

    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('Error fetching popular tags:', error)
    return {
      success: false,
      error: 'Error al obtener los tags populares'
    }
  }
}

// NUEVAS FUNCIONES PARA SOPORTE MULTIIDIOMA

// Obtener tags compatibles con un blog (mismo idioma)
export async function getCompatibleTagsForBlog(blogId: string) {
  try {
    const blog = await prismaService.prisma.blog.findUnique({
      where: { id: blogId },
      select: { baseLanguage: true }
    })

    if (!blog) {
      return {
        success: false,
        error: 'Blog no encontrado'
      }
    }

    const tags = await prismaService.prisma.tag.findMany({
      where: {
        baseLanguage: blog.baseLanguage
      },
      orderBy: {
        name: 'asc'
      },
      include: {
        _count: {
          select: {
            blogs: true
          }
        }
      }
    })

    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('Error fetching compatible tags:', error)
    return {
      success: false,
      error: 'Error al obtener los tags compatibles'
    }
  }
}

// Validar asociación tag-blog por idioma
export async function validateTagBlogAssociation(tagId: string, blogId: string) {
  try {
    const [tag, blog] = await Promise.all([
      prismaService.prisma.tag.findUnique({
        where: { id: tagId },
        select: { baseLanguage: true, name: true }
      }),
      prismaService.prisma.blog.findUnique({
        where: { id: blogId },
        select: { baseLanguage: true, title: true }
      })
    ])

    if (!tag || !blog) {
      return {
        success: false,
        error: 'Tag o Blog no encontrado'
      }
    }

    if (tag.baseLanguage !== blog.baseLanguage) {
      return {
        success: false,
        error: `No se puede asociar el tag "${tag.name}" (${tag.baseLanguage}) con el blog "${blog.title}" (${blog.baseLanguage}). Deben tener el mismo idioma.`
      }
    }

    return {
      success: true,
      data: { 
        compatible: true,
        tag: { name: tag.name, language: tag.baseLanguage },
        blog: { title: blog.title, language: blog.baseLanguage }
      }
    }
  } catch (error) {
    console.error('Error validating tag-blog association:', error)
    return {
      success: false,
      error: 'Error al validar la asociación'
    }
  }
}

// Obtener todos los idiomas disponibles en tags
export async function getAvailableTagLanguages() {
  try {
    const languages = await prismaService.prisma.tag.findMany({
      select: {
        baseLanguage: true
      },
      distinct: ['baseLanguage'],
      orderBy: {
        baseLanguage: 'asc'
      }
    })

    return {
      success: true,
      data: languages.map(lang => lang.baseLanguage)
    }
  } catch (error) {
    console.error('Error fetching available languages:', error)
    return {
      success: false,
      error: 'Error al obtener los idiomas disponibles'
    }
  }
}

// Buscar tags por texto en un idioma específico
export async function searchTags(query: string, language?: string, limit = 20) {
  try {
    const tags = await prismaService.prisma.tag.findMany({
      where: {
        AND: [
          language ? { baseLanguage: language } : {},
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { slug: { contains: query, mode: 'insensitive' } },
              { description: { contains: query, mode: 'insensitive' } }
            ]
          }
        ]
      },
      include: {
        _count: {
          select: {
            blogs: true
          }
        }
      },
      orderBy: [
        { name: 'asc' }
      ],
      take: limit
    })

    return {
      success: true,
      data: tags
    }
  } catch (error) {
    console.error('Error searching tags:', error)
    return {
      success: false,
      error: 'Error al buscar tags'
    }
  }
}

// Obtener estadísticas de tags por idioma
export async function getTagStatsByLanguage() {
  try {
    const stats = await prismaService.prisma.tag.groupBy({
      by: ['baseLanguage'],
      _count: {
        id: true
      },
      orderBy: {
        baseLanguage: 'asc'
      }
    })

    const result = await Promise.all(
      stats.map(async (stat) => {
        const popularTag = await prismaService.prisma.tag.findFirst({
          where: { baseLanguage: stat.baseLanguage },
          include: {
            _count: {
              select: {
                blogs: true
              }
            }
          },
          orderBy: {
            blogs: {
              _count: 'desc'
            }
          }
        })

        return {
          language: stat.baseLanguage,
          totalTags: stat._count.id,
          mostUsedTag: popularTag ? {
            name: popularTag.name,
            blogCount: popularTag._count.blogs
          } : null
        }
      })
    )

    return {
      success: true,
      data: result
    }
  } catch (error) {
    console.error('Error fetching tag stats:', error)
    return {
      success: false,
      error: 'Error al obtener estadísticas de tags'
    }
  }
 }