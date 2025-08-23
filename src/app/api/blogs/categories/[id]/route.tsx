import { NextRequest, NextResponse } from 'next/server'
import { getCategoryById } from '@/lib/actions/category.actions'

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
  const result = await getCategoryById(params.id)

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: result.error === 'Categoría no encontrada' ? 404 : 500 }
   )
  }

  return NextResponse.json(result.data)
 } catch (error) {
  console.error('GET /api/blogs/categories/[id] error:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}