'use client'

import { useState, useEffect } from 'react' // ✅ AGREGAR ESTO
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { tagKeys } from '@/lib/query-keys' // ✅ CORREGIR RUTA
import * as tagsApi from '@/lib/api/tags.api' // ✅ AHORA SÍ EXISTIRÁ

// Mantener las interfaces existentes
export interface Tag {
  id: string
  name: string
  slug: string
  description?: string
  baseLanguage: string
  blogs?: {
    id: string
    blog: {
      id: string
      title: string
      slug: string
      dateCreated?: Date
      views?: number
      readTime?: number
      baseLanguage: string
    }
  }[]
  _count?: {
    blogs: number
  }
}

export interface CreateTagData {
  name: string
  slug: string
  description?: string
  baseLanguage?: string
}

export interface UpdateTagData extends CreateTagData {
  id: string
}

export interface TagStats {
  language: string
  totalTags: number
  mostUsedTag: {
    name: string
    blogCount: number
  } | null
}

export interface TagValidation {
  compatible: boolean
  tag: { name: string; language: string }
  blog: { title: string; language: string }
}

// =============== QUERIES ===============

export function useTags(includeBlogs = false, language?: string) {
  const params = { includeBlogs, language }
  
  return useQuery({
    queryKey: tagKeys.list(params),
    queryFn: () => tagsApi.fetchTags(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useTag(id?: string) {
  return useQuery({
    queryKey: tagKeys.detail(id!),
    queryFn: () => tagsApi.fetchTagById(id!),
    enabled: !!id,
  })
}

export function usePopularTags(limit = 10, language?: string) {
  const params = { limit, language }
  
  return useQuery({
    queryKey: tagKeys.popular(params),
    queryFn: () => tagsApi.fetchPopularTags(params),
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useTagsForBlog(blogId?: string) {
  return useQuery({
    queryKey: tagKeys.forBlog(blogId!),
    queryFn: () => tagsApi.fetchTagsForBlog(blogId!),
    enabled: !!blogId,
  })
}

export function useTagSearch(query: string, language?: string) {
  return useQuery({
    queryKey: tagKeys.search(query, language),
    queryFn: () => tagsApi.searchTags({ query, language }),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export function useAvailableLanguages() {
  return useQuery({
    queryKey: tagKeys.languages(),
    queryFn: tagsApi.fetchAvailableLanguages,
    staleTime: 30 * 60 * 1000, // 30 minutos
  })
}

export function useTagStats() {
  return useQuery({
    queryKey: tagKeys.stats(),
    queryFn: tagsApi.fetchTagStats,
    staleTime: 15 * 60 * 1000, // 15 minutos
  })
}

export function useValidateTagBlog(tagId?: string, blogId?: string) {
  return useQuery({
    queryKey: tagKeys.validation(tagId!, blogId!),
    queryFn: () => tagsApi.validateTagBlogAssociation(tagId!, blogId!),
    enabled: !!(tagId && blogId),
    staleTime: 5 * 60 * 1000,
  })
}

// =============== MUTATIONS ===============

export function useCreateTag() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tagsApi.createTag,
    onSuccess: (newTag: Tag) => {
      toast.success('Tag creado exitosamente')
      
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tagKeys.popular() })
      queryClient.invalidateQueries({ queryKey: tagKeys.stats() })
      
      // Invalidar específicamente por idioma si es conocido
      if (newTag.baseLanguage) {
        queryClient.invalidateQueries({ 
          queryKey: tagKeys.list({ language: newTag.baseLanguage }) 
        })
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al crear el tag')
    }
  })
}

export function useUpdateTag() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tagsApi.updateTag,
    onSuccess: (updatedTag: Tag) => {
      toast.success('Tag actualizado exitosamente')
      
      // Actualizar cache específico
      queryClient.setQueryData(tagKeys.detail(updatedTag.id), updatedTag)
      
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tagKeys.popular() })
      
      // Invalidar búsquedas
      queryClient.invalidateQueries({ 
        queryKey: tagKeys.all,
        predicate: (query) => query.queryKey.includes('search')
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el tag')
    }
  })
}

export function useDeleteTag() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tagsApi.deleteTag,
    onSuccess: (result, deletedId: string) => {
      toast.success(result.message || 'Tag eliminado exitosamente')
      
      // Remover de cache
      queryClient.removeQueries({ queryKey: tagKeys.detail(deletedId) })
      
      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
      queryClient.invalidateQueries({ queryKey: tagKeys.popular() })
      queryClient.invalidateQueries({ queryKey: tagKeys.stats() })
      
      // Invalidar validaciones relacionadas
      queryClient.invalidateQueries({
        queryKey: tagKeys.all,
        predicate: (query) => 
          query.queryKey.includes('validation') && 
          query.queryKey.includes(deletedId)
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar el tag')
    }
  })
}

// =============== HOOKS ESPECIALIZADOS (mantienen compatibilidad) ===============

export function useTagsByLanguage(language: string, includeBlogs = false) {
  return useTags(includeBlogs, language)
}

// Hook con debounce automático para búsqueda
export function useTagSearchWithDebounce(query: string, language?: string, delay = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)
  
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay)
    return () => clearTimeout(timer)
  }, [query, delay])
  
  return useTagSearch(debouncedQuery, language)
}

// Hook con optimistic updates
export function useOptimisticCreateTag() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: tagsApi.createTag,
    onMutate: async (newTag: CreateTagData) => {
      // Cancelar queries en curso
      await queryClient.cancelQueries({ queryKey: tagKeys.lists() })
      
      // Snapshot del estado anterior
      const queryKey = tagKeys.list({ language: newTag.baseLanguage })
      const previousTags = queryClient.getQueryData(queryKey)
      
      // Update optimista
      const tempTag: Tag = {
        id: `temp-${Date.now()}`,
        ...newTag,
        baseLanguage: newTag.baseLanguage || 'es',
        _count: { blogs: 0 }
      }
      
      queryClient.setQueryData(queryKey, (old: Tag[] = []) => [...old, tempTag])
      
      return { previousTags, tempTag, queryKey }
    },
    onError: (error, variables, context) => {
      // Rollback en caso de error
      if (context?.previousTags && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousTags)
      }
      toast.error(error.message || 'Error al crear el tag')
    },
    onSettled: () => {
      // Refetch para consistencia
      queryClient.invalidateQueries({ queryKey: tagKeys.lists() })
    }
  })
}

// Mantener compatibilidad con funciones existentes para transición gradual
export function useTagsLegacy(includeBlogs = false, language?: string) {
  const { data: tags = [], isLoading: loading, error } = useTags(includeBlogs, language)
  const createMutation = useCreateTag()
  const updateMutation = useUpdateTag()
  const deleteMutation = useDeleteTag()
  
  return {
    tags,
    loading,
    error: error?.message || null,
    createTag: createMutation.mutateAsync,
    updateTag: updateMutation.mutateAsync,
    deleteTag: deleteMutation.mutateAsync,
    refetch: () => {
      const queryClient = useQueryClient()
      queryClient.invalidateQueries({ queryKey: tagKeys.list({ includeBlogs, language }) })
    }
  }
}