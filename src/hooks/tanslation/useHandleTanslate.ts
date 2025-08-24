// src/hooks/tanslation/useHandleTanslate.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Tipos actualizados
type TranslationStats = {
 pending: number
 processing: number
 completed: number
 failed: number
 total: number
}

type ActiveJob = {
 id: string
 blogId: string
 targetLanguage: string
 status: string
 createdAt: string
 blog: {
  title: string
  slug: string
  Category?: {  // AGREGADO
   id: string
   name: string
  } | null
 }
}

type TranslationQueueResponse = {
 success: boolean
 stats: TranslationStats
 activeJobs: ActiveJob[]
}

// Hook para obtener estadísticas de traducción
export function useTranslationQueue() {
 return useQuery({
  queryKey: ['translation-queue'],
  queryFn: async (): Promise<TranslationQueueResponse> => {
   const response = await fetch('/api/blogs/translate')
   if (!response.ok) {
    throw new Error('Error al obtener estadísticas de traducción')
   }
   return response.json()
  },
  refetchInterval: 5000, // Actualizar cada 5 segundos
  staleTime: 2000,
 })
}

// Hook para agregar trabajos de traducción
export function useAddTranslationJobs() {
 const queryClient = useQueryClient()

 return useMutation({
  mutationFn: async ({
   blogIds,
   targetLanguage,
   priority = 0
  }: {
   blogIds: string[]
   targetLanguage: string
   priority?: number
  }) => {
   const response = await fetch('/api/blogs/translate', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
    },
    body: JSON.stringify({
     blogIds,
     targetLanguage,
     priority
    })
   })

   if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Error al agregar trabajos de traducción')
   }

   return response.json()
  },
  onSuccess: () => {
   // Invalidar cache para actualizar estadísticas
   queryClient.invalidateQueries({ queryKey: ['translation-queue'] })
   queryClient.invalidateQueries({ queryKey: ['blog-management'] })
  }
 })
}

// Hook para iniciar procesamiento
export function useStartTranslationProcess() {
 const queryClient = useQueryClient()

 return useMutation({
  mutationFn: async () => {
   const response = await fetch('/api/blogs/translate/process', {
    method: 'POST'
   })

   if (!response.ok) {
    throw new Error('Error al iniciar procesamiento')
   }

   return response.json()
  },
  onSuccess: () => {
   queryClient.invalidateQueries({ queryKey: ['translation-queue'] })
  }
 })
}

// Hook para obtener traducciones disponibles de un blog
export function useBlogTranslations(blogId: string) {
 return useQuery({
  queryKey: ['blog-translations', blogId],
  queryFn: async () => {
   const response = await fetch(`/api/blogs/${blogId}/translations`)
   if (!response.ok) {
    throw new Error('Error al obtener traducciones del blog')
   }
   return response.json()
  },
  enabled: !!blogId,
  staleTime: 30000, // 30 segundos
 })
}