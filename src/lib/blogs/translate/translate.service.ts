import prismaService from '@/lib/config/prisma.service'

export type TranslationJobStatus = 'pending' | 'processing' | 'completed' | 'failed'

export type TranslationJob = {
 id: string
 blogId: string
 targetLanguage: string
 status: TranslationJobStatus
 retryCount: number
 errorMessage?: string
 createdAt: Date
 processedAt?: Date
 completedAt?: Date
}

export type BatchTranslationRequest = {
 blogIds: string[]
 targetLanguage: string
 priority?: number
}

export type TranslationApiResponse = {
 title: string
 content: string
 titlePunch?: string
 seoDescription?: string
}

export type CategoryTranslationResponse = {
 name: string
}

export class TranslationService {
 private static readonly BATCH_SIZE = 5
 private static readonly PROCESSING_DELAY = 12000
 private static readonly MAX_RETRIES = 3
 private static readonly DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate'
 private static readonly DEEPL_API_KEY = process.env.DEEPL_API_KEY

 private static readonly SOURCE_LANGUAGE_MAP: Record<string, string> = {
  'es': 'ES',
  'en': 'EN',
  'fr': 'FR',
  'de': 'DE',
  'it': 'IT',
  'pt': 'PT',
  'ja': 'JA',
  'zh': 'ZH',
  'ar': 'AR'
 }

 private static readonly TARGET_LANGUAGE_MAP: Record<string, string> = {
  'es': 'ES',
  'en': 'EN-US',
  'fr': 'FR',
  'de': 'DE',
  'it': 'IT',
  'pt': 'PT-BR',
  'ja': 'JA',
  'zh': 'ZH',
  'ar': 'AR'
 }


 // ================== GESTIÓN DE COLA ==================

 /**
  * Agregar trabajos de traducción a la cola
  */
 static async addTranslationJobs({
  blogIds,
  targetLanguage,
  priority = 0
 }: {
  blogIds: string[]
  targetLanguage: string
  priority?: number
 }): Promise<{ added: number; existing: number }> {
  let added = 0
  let existing = 0

  for (const blogId of blogIds) {
   const original = await prismaService.prisma.blog.findUnique({
    where: { id: blogId },
    include: {
     blogAuthors: true,
     tags: true,
     Category: true
    }
   })
   if (!original) continue

   const exists = await prismaService.prisma.blog.findFirst({
    where: {
     originalBlogId: blogId,
     baseLanguage: targetLanguage
    }
   })
   if (exists) {
    existing++
    continue
   }

   const translatedContent = await this.translateBlogContent({
    title: original.title,
    content: original.content,
    titlePunch: original.titlePunch,
    seoDescription: original.seoDescription,
    fromLanguage: original.baseLanguage,
    toLanguage: targetLanguage
   })

   const translatedBlog = await prismaService.prisma.blog.create({
    data: {
     title: translatedContent.title,
     content: translatedContent.content,
     titlePunch: translatedContent.titlePunch,
     seoDescription: translatedContent.seoDescription,
     baseLanguage: targetLanguage,
     isTranslation: true,
     originalBlogId: blogId,
     slug: original.slug + '-' + targetLanguage,
     dateNews: original.dateNews,
     readTime: original.readTime,
     categoryId: original.categoryId,
     blogAuthors: {
      create: original.blogAuthors.map(ba => ({
       authorId: ba.authorId
      }))
     },
     tags: {
      create: original.tags.map(bt => ({
       tagId: bt.tagId
      }))
     }
    }
   })

   // Actualizar tabla Translation
   let translation = await prismaService.prisma.translation.findUnique({
    where: {
     originalEntityId_entityType: {
      originalEntityId: blogId,
      entityType: 'blog'
     }
    }
   })
   if (translation) {
    await prismaService.prisma.translation.update({
     where: { id: translation.id },
     data: {
      translatedIds: { push: translatedBlog.id }
     }
    })
   } else {
    await prismaService.prisma.translation.create({
     data: {
      originalEntityId: blogId,
      entityType: 'blog',
      translatedIds: [translatedBlog.id]
     }
    })
   }
   added++
  }
  return { added, existing }
 }

 /**
  * Obtener próximos trabajos para procesar
  */
 static async getNextJobs(limit: number = this.BATCH_SIZE): Promise<any[]> {
  const jobs = await prismaService.prisma.translationQueue.findMany({
   where: {
    status: 'pending',
    retryCount: { lt: this.MAX_RETRIES }
   },
   orderBy: [
    { priority: 'desc' },
    { createdAt: 'asc' }
   ],
   take: limit,
   include: {
    blog: {
     select: {
      title: true,
      content: true,
      titlePunch: true,
      seoDescription: true,
      baseLanguage: true,
      categoryId: true,
      Category: {
       select: {
        id: true,
        name: true,
        baseLanguage: true
       }
      }
     }
    }
   }
  })

  return jobs
 }

 /**
  * Obtener estadísticas de la cola
  */
 static async getQueueStats() {
  const stats = await prismaService.prisma.translationQueue.groupBy({
   by: ['status'],
   _count: { status: true }
  })

  return {
   pending: stats.find(s => s.status === 'pending')?._count.status || 0,
   processing: stats.find(s => s.status === 'processing')?._count.status || 0,
   completed: stats.find(s => s.status === 'completed')?._count.status || 0,
   failed: stats.find(s => s.status === 'failed')?._count.status || 0,
   total: stats.reduce((sum, s) => sum + s._count.status, 0)
  }
 }

 // ================== PROCESAMIENTO ==================

 /**
  * Procesar la cola de traducción
  */
 static async processQueue(): Promise<void> {
  try {
   console.log('🚀 Iniciando procesamiento de cola...')
   const jobs = await this.getNextJobs()

   if (jobs.length === 0) {
    console.log('ℹ️ No hay trabajos pendientes en la cola')
    return
   }

   console.log(`⚡ Procesando ${jobs.length} trabajos de traducción...`)

   // Procesar trabajos secuencialmente para respetar rate limiting
   for (const job of jobs) {
    try {
     console.log(`🔄 Procesando trabajo: ${job.id} (${job.blogId} -> ${job.targetLanguage})`)
     await this.processJob(job)

     // Esperar entre traducciones para respetar rate limiting
     if (jobs.indexOf(job) < jobs.length - 1) {
      console.log(`⏸️ Esperando ${this.PROCESSING_DELAY / 1000}s antes del siguiente trabajo...`)
      await this.delay(this.PROCESSING_DELAY)
     }
    } catch (error) {
     console.error(`❌ Error procesando trabajo ${job.id}:`, error)
    }
   }

   console.log('🎉 Procesamiento de cola completado')
  } catch (error) {
   console.error('💥 Error en processQueue:', error)
  }
 }

 /**
  * Procesar un trabajo individual
  */
 private static async processJob(job: any): Promise<void> {
  try {
   console.log(`🎯 Iniciando procesamiento de trabajo: ${job.id}`)

   // Marcar como procesando
   await this.markJobAsProcessing(job.id)

   const blog = job.blog

   if (!blog) {
    throw new Error('Blog no encontrado')
   }

   // 1. Traducir la categoría si es necesaria
   if (blog.Category && blog.categoryId) {
    console.log(`📁 Procesando categoría: ${blog.Category.name}`)
    await this.translateCategoryIfNeeded(blog.categoryId, blog.Category, job.targetLanguage)
   }

   // 2. Traducir el blog
   console.log(`📝 Traduciendo blog: ${blog.title.substring(0, 50)}...`)
   const translatedContent = await this.translateBlogContent({
    title: blog.title,
    content: blog.content,
    titlePunch: blog.titlePunch,
    seoDescription: blog.seoDescription,
    fromLanguage: blog.baseLanguage,
    toLanguage: job.targetLanguage
   })

   // 3. Guardar las traducciones del blog
   console.log(`💾 Guardando traducciones del blog...`)

   // 4. Marcar como completado
   await this.markJobAsCompleted(job.id)

   console.log(`✅ Traducción completada exitosamente: ${job.blogId} -> ${job.targetLanguage}`)

  } catch (error) {
   console.error(`❌ Error en traducción ${job.id}:`, error)
   await this.markJobAsFailed(job.id, error instanceof Error ? error.message : 'Error desconocido')
  }
 }

 /**
  * Traducir categoría si es necesario
  */
 private static async translateCategoryIfNeeded(
  categoryId: string,
  category: any,
  targetLanguage: string
 ): Promise<void> {
  try {
   const existingCategory = await prismaService.prisma.category.findFirst({
    where: {
     originalCategoryId: categoryId,
     baseLanguage: targetLanguage
    }
   })

   if (existingCategory) {
    console.log(`ℹ️ Categoría ${categoryId} ya está traducida a ${targetLanguage}`)
    return
   }

   const translatedCategory = await this.translateCategoryContent({
    name: category.name,
    fromLanguage: category.baseLanguage,
    toLanguage: targetLanguage
   })

   const newCategory = await prismaService.prisma.category.create({
    data: {
     name: translatedCategory.name,
     slug: category.slug + '-' + targetLanguage,
     baseLanguage: targetLanguage,
     isTranslation: true,
     originalCategoryId: categoryId
    }
   })

   let translation = await prismaService.prisma.translation.findUnique({
    where: {
     originalEntityId_entityType: {
      originalEntityId: categoryId,
      entityType: 'category'
     }
    }
   })
   if (translation) {
    await prismaService.prisma.translation.update({
     where: { id: translation.id },
     data: {
      translatedIds: { push: newCategory.id }
     }
    })
   } else {
    await prismaService.prisma.translation.create({
     data: {
      originalEntityId: categoryId,
      entityType: 'category',
      translatedIds: [newCategory.id]
     }
    })
   }

   console.log(`✅ Categoría traducida exitosamente: ${categoryId} -> ${targetLanguage}`)

  } catch (error) {
   console.error(`❌ Error traduciendo categoría ${categoryId}:`, error)
  }
 }

 /**
  * Traducir contenido del blog usando DeepL API
  */
 private static async translateBlogContent({
  title,
  content,
  titlePunch,
  seoDescription,
  fromLanguage,
  toLanguage
 }: {
  title: string
  content: string
  titlePunch?: string | null
  seoDescription?: string | null
  fromLanguage: string
  toLanguage: string
 }): Promise<TranslationApiResponse> {


  console.log('🌍 Iniciando traducción con DeepL:', {
   fromLanguage,
   toLanguage,
   titleLength: title.length,
   contentLength: content.length,
   hasAPI: !!this.DEEPL_API_KEY
  })

  if (!this.DEEPL_API_KEY) {
   console.error('❌ DEEPL_API_KEY no está configurada')
   throw new Error('DEEPL_API_KEY no está configurada')
  }

  // ✅ CORREGIDO: Usar mapeos diferentes para source y target
  const sourceLanguage = this.SOURCE_LANGUAGE_MAP[fromLanguage]
  const targetLang = this.TARGET_LANGUAGE_MAP[toLanguage]

  console.log('🔄 Mapeo de idiomas:', {
   fromLanguage,
   sourceLanguage,
   toLanguage,
   targetLang
  })

  if (!sourceLanguage || !targetLang) {
   throw new Error(`Idioma no soportado: ${fromLanguage} -> ${toLanguage}`)
  }

  try {
   // Preparar textos para traducir
   const textsToTranslate = [title, content]
   if (titlePunch) textsToTranslate.push(titlePunch)
   if (seoDescription) textsToTranslate.push(seoDescription)

   console.log('📝 Textos a traducir:', {
    count: textsToTranslate.length,
    lengths: textsToTranslate.map(t => t.length),
    totalChars: textsToTranslate.join('').length
   })

   // ✅ CORREGIDO: Usar los mapeos correctos
   const requestBody = new URLSearchParams({
    text: textsToTranslate,
    source_lang: sourceLanguage,  // ✅ Usar SOURCE_LANGUAGE_MAP
    target_lang: targetLang,      // ✅ Usar TARGET_LANGUAGE_MAP
    preserve_formatting: '1',
    tag_handling: 'html'
   } as any)

   console.log('🚀 Enviando request a DeepL:', {
    url: this.DEEPL_API_URL,
    source_lang: sourceLanguage,
    target_lang: targetLang,
    textCount: textsToTranslate.length
   })

   const response = await fetch(this.DEEPL_API_URL, {
    method: 'POST',
    headers: {
     'Authorization': `DeepL-Auth-Key ${this.DEEPL_API_KEY}`,
     'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: requestBody
   })

   console.log('📡 Respuesta de DeepL:', {
    status: response.status,
    statusText: response.statusText,
    ok: response.ok
   })

   if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Error de DeepL API:', {
     status: response.status,
     statusText: response.statusText,
     errorText
    })
    throw new Error(`DeepL API Error: ${response.status} - ${errorText}`)
   }

   const result = await response.json()
   console.log('✅ Respuesta exitosa de DeepL:', {
    translationsCount: result.translations?.length || 0,
    hasTranslations: !!result.translations,
    usage: result.usage || 'No usage info'
   })

   const translations = result.translations

   if (!translations || translations.length < 2) {
    console.error('❌ Respuesta inválida de DeepL:', result)
    throw new Error('Respuesta inválida de DeepL API')
   }

   // Mapear las traducciones
   const translatedContent: TranslationApiResponse = {
    title: translations[0].text,
    content: translations[1].text,
    titlePunch: titlePunch && translations[2] ? translations[2].text : undefined,
    seoDescription: seoDescription && translations[titlePunch ? 3 : 2] ? translations[titlePunch ? 3 : 2].text : undefined
   }

   console.log('🎯 Traducción completada:', {
    originalTitle: title.substring(0, 50) + '...',
    translatedTitle: translatedContent.title.substring(0, 50) + '...',
    originalContentLength: content.length,
    translatedContentLength: translatedContent.content.length
   })

   return translatedContent

  } catch (error) {
   console.error('💥 Error en traducción con DeepL:', error)
   throw error
  }
 }

 /**
  * Traducir contenido de categoría usando DeepL API
  */
 private static async translateCategoryContent({
  name,
  fromLanguage,
  toLanguage
 }: {
  name: string
  fromLanguage: string
  toLanguage: string
 }): Promise<CategoryTranslationResponse> {

  if (!this.DEEPL_API_KEY) {
   throw new Error('DEEPL_API_KEY no está configurada')
  }

  // ✅ CORREGIDO: Usar mapeos correctos
  const sourceLanguage = this.SOURCE_LANGUAGE_MAP[fromLanguage]
  const targetLang = this.TARGET_LANGUAGE_MAP[toLanguage]

  if (!sourceLanguage || !targetLang) {
   throw new Error(`Idioma no soportado: ${fromLanguage} -> ${toLanguage}`)
  }

  try {
   const response = await fetch(this.DEEPL_API_URL, {
    method: 'POST',
    headers: {
     'Authorization': `DeepL-Auth-Key ${this.DEEPL_API_KEY}`,
     'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
     text: name,
     source_lang: sourceLanguage,  // ✅ Usar SOURCE_LANGUAGE_MAP
     target_lang: targetLang,      // ✅ Usar TARGET_LANGUAGE_MAP
     preserve_formatting: '1'
    })
   })

   if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DeepL API Error: ${response.status} - ${errorText}`)
   }

   const result = await response.json()
   const translations = result.translations

   if (!translations || translations.length === 0) {
    throw new Error('Respuesta inválida de DeepL API')
   }

   return {
    name: translations[0].text
   }

  } catch (error) {
   console.error('❌ Error en traducción de categoría con DeepL:', error)
   throw error
  }
 }

 /**
  * Guardar las traducciones del blog en la base de datos
  */


 /**
  * Guardar las traducciones de categoría en la base de datos
  */


 // ================== UTILIDADES DE ESTADO ==================

 private static async markJobAsProcessing(jobId: string): Promise<void> {
  await prismaService.prisma.translationQueue.update({
   where: { id: jobId },
   data: {
    status: 'processing',
    processedAt: new Date()
   }
  })
 }

 private static async markJobAsCompleted(jobId: string): Promise<void> {
  await prismaService.prisma.translationQueue.update({
   where: { id: jobId },
   data: {
    status: 'completed',
    completedAt: new Date()
   }
  })
 }

 private static async markJobAsFailed(jobId: string, errorMessage: string): Promise<void> {
  await prismaService.prisma.translationQueue.update({
   where: { id: jobId },
   data: {
    status: 'failed',
    errorMessage,
    retryCount: { increment: 1 }
   }
  })
 }

 private static delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
 }

 // ================== MÉTODOS PÚBLICOS ADICIONALES ==================

 /**
  * Verificar idiomas disponibles en DeepL - ACTUALIZADO
  */
 static async getAvailableLanguages(): Promise<string[]> {
  if (!this.DEEPL_API_KEY) {
   return Object.keys(this.SOURCE_LANGUAGE_MAP)
  }

  try {
   const response = await fetch('https://api-free.deepl.com/v2/languages?type=target', {
    headers: {
     'Authorization': `DeepL-Auth-Key ${this.DEEPL_API_KEY}`,
    }
   })

   if (response.ok) {
    const data = await response.json()
    return data.map((lang: any) => lang.language.toLowerCase())
   }
  } catch (error) {
   console.error('Error obteniendo idiomas de DeepL:', error)
  }

  return Object.keys(this.SOURCE_LANGUAGE_MAP)
 }

 /**
  * Limpiar trabajos completados antiguos
  */
 static async cleanupCompletedJobs(olderThanDays: number = 7): Promise<number> {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - olderThanDays)

  const result = await prismaService.prisma.translationQueue.deleteMany({
   where: {
    status: 'completed',
    completedAt: {
     lt: cutoffDate
    }
   }
  })

  return result.count
 }

 /**
  * Reintentar trabajos fallidos
  */
 static async retryFailedJobs(): Promise<number> {
  const result = await prismaService.prisma.translationQueue.updateMany({
   where: {
    status: 'failed',
    retryCount: { lt: this.MAX_RETRIES }
   },
   data: {
    status: 'pending',
    errorMessage: null
   }
  })

  return result.count
 }

 /**
  * Obtener trabajos activos con detalles
  */
 static async getActiveJobs() {
  return await prismaService.prisma.translationQueue.findMany({
   where: {
    status: { in: ['pending', 'processing'] }
   },
   include: {
    blog: {
     select: {
      title: true,
      slug: true,
      Category: {
       select: {
        id: true,
        name: true
       }
      }
     }
    }
   },
   orderBy: [
    { priority: 'desc' },
    { createdAt: 'asc' }
   ]
  })
 }

 /**
  * Forzar procesamiento inmediato (para testing/debugging)
  */
 static async forceProcessQueue(): Promise<{ success: boolean; processed: number; errors: number }> {
  console.log('⚡ FORZANDO procesamiento inmediato de cola...')

  let processed = 0
  let errors = 0

  try {
   const jobs = await this.getNextJobs(10) // Procesar hasta 10 trabajos

   for (const job of jobs) {
    try {
     console.log(`🔥 Procesando FORZADO: ${job.id}`)
     await this.processJob(job)
     processed++
    } catch (error) {
     console.error(`❌ Error en procesamiento forzado ${job.id}:`, error)
     errors++
    }
   }

   console.log(`🎯 Procesamiento forzado completado: ${processed} exitosos, ${errors} errores`)

   return { success: true, processed, errors }
  } catch (error) {
   console.error('💥 Error en procesamiento forzado:', error)
   return { success: false, processed, errors: errors + 1 }
  }
 }
}