import { NextRequest, NextResponse } from 'next/server'
import * as authorsActions from '@/lib/actions/authors.actions'

export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url)

  // Búsqueda de autores
  if (searchParams.has('query')) {
   const query = searchParams.get('query')!
   const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20

   const result = await authorsActions.searchAuthors(query, limit)

   if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
   }

   return NextResponse.json(result.data)
  }

  // Autores populares
  if (searchParams.has('popular')) {
   const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10

   const result = await authorsActions.getPopularAuthors(limit)

   if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
   }

   return NextResponse.json(result.data)
  }

  // Estadísticas
  if (searchParams.has('stats')) {
   const result = await authorsActions.getAuthorStats()

   if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
   }

   return NextResponse.json(result.data)
  }

  // Validación de asociación autor-blog
  if (searchParams.has('validate') && searchParams.has('blogId')) {
   const authorId = searchParams.get('validate')!
   const blogId = searchParams.get('blogId')!

   const result = await authorsActions.validateAuthorBlogAssociation(authorId, blogId)

   if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 400 })
   }

   return NextResponse.json(result.data)
  }

  // Autor por userId
  if (searchParams.has('userId')) {
   const userId = searchParams.get('userId')!

   const result = await authorsActions.getAuthorByUserId(userId)

   if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 404 })
   }

   return NextResponse.json(result.data)
  }

  // Lista completa de autores
  const includeBlogs = searchParams.get('includeBlogs') === 'true'
  const includeUser = searchParams.get('includeUser') === 'true'

  const result = await authorsActions.getAllAuthors(includeBlogs, includeUser)

  if (!result.success) {
   return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.data)

 } catch (error) {
  console.error('Error in authors API:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

export async function POST(request: NextRequest) {
 try {
  const data = await request.json()

  const result = await authorsActions.createAuthor(data)

  if (!result.success) {
   return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.data, { status: 201 })

 } catch (error) {
  console.error('Error creating author:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

export async function PUT(request: NextRequest) {
 try {
  const data = await request.json()

  if (!data.id) {
   return NextResponse.json({ error: 'ID es requerido' }, { status: 400 })
  }

  const result = await authorsActions.updateAuthor(data)

  if (!result.success) {
   return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json(result.data)

 } catch (error) {
  console.error('Error updating author:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

export async function DELETE(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (!id) {
   return NextResponse.json({ error: 'ID es requerido' }, { status: 400 })
  }

  const result = await authorsActions.deleteAuthor(id)

  if (!result.success) {
   return NextResponse.json({ error: result.error }, { status: 400 })
  }

  return NextResponse.json({ message: result.message })

 } catch (error) {
  console.error('Error deleting author:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}