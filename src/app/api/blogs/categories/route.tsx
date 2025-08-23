import { NextRequest, NextResponse } from 'next/server'
import {
 getAllCategories,
 createCategory,
 updateCategory,
 deleteCategory,
 getPopularCategories,
 validateCategoryBlogAssociation,
 getAvailableCategoryLanguages,
 searchCategories,
 getCategoryStatsByLanguage,
 type CreateCategoryInput,
 type UpdateCategoryInput
} from '@/lib/actions/category.actions'

// GET - Obtener categorías con múltiples opciones de filtrado
export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url)

  // Parámetros de consulta
  const includeRelations = searchParams.get('includeRelations') === 'true'
  const popular = searchParams.get('popular') === 'true'
  const language = searchParams.get('language') || undefined
  const validateCategoryId = searchParams.get('validate') || undefined
  const blogId = searchParams.get('blogId') || undefined
  const query = searchParams.get('query') || undefined
  const stats = searchParams.get('stats') === 'true'
  const languages = searchParams.get('languages') === 'true'
  const limit = searchParams.get('limit')

  // 1. Obtener idiomas disponibles
  if (languages) {
   const result = await getAvailableCategoryLanguages()
   if (!result.success) {
    return NextResponse.json(
     { error: result.error },
     { status: 500 }
    )
   }
   return NextResponse.json(result.data)
  }

  // 2. Obtener estadísticas por idioma
  if (stats) {
   const result = await getCategoryStatsByLanguage()
   if (!result.success) {
    return NextResponse.json(
     { error: result.error },
     { status: 500 }
    )
   }
   return NextResponse.json(result.data)
  }

  // 3. Validar asociación categoría-blog
  if (validateCategoryId && blogId) {
   const result = await validateCategoryBlogAssociation(validateCategoryId, blogId)
   if (!result.success) {
    return NextResponse.json(
     { error: result.error },
     { status: 400 }
    )
   }
   return NextResponse.json(result.data)
  }

  // 4. Buscar categorías por texto
  if (query) {
   const result = await searchCategories(
    query,
    language,
    limit ? parseInt(limit) : 20
   )
   if (!result.success) {
    return NextResponse.json(
     { error: result.error },
     { status: 500 }
    )
   }
   return NextResponse.json(result.data)
  }

  // 5. Obtener categorías populares
  if (popular) {
   const result = await getPopularCategories(
    limit ? parseInt(limit) : 10,
    language
   )
   if (!result.success) {
    return NextResponse.json(
     { error: result.error },
     { status: 500 }
    )
   }
   return NextResponse.json(result.data)
  }

  // 6. Obtener todas las categorías (con filtros opcionales)
  const result = await getAllCategories(includeRelations, language)

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: 500 }
   )
  }

  return NextResponse.json(result.data)
 } catch (error) {
  console.error('GET /api/blogs/categories error:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

// POST - Crear nueva categoría
export async function POST(request: NextRequest) {
 try {
  const body: CreateCategoryInput = await request.json()

  // Validar que los campos requeridos estén presentes
  if (!body.name || !body.slug) {
   return NextResponse.json(
    { error: 'Nombre y slug son campos requeridos' },
    { status: 400 }
   )
  }

  const result = await createCategory(body)

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: 400 }
   )
  }

  return NextResponse.json(result.data, { status: 201 })
 } catch (error) {
  console.error('POST /api/blogs/categories error:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

// PUT - Actualizar categoría existente
export async function PUT(request: NextRequest) {
 try {
  const body: UpdateCategoryInput = await request.json()

  // Validar que los campos requeridos estén presentes
  if (!body.id) {
   return NextResponse.json(
    { error: 'ID de la categoría es requerido' },
    { status: 400 }
   )
  }

  if (!body.name || !body.slug) {
   return NextResponse.json(
    { error: 'Nombre y slug son campos requeridos' },
    { status: 400 }
   )
  }

  const result = await updateCategory(body)

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: 400 }
   )
  }

  return NextResponse.json(result.data)
 } catch (error) {
  console.error('PUT /api/blogs/categories error:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

// DELETE - Eliminar categoría
export async function DELETE(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
   return NextResponse.json(
    { error: 'ID de la categoría es requerido' },
    { status: 400 }
   )
  }

  const result = await deleteCategory(id)

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: 400 }
   )
  }

  return NextResponse.json({
   success: true,
   message: result.message
  })
 } catch (error) {
  console.error('DELETE /api/blogs/categories error:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}