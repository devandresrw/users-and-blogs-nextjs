// src/app/api/blogs/translate/process/route.ts
import { NextResponse } from 'next/server'
import { TranslationService } from '@/lib/blogs/translate/translate.service'

export async function POST() {
 try {
  // Procesar la cola (esto se ejecutará de forma asíncrona)
  TranslationService.processQueue().catch(error => {
   console.error('Error en procesamiento de cola:', error)
  })

  return NextResponse.json({
   success: true,
   message: 'Procesamiento de cola iniciado'
  })

 } catch (error) {
  console.error('Error iniciando procesamiento:', error)
  return NextResponse.json(
   { error: 'Error al iniciar procesamiento' },
   { status: 500 }
  )
 }
}