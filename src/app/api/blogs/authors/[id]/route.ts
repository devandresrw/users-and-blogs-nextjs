import { NextRequest, NextResponse } from 'next/server'
import * as authorsActions from '@/lib/actions/authors.actions'

export async function GET(
 request: NextRequest,
 { params }: { params: { id: string } }
) {
 try {
  const { id } = params

  const result = await authorsActions.getAuthorById(id)

  if (!result.success) {
   return NextResponse.json({ error: result.error }, { status: 404 })
  }

  return NextResponse.json(result.data)

 } catch (error) {
  console.error('Error fetching author by ID:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}