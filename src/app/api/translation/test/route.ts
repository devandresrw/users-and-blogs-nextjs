// src/app/api/translation/test/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
 try {
  const DEEPL_API_KEY = process.env.DEEPL_API_KEY
  const DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate'

  console.log('🧪 Test de DeepL API:', {
   hasAPIKey: !!DEEPL_API_KEY,
   apiUrl: DEEPL_API_URL,
   keyPreview: DEEPL_API_KEY ? `${DEEPL_API_KEY.substring(0, 8)}...` : 'NO_KEY'
  })

  if (!DEEPL_API_KEY) {
   return NextResponse.json({
    success: false,
    error: 'DEEPL_API_KEY no configurada',
    details: {
     hasKey: false,
     env: process.env.NODE_ENV
    }
   })
  }

  // Test simple
  const testText = 'Hola mundo'
  const requestBody = new URLSearchParams({
   text: testText,
   source_lang: 'ES',
   target_lang: 'EN-US'
  })

  console.log('📡 Enviando test a DeepL...')

  const response = await fetch(DEEPL_API_URL, {
   method: 'POST',
   headers: {
    'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
    'Content-Type': 'application/x-www-form-urlencoded',
   },
   body: requestBody
  })

  console.log('📨 Respuesta recibida:', {
   status: response.status,
   statusText: response.statusText,
   ok: response.ok
  })

  const responseText = await response.text()
  console.log('📄 Contenido de respuesta:', responseText)

  if (!response.ok) {
   return NextResponse.json({
    success: false,
    error: 'Error en DeepL API',
    details: {
     status: response.status,
     statusText: response.statusText,
     response: responseText
    }
   })
  }

  const result = JSON.parse(responseText)

  return NextResponse.json({
   success: true,
   message: 'DeepL API funcionando correctamente',
   details: {
    original: testText,
    translated: result.translations?.[0]?.text || 'No translation',
    usage: result.usage || 'No usage info',
    fullResponse: result
   }
  })

 } catch (error) {
  console.error('💥 Error en test de DeepL:', error)
  return NextResponse.json({
   success: false,
   error: 'Error interno',
   details: {
    message: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined
   }
  })
 }
}