// src/app/api/translation/languages/route.ts
import { NextResponse } from 'next/server'
import { TranslationService } from '@/lib/blogs/translate/translate.service'

export async function GET() {
 try {
  const availableLanguages = await TranslationService.getAvailableLanguages()

  return NextResponse.json({
   success: true,
   languages: availableLanguages
  })
 } catch (error) {
  console.error('Error getting available languages:', error)
  return NextResponse.json(
   { error: 'Error al obtener idiomas disponibles' },
   { status: 500 }
  )
 }
}