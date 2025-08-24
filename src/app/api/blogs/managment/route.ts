import { NextRequest, NextResponse } from 'next/server'
import { getBlogsForManagement } from '@/lib/actions/blogs-management.actions'

export async function GET(request: NextRequest) {
 try {
  const { searchParams } = new URL(request.url)

  // Extraer parámetros de la URL
  const lang = searchParams.get('lang') || 'es'
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const status = searchParams.get('status') as 'translated' | 'untranslated' | 'all' || 'all'
  const targetLanguage = searchParams.get('targetLanguage') || undefined

  // Validar parámetros
  if (page < 1) {
   return NextResponse.json(
    { error: 'El número de página debe ser mayor a 0' },
    { status: 400 }
   )
  }

  if (limit < 1 || limit > 100) {
   return NextResponse.json(
    { error: 'El límite debe estar entre 1 y 100' },
    { status: 400 }
   )
  }

  if (status && !['translated', 'untranslated', 'all'].includes(status)) {
   return NextResponse.json(
    { error: 'Status debe ser: translated, untranslated o all' },
    { status: 400 }
   )
  }

  // Llamar a la función de acción
  const result = await getBlogsForManagement({
   lang,
   page,
   limit,
   status,
   targetLanguage
  })

  if (!result.success) {
   return NextResponse.json(
    { error: result.error },
    { status: 500 }
   )
  }

  return NextResponse.json(result.data)

 } catch (error) {
  console.error('Error in blogs management API:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}