// src/app/api/blogs/[blogId]/translations/route.ts
import { NextRequest, NextResponse } from 'next/server'
import prismaService from '@/lib/config/prisma.service'

export async function GET(
 request: NextRequest,
 { params }: { params: { blogId: string } }
) {
 try {
  const { blogId } = params

  // Obtener todas las traducciones del blog
  const translations = await prismaService.prisma.translation.findMany({
   where: {
    entityType: 'blog',
    entityId: blogId
   },
   select: {
    language: true,
    field: true,
    value: true,
    updatedAt: true
   }
  })

  // Agrupar por idioma
  const translationsByLanguage = translations.reduce((acc, translation) => {
   if (!acc[translation.language]) {
    acc[translation.language] = {}
   }
   acc[translation.language][translation.field] = {
    value: translation.value,
    updatedAt: translation.updatedAt
   }
   return acc
  }, {} as Record<string, Record<string, any>>)

  // Obtener idiomas únicos
  const availableLanguages = Object.keys(translationsByLanguage)

  return NextResponse.json({
   success: true,
   data: {
    blogId,
    availableLanguages,
    translations: translationsByLanguage
   }
  })

 } catch (error) {
  console.error('Error fetching blog translations:', error)
  return NextResponse.json(
   { error: 'Error al obtener traducciones del blog' },
   { status: 500 }
  )
 }
}