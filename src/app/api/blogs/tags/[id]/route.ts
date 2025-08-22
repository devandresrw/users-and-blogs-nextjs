import { NextRequest, NextResponse } from 'next/server'
import { getTagById } from '@/lib/actions/tags.actions'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const result = await getTagById(params.id)
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: result.error === 'Tag no encontrado' ? 404 : 500 }
      )
    }

    return NextResponse.json(result.data)
  } catch (error) {
    console.error('GET /api/blogs/tags/[id] error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}