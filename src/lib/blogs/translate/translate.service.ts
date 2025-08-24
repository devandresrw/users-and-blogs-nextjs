// src/lib/blogs/translate/translate.service.ts
import prismaService from '@/lib/config/prisma.service'

// Tipos para el servicio de traducción
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

// Clase principal del servicio de traducción
export class TranslationService {
 private static readonly BATCH_SIZE = 5
 private static readonly PROCESSING_DELAY = 12000 // 12 segundos = 5 por minuto
 private static readonly MAX_RETRIES = 3
 private static readonly DEEPL_API_URL = 'https://api-free.deepl.com/v2/translate' // Cambiar a 'https://api.deepl.com/v2/translate' si tienes plan pro
 private static readonly DEEPL_API_KEY = process.env.DEEPL_API_KEY

 // Mapeo de códigos de idioma
 private static readonly LANGUAGE_MAP: Record<string, string> = {
  'es': 'ES',
  'en': 'EN-US',
  'fr': 'FR',
  'de': 'DE',
  'it': 'IT',
  'pt': 'PT-BR',
  'ja': 'JA',
  'zh': 'ZH',
  'ar': 'AR' // Nota: DeepL puede no soportar árabe, verificar disponibilidad
 }

 // ================== GESTIÓN DE COLA ==================

 /**
  * Agregar trabajos de traducción a la cola
  */
 static async addTranslationJobs({
  blogIds,
  targetLanguage,
  priority = 0
 }: BatchTranslationRequest): Promise<{ success: boolean; added: number; existing: number }> {
  try {
   let added = 0
   let existing = 0

   for (const blogId of blogIds) {
    // Verificar si ya existe en la cola
    const existingJob = await prismaService.prisma.translationQueue.findUnique({
     where: {
      blogId_targetLanguage: {
       blogId,
       targetLanguage
      }
     }
    })

    if (existingJob) {
     existing++
     // Si falló, reiniciar
     if (existingJob.status === 'failed' && existingJob.retryCount < this.MAX_RETRIES) {
      await prismaService.prisma.translationQueue.update({
       where: { id: existingJob.id },
       data: {
        status: 'pending',
        errorMessage: null,
        priority
       }
      })
      added++
     }
    } else {
     // Verificar si ya está traducido
     const existingTranslation = await prismaService.prisma.translation.findFirst({
      where: {
       entityType: 'blog',
       entityId: blogId,
       language: targetLanguage,
       field: 'title'
      }
     })

     if (!existingTranslation) {
      await prismaService.prisma.translationQueue.create({
       data: {
        blogId,
        targetLanguage,
        priority,
        status: 'pending'
       }
      })
      added++
     } else {
      existing++
     }
    }
   }

   return { success: true, added, existing }
  } catch (error) {
   console.error('Error adding translation jobs:', error)
   throw new Error('Failed to add translation jobs')
  }
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
   const jobs = await this.getNextJobs()

   if (jobs.length === 0) {
    console.log('No hay trabajos pendientes en la cola')
    return
   }

   console.log(`Procesando ${jobs.length} trabajos de traducción...`)

   // Procesar trabajos secuencialmente para respetar rate limiting
   for (const job of jobs) {
    try {
     await this.processJob(job)
     // Esperar entre traducciones para respetar rate limiting
     if (jobs.indexOf(job) < jobs.length - 1) {
      await this.delay(this.PROCESSING_DELAY)
     }
    } catch (error) {
     console.error(`Error procesando trabajo ${job.id}:`, error)
    }
   }
  } catch (error) {
   console.error('Error en processQueue:', error)
  }
 }

 /**
  * Procesar un trabajo individual
  */
 private static async processJob(job: any): Promise<void> {
  try {
   // Marcar como procesando
   await this.markJobAsProcessing(job.id)

   const blog = job.blog

   if (!blog) {
    throw new Error('Blog no encontrado')
   }

   // 1. Traducir la categoría si es necesaria
   if (blog.Category && blog.categoryId) {
    await this.translateCategoryIfNeeded(blog.categoryId, blog.Category, job.targetLanguage)
   }

   // 2. Traducir el blog
   const translatedContent = await this.translateBlogContent({
    title: blog.title,
    content: blog.content,
    titlePunch: blog.titlePunch,
    seoDescription: blog.seoDescription,
    fromLanguage: blog.baseLanguage,
    toLanguage: job.targetLanguage
   })

   // 3. Guardar las traducciones del blog
   await this.saveBlogTranslations(job.blogId, job.targetLanguage, translatedContent)

   // 4. Marcar como completado
   await this.markJobAsCompleted(job.id)

   console.log(`✅ Traducción completada: ${job.blogId} -> ${job.targetLanguage}`)

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
   // Verificar si la categoría ya está traducida
   const existingTranslation = await prismaService.prisma.translation.findFirst({
    where: {
     entityType: 'category',
     entityId: categoryId,
     language: targetLanguage,
     field: 'name'
    }
   })

   if (existingTranslation) {
    console.log(`Categoría ${categoryId} ya está traducida a ${targetLanguage}`)
    return
   }

   // Traducir la categoría
   const translatedCategory = await this.translateCategoryContent({
    name: category.name,
    fromLanguage: category.baseLanguage,
    toLanguage: targetLanguage
   })

   // Guardar la traducción de la categoría
   await this.saveCategoryTranslations(categoryId, targetLanguage, translatedCategory)

   console.log(`✅ Categoría traducida: ${categoryId} -> ${targetLanguage}`)

  } catch (error) {
   console.error(`Error traduciendo categoría ${categoryId}:`, error)
   // No fallar el trabajo completo si la categoría falla
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

  if (!this.DEEPL_API_KEY) {
   throw new Error('DEEPL_API_KEY no está configurada')
  }

  const sourceLanguage = this.LANGUAGE_MAP[fromLanguage]
  const targetLang = this.LANGUAGE_MAP[toLanguage]

  if (!sourceLanguage || !targetLang) {
   throw new Error(`Idioma no soportado: ${fromLanguage} -> ${toLanguage}`)
  }

  try {
   // Preparar textos para traducir
   const textsToTranslate = [title, content]
   if (titlePunch) textsToTranslate.push(titlePunch)
   if (seoDescription) textsToTranslate.push(seoDescription)

   // Llamar a DeepL API
   const response = await fetch(this.DEEPL_API_URL, {
    method: 'POST',
    headers: {
     'Authorization': `DeepL-Auth-Key ${this.DEEPL_API_KEY}`,
     'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
     text: textsToTranslate,
     source_lang: sourceLanguage,
     target_lang: targetLang,
     preserve_formatting: '1',
     tag_handling: 'html'
    } as any)
   })

   if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`DeepL API Error: ${response.status} - ${errorText}`)
   }

   const result = await response.json()
   const translations = result.translations

   if (!translations || translations.length < 2) {
    throw new Error('Respuesta inválida de DeepL API')
   }

   // Mapear las traducciones
   const translatedContent: TranslationApiResponse = {
    title: translations[0].text,
    content: translations[1].text,
    titlePunch: titlePunch && translations[2] ? translations[2].text : undefined,
    seoDescription: seoDescription && translations[titlePunch ? 3 : 2] ? translations[titlePunch ? 3 : 2].text : undefined
   }

   return translatedContent

  } catch (error) {
   console.error('Error en traducción con DeepL:', error)
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

  const sourceLanguage = this.LANGUAGE_MAP[fromLanguage]
  const targetLang = this.LANGUAGE_MAP[toLanguage]

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
     source_lang: sourceLanguage,
     target_lang: targetLang,
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
   console.error('Error en traducción de categoría con DeepL:', error)
   throw error
  }
 }

 /**
  * Guardar las traducciones del blog en la base de datos
  */
 private static async saveBlogTranslations(
  blogId: string,
  language: string,
  translations: TranslationApiResponse
 ): Promise<void> {
  const translationData = [
   {
    entityType: 'blog',
    entityId: blogId,
    language,
    field: 'title',
    value: translations.title
   },
   {
    entityType: 'blog',
    entityId: blogId,
    language,
    field: 'content',
    value: translations.content
   }
  ]

  // Agregar traducciones opcionales si existen
  if (translations.titlePunch) {
   translationData.push({
    entityType: 'blog',
    entityId: blogId,
    language,
    field: 'titlePunch',
    value: translations.titlePunch
   })
  }

  if (translations.seoDescription) {
   translationData.push({
    entityType: 'blog',
    entityId: blogId,
    language,
    field: 'seoDescription',
    value: translations.seoDescription
   })
  }

  // Guardar todas las traducciones
  for (const translation of translationData) {
   await prismaService.prisma.translation.upsert({
    where: {
     entityType_entityId_language_field: {
      entityType: translation.entityType,
      entityId: translation.entityId,
      language: translation.language,
      field: translation.field
     }
    },
    create: translation,
    update: { value: translation.value }
   })
  }
 }

 /**
  * Guardar las traducciones de categoría en la base de datos
  */
 private static async saveCategoryTranslations(
  categoryId: string,
  language: string,
  translations: CategoryTranslationResponse
 ): Promise<void> {
  await prismaService.prisma.translation.upsert({
   where: {
    entityType_entityId_language_field: {
     entityType: 'category',
     entityId: categoryId,
     language,
     field: 'name'
    }
   },
   create: {
    entityType: 'category',
    entityId: categoryId,
    language,
    field: 'name',
    value: translations.name
   },
   update: {
    value: translations.name
   }
  })
 }

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
  * Verificar idiomas disponibles en DeepL
  */
 static async getAvailableLanguages(): Promise<string[]> {
  if (!this.DEEPL_API_KEY) {
   return Object.keys(this.LANGUAGE_MAP)
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

  return Object.keys(this.LANGUAGE_MAP)
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
}