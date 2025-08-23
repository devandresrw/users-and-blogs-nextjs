import { prisma } from '@/lib/config/prisma-singleton'
import { Prisma } from '@prisma/client'

// Tipos para las operaciones
export type CreateCategoryInput = {
 name: string
 slug: string
 baseLanguage?: string
}

export type UpdateCategoryInput = {
 id: string
 name?: string
 slug?: string
 baseLanguage?: string
}

// Tipo de retorno estándar
type ActionResult<T = any> = {
 success: boolean
 data?: T
 error?: string
 message?: string
}

// =============== QUERIES (GET) ===============

// Obtener todas las categorías
export async function getAllCategories(
 includeRelations = false,
 language?: string
): Promise<ActionResult> {
 try {
  const categories = await prisma.category.findMany({
   include: {
    polls: includeRelations,
    Image: includeRelations,
    Blog: includeRelations ? {
     select: {
      id: true,
      title: true,
      slug: true,
      dateCreated: true
     }
    } : false,
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   },
   orderBy: {
    name: 'asc'
   }
  })

  // Si se especifica un idioma, filtrar traducciones
  if (language && language !== 'es') {
   // Aquí puedes implementar la lógica de traducciones
   // usando el modelo Translation
  }

  return {
   success: true,
   data: categories
  }
 } catch (error) {
  console.error('Error al obtener categorías:', error)
  return {
   success: false,
   error: 'Error al obtener las categorías'
  }
 }
}

// Obtener categoría por ID
export async function getCategoryById(id: string): Promise<ActionResult> {
 try {
  const category = await prisma.category.findUnique({
   where: { id },
   include: {
    polls: {
     select: {
      id: true,
      question: true,
      slug: true,
      createdAt: true,
      isPublic: true
     }
    },
    Blog: {
     select: {
      id: true,
      title: true,
      slug: true,
      dateCreated: true,
      views: true
     }
    },
    Image: true,
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   }
  })

  if (!category) {
   return {
    success: false,
    error: 'Categoría no encontrada'
   }
  }

  return {
   success: true,
   data: category
  }
 } catch (error) {
  console.error('Error al obtener categoría:', error)
  return {
   success: false,
   error: 'Error al obtener la categoría'
  }
 }
}

// Obtener categorías populares (con más blogs/polls)
export async function getPopularCategories(
 limit = 10,
 language?: string
): Promise<ActionResult> {
 try {
  const categories = await prisma.category.findMany({
   include: {
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   },
   orderBy: [
    {
     Blog: {
      _count: 'desc'
     }
    },
    {
     polls: {
      _count: 'desc'
     }
    }
   ],
   take: limit
  })

  return {
   success: true,
   data: categories
  }
 } catch (error) {
  console.error('Error al obtener categorías populares:', error)
  return {
   success: false,
   error: 'Error al obtener las categorías populares'
  }
 }
}

// Buscar categorías por texto
export async function searchCategories(
 query: string,
 language?: string,
 limit = 20
): Promise<ActionResult> {
 try {
  const categories = await prisma.category.findMany({
   where: {
    OR: [
     {
      name: {
       contains: query,
       mode: 'insensitive'
      }
     },
     {
      slug: {
       contains: query,
       mode: 'insensitive'
      }
     }
    ]
   },
   include: {
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   },
   take: limit,
   orderBy: {
    name: 'asc'
   }
  })

  return {
   success: true,
   data: categories
  }
 } catch (error) {
  console.error('Error al buscar categorías:', error)
  return {
   success: false,
   error: 'Error al buscar categorías'
  }
 }
}

// Obtener idiomas disponibles
export async function getAvailableCategoryLanguages(): Promise<ActionResult> {
 try {
  const languages = await prisma.category.findMany({
   select: {
    baseLanguage: true
   },
   distinct: ['baseLanguage']
  })

  // Cambiar la línea problemática por esta:
  const uniqueLanguages = Array.from(new Set(languages.map(l => l.baseLanguage)))

  return {
   success: true,
   data: uniqueLanguages
  }
 } catch (error) {
  console.error('Error al obtener idiomas:', error)
  return {
   success: false,
   error: 'Error al obtener los idiomas disponibles'
  }
 }
}

// Obtener estadísticas por idioma
export async function getCategoryStatsByLanguage(): Promise<ActionResult> {
 try {
  const stats = await prisma.category.groupBy({
   by: ['baseLanguage'],
   _count: {
    id: true
   },
   orderBy: {
    _count: {
     id: 'desc'
    }
   }
  })

  return {
   success: true,
   data: stats
  }
 } catch (error) {
  console.error('Error al obtener estadísticas:', error)
  return {
   success: false,
   error: 'Error al obtener las estadísticas'
  }
 }
}

// =============== MUTATIONS (CREATE/UPDATE/DELETE) ===============

// Crear nueva categoría
export async function createCategory(data: CreateCategoryInput): Promise<ActionResult> {
 try {
  // Verificar que el slug no exista
  const existingCategory = await prisma.category.findUnique({
   where: { slug: data.slug }
  })

  if (existingCategory) {
   return {
    success: false,
    error: 'Ya existe una categoría con este slug'
   }
  }

  const category = await prisma.category.create({
   data: {
    name: data.name,
    slug: data.slug,
    baseLanguage: data.baseLanguage || 'es'
   },
   include: {
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   }
  })

  return {
   success: true,
   data: category,
   message: 'Categoría creada exitosamente'
  }
 } catch (error) {
  console.error('Error al crear categoría:', error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   if (error.code === 'P2002') {
    return {
     success: false,
     error: 'Ya existe una categoría con estos datos'
    }
   }
  }

  return {
   success: false,
   error: 'Error al crear la categoría'
  }
 }
}

// Actualizar categoría
export async function updateCategory(data: UpdateCategoryInput): Promise<ActionResult> {
 try {
  // Verificar que la categoría existe
  const existingCategory = await prisma.category.findUnique({
   where: { id: data.id }
  })

  if (!existingCategory) {
   return {
    success: false,
    error: 'Categoría no encontrada'
   }
  }

  // Si se está actualizando el slug, verificar que no exista otro con ese slug
  if (data.slug && data.slug !== existingCategory.slug) {
   const slugExists = await prisma.category.findUnique({
    where: { slug: data.slug }
   })

   if (slugExists) {
    return {
     success: false,
     error: 'Ya existe una categoría con este slug'
    }
   }
  }

  const category = await prisma.category.update({
   where: { id: data.id },
   data: {
    ...(data.name && { name: data.name }),
    ...(data.slug && { slug: data.slug }),
    ...(data.baseLanguage && { baseLanguage: data.baseLanguage })
   },
   include: {
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   }
  })

  return {
   success: true,
   data: category,
   message: 'Categoría actualizada exitosamente'
  }
 } catch (error) {
  console.error('Error al actualizar categoría:', error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   if (error.code === 'P2002') {
    return {
     success: false,
     error: 'Ya existe una categoría con estos datos'
    }
   }
  }

  return {
   success: false,
   error: 'Error al actualizar la categoría'
  }
 }
}

// Eliminar categoría (con verificación de relaciones)
export async function deleteCategory(id: string): Promise<ActionResult> {
 try {
  // Verificar que la categoría existe
  const existingCategory = await prisma.category.findUnique({
   where: { id },
   include: {
    _count: {
     select: {
      polls: true,
      Blog: true,
      Image: true
     }
    }
   }
  })

  if (!existingCategory) {
   return {
    success: false,
    error: 'Categoría no encontrada'
   }
  }

  // Verificar si tiene relaciones que impidan la eliminación
  const hasRelations = existingCategory._count.polls > 0 ||
   existingCategory._count.Blog > 0 ||
   existingCategory._count.Image > 0

  if (hasRelations) {
   return {
    success: false,
    error: `No se puede eliminar la categoría porque tiene ${existingCategory._count.polls} encuestas, ${existingCategory._count.Blog} blogs y ${existingCategory._count.Image} imágenes asociadas`
   }
  }

  await prisma.category.delete({
   where: { id }
  })

  return {
   success: true,
   message: 'Categoría eliminada exitosamente'
  }
 } catch (error) {
  console.error('Error al eliminar categoría:', error)

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
   if (error.code === 'P2003') {
    return {
     success: false,
     error: 'No se puede eliminar la categoría porque tiene elementos relacionados'
    }
   }
  }

  return {
   success: false,
   error: 'Error al eliminar la categoría'
  }
 }
}

// Validar asociación categoría-blog
export async function validateCategoryBlogAssociation(
 categoryId: string,
 blogId: string
): Promise<ActionResult> {
 try {
  const blog = await prisma.blog.findUnique({
   where: { id: blogId },
   select: { categoryId: true }
  })

  if (!blog) {
   return {
    success: false,
    error: 'Blog no encontrado'
   }
  }

  const isAssociated = blog.categoryId === categoryId

  return {
   success: true,
   data: { isAssociated }
  }
 } catch (error) {
  console.error('Error al validar asociación:', error)
  return {
   success: false,
   error: 'Error al validar la asociación'
  }
 }
}