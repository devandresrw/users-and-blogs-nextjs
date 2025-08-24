// src/app/api/blogs/translate/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { TranslationService } from '@/lib/blogs/translate/translate.service'

// POST: Agregar trabajos de traducción a la cola
export async function POST(request: NextRequest) {
 try {
  const body = await request.json()
  const { blogIds, targetLanguage, priority = 0 } = body

  // Validación
  if (!blogIds || !Array.isArray(blogIds) || blogIds.length === 0) {
   return NextResponse.json(
    { error: 'blogIds debe ser un array no vacío' },
    { status: 400 }
   )
  }

  if (!targetLanguage || typeof targetLanguage !== 'string') {
   return NextResponse.json(
    { error: 'targetLanguage es requerido' },
    { status: 400 }
   )
  }

  // Agregar trabajos a la cola
  const result = await TranslationService.addTranslationJobs({
   blogIds,
   targetLanguage,
   priority
  })

  return NextResponse.json({
   success: true,
   message: `${result.added} trabajos agregados a la cola`,
   details: {
    added: result.added,
    existing: result.existing,
    total: blogIds.length
   }
  })

 } catch (error) {
  console.error('Error en POST /api/blogs/translate:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}

// GET: Obtener estadísticas de la cola
export async function GET() {
 try {
  const [stats, activeJobs] = await Promise.all([
   TranslationService.getQueueStats(),
   TranslationService.getActiveJobs()
  ])

  return NextResponse.json({
   success: true,
   stats,
   activeJobs: activeJobs.slice(0, 10) // Limitar a 10 para performance
  })

 } catch (error) {
  console.error('Error en GET /api/blogs/translate:', error)
  return NextResponse.json(
   { error: 'Error interno del servidor' },
   { status: 500 }
  )
 }
}