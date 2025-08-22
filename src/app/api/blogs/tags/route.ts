import { NextRequest, NextResponse } from 'next/server'
import { 
  getAllTags, 
  createTag, 
  updateTag, 
  deleteTag,
  getPopularTags,
  getCompatibleTagsForBlog,
  validateTagBlogAssociation,
  getAvailableTagLanguages,
  searchTags,
  getTagStatsByLanguage,
  type CreateTagInput,
  type UpdateTagInput
} from '@/lib/actions/tags.actions'

// GET - Obtener tags con múltiples opciones de filtrado
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Parámetros de consulta
    const includeBlogs = searchParams.get('includeBlogs') === 'true'
    const popular = searchParams.get('popular') === 'true'
    const language = searchParams.get('language') || undefined
    const blogId = searchParams.get('blogId') || undefined
    const validateTagId = searchParams.get('validate') || undefined
    const query = searchParams.get('query') || undefined
    const stats = searchParams.get('stats') === 'true'
    const languages = searchParams.get('languages') === 'true'
    const limit = searchParams.get('limit')

    // 1. Obtener idiomas disponibles
    if (languages) {
      const result = await getAvailableTagLanguages()
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
      const result = await getTagStatsByLanguage()
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        )
      }
      return NextResponse.json(result.data)
    }

    // 3. Validar asociación tag-blog
    if (validateTagId && blogId) {
      const result = await validateTagBlogAssociation(validateTagId, blogId)
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 400 }
        )
      }
      return NextResponse.json(result.data)
    }

    // 4. Obtener tags compatibles con un blog específico
    if (blogId) {
      const result = await getCompatibleTagsForBlog(blogId)
      if (!result.success) {
        return NextResponse.json(
          { error: result.error },
          { status: 500 }
        )
      }
      return NextResponse.json(result.data)
    }

    // 5. Buscar tags por texto
    if (query) {
      const result = await searchTags(
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

    // 6. Obtener tags populares
    if (popular) {
      const result = await getPopularTags(
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

    // 7. Obtener todos los tags (con filtros opcionales)
    const result = await getAllTags(includeBlogs, language)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('GET /api/blogs/tags error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// POST - Crear nuevo tag
export async function POST(request: NextRequest) {
  try {
    const body: CreateTagInput = await request.json()
    
    // Validar que los campos requeridos estén presentes
    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Nombre y slug son campos requeridos' },
        { status: 400 }
      )
    }
    
    const result = await createTag(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result.data, { status: 201 })
  } catch (error) {
    console.error('POST /api/blogs/tags error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// PUT - Actualizar tag existente
export async function PUT(request: NextRequest) {
  try {
    const body: UpdateTagInput = await request.json()
    
    // Validar que los campos requeridos estén presentes
    if (!body.id) {
      return NextResponse.json(
        { error: 'ID del tag es requerido' },
        { status: 400 }
      )
    }

    if (!body.name || !body.slug) {
      return NextResponse.json(
        { error: 'Nombre y slug son campos requeridos' },
        { status: 400 }
      )
    }
    
    const result = await updateTag(body)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('PUT /api/blogs/tags error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

// DELETE - Eliminar tag
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'ID del tag es requerido' },
        { status: 400 }
      )
    }
    
    const result = await deleteTag(id)
    
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
    console.error('DELETE /api/blogs/tags error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}