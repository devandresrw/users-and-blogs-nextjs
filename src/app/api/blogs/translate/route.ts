import { NextRequest, NextResponse } from 'next/server'
import prismaService from '@/lib/config/prisma.service'
import { TranslationService } from '@/lib/blogs/translate/translate.service'

export async function POST(request: NextRequest) {
 try {
  const body = await request.json()
  const { blogIds, targetLanguage, translateAll, priority = 0 } = body

  let idsToTranslate: string[] = []

  if (translateAll) {
   // Obtener todos los blogs originales (no traducciones)
   const allBlogs = await prismaService.prisma.blog.findMany({
    where: { isTranslation: false }
   })
   idsToTranslate = allBlogs.map(b => b.id)
  } else if (Array.isArray(blogIds)) {
   idsToTranslate = blogIds
  }

  if (!idsToTranslate.length) {
   return NextResponse.json(
    { error: 'No hay blogs para traducir' },
    { status: 400 }
   )
  }

  if (!targetLanguage || typeof targetLanguage !== 'string') {
   return NextResponse.json(
    { error: 'targetLanguage es requerido' },
    { status: 400 }
   )
  }

  // Llama al servicio para crear traducciones
  const result = await TranslationService.addTranslationJobs({
   blogIds: idsToTranslate,
   targetLanguage,
   priority
  })

  return NextResponse.json({
   success: true,
   ...result
  })
 } catch (error: any) {
  return NextResponse.json({ success: false, error: error.message }, { status: 500 })
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