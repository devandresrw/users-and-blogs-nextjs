'use client'
import { useState, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { authorKeys } from '@/lib/query-keys'
import * as authorsApi from '@/lib/api/authors.api'

// Interfaces
export interface Author {
  id: string
  name: string
  link?: string
  description?: string
  twitter?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  profilePicture?: string
  profileImageId?: string
  userId?: string
  blogAuthors?: {
    id: string
    blog: {
      id: string
      title: string
      slug: string
      dateCreated?: Date
      views?: number
      readTime?: number
    }
  }[]
  user?: {
    id: string
    name?: string
    email?: string
    image?: string
  }
  profileImage?: {
    id: string
    url: string
    alt?: string
  }
  socialMedia?: {
    id: string
    platform: string
    url: string
    username?: string
    isActive: boolean
  }[]
  _count?: {
    blogAuthors: number
  }
}

export interface CreateAuthorData {
  name: string
  link?: string
  description?: string
  twitter?: string
  instagram?: string
  facebook?: string
  linkedin?: string
  profilePicture?: string
  profileImageId?: string
  userId?: string
}

export interface UpdateAuthorData extends CreateAuthorData {
  id: string
}

export interface AuthorStats {
  totalAuthors: number
  authorsWithBlogs: number
  authorsWithUsers: number
  topAuthor: {
    name: string
    blogCount: number
  } | null
}

export interface AuthorValidation {
  compatible: boolean
  alreadyAssociated: boolean
  author: { name: string }
  blog: { title: string }
}

// =============== QUERIES ===============

export function useAuthors(includeBlogs = false, includeUser = false) {
  const params = { includeBlogs, includeUser }

  return useQuery({
    queryKey: authorKeys.list(params),
    queryFn: () => authorsApi.fetchAuthors(params),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}

export function useAuthor(id?: string) {
  return useQuery({
    queryKey: authorKeys.detail(id!),
    queryFn: () => authorsApi.fetchAuthorById(id!),
    enabled: !!id,
  })
}

export function usePopularAuthors(limit = 10) {
  const params = { limit }

  return useQuery({
    queryKey: authorKeys.popular(params),
    queryFn: () => authorsApi.fetchPopularAuthors(params),
    staleTime: 10 * 60 * 1000, // 10 minutos
  })
}

export function useAuthorsByUser(userId?: string) {
  return useQuery({
    queryKey: authorKeys.byUser(userId!),
    queryFn: () => authorsApi.fetchAuthorsByUser(userId!),
    enabled: !!userId,
  })
}

export function useAuthorSearch(query: string) {
  return useQuery({
    queryKey: authorKeys.search(query),
    queryFn: () => authorsApi.searchAuthors({ query }),
    enabled: query.trim().length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutos
  })
}

export function useAuthorStats() {
  return useQuery({
    queryKey: authorKeys.stats(),
    queryFn: authorsApi.fetchAuthorStats,
    staleTime: 15 * 60 * 1000, // 15 minutos
  })
}

export function useValidateAuthorBlog(authorId?: string, blogId?: string) {
  return useQuery({
    queryKey: authorKeys.validation(authorId!, blogId!),
    queryFn: () => authorsApi.validateAuthorBlogAssociation(authorId!, blogId!),
    enabled: !!(authorId && blogId),
    staleTime: 5 * 60 * 1000,
  })
}

// =============== MUTATIONS ===============

export function useCreateAuthor() {
  const queryClient = useQueryClient()

  return useMutation<Author, Error, FormData>({
    mutationFn: authorsApi.createAuthor,
    onSuccess: (newAuthor: Author) => {
      toast.success('Autor creado exitosamente')

      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: authorKeys.lists() })
      queryClient.invalidateQueries({ queryKey: authorKeys.popular() })
      queryClient.invalidateQueries({ queryKey: authorKeys.stats() })

      // Si está asociado a un usuario, invalidar esa query también
      if (newAuthor.userId) {
        queryClient.invalidateQueries({
          queryKey: authorKeys.byUser(newAuthor.userId)
        })
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al crear el autor')
    }
  })
}

export function useUpdateAuthor() {
  const queryClient = useQueryClient()

  return useMutation<Author, Error, FormData>({
    mutationFn: authorsApi.updateAuthor,
    onSuccess: (updatedAuthor: Author) => {
      toast.success('Autor actualizado exitosamente')

      // Actualizar cache específico
      queryClient.setQueryData(authorKeys.detail(updatedAuthor.id), updatedAuthor)

      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: authorKeys.lists() })
      queryClient.invalidateQueries({ queryKey: authorKeys.popular() })

      // Invalidar búsquedas
      queryClient.invalidateQueries({
        queryKey: authorKeys.all,
        predicate: (query) => query.queryKey.includes('search')
      })

      // Si está asociado a un usuario, invalidar esa query también
      if (updatedAuthor.userId) {
        queryClient.invalidateQueries({
          queryKey: authorKeys.byUser(updatedAuthor.userId)
        })
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al actualizar el autor')
    }
  })
}

export function useDeleteAuthor() {
  const queryClient = useQueryClient()

  return useMutation<{ message: string }, Error, string>({
    mutationFn: authorsApi.deleteAuthor,
    onSuccess: (result, deletedId: string) => {
      toast.success(result.message || 'Autor eliminado exitosamente')

      // Remover de cache
      queryClient.removeQueries({ queryKey: authorKeys.detail(deletedId) })

      // Invalidar listas
      queryClient.invalidateQueries({ queryKey: authorKeys.lists() })
      queryClient.invalidateQueries({ queryKey: authorKeys.popular() })
      queryClient.invalidateQueries({ queryKey: authorKeys.stats() })

      // Invalidar validaciones relacionadas
      queryClient.invalidateQueries({
        queryKey: authorKeys.all,
        predicate: (query) =>
          query.queryKey.includes('validation') &&
          query.queryKey.includes(deletedId)
      })
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Error al eliminar el autor')
    }
  })
}

// =============== HOOKS ESPECIALIZADOS ===============

// Hook con debounce automático para búsqueda
export function useAuthorSearchWithDebounce(query: string, delay = 300) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), delay)
    return () => clearTimeout(timer)
  }, [query, delay])

  return useAuthorSearch(debouncedQuery)
}

// Hook con optimistic updates
export function useOptimisticCreateAuthor() {
  const queryClient = useQueryClient()

  return useMutation<Author, Error, FormData, {
    previousAuthors: Author[] | undefined
    tempAuthor: Author
    queryKey: readonly unknown[]
  }>({
    mutationFn: authorsApi.createAuthor,
    onMutate: async (formData: FormData) => {
      // Extraer datos del FormData para crear el autor temporal
      const name = formData.get('name') as string;
      const description = formData.get('description') as string;
      const link = formData.get('link') as string;
      const twitter = formData.get('twitter') as string;
      const instagram = formData.get('instagram') as string;
      const facebook = formData.get('facebook') as string;
      const linkedin = formData.get('linkedin') as string;
      const profilePicture = formData.get('profilePicture') as string;

      // Cancelar queries en curso
      await queryClient.cancelQueries({ queryKey: authorKeys.lists() })

      // Snapshot del estado anterior
      const queryKey = authorKeys.list()
      const previousAuthors = queryClient.getQueryData<Author[]>(queryKey)

      // Update optimista
      const tempAuthor: Author = {
        id: `temp-${Date.now()}`,
        name: name || 'Nuevo Autor',
        description: description || undefined,
        link: link || undefined,
        twitter: twitter || undefined,
        instagram: instagram || undefined,
        facebook: facebook || undefined,
        linkedin: linkedin || undefined,
        profilePicture: profilePicture || undefined,
        _count: { blogAuthors: 0 }
      }

      queryClient.setQueryData(queryKey, (old: Author[] = []) => [...old, tempAuthor])

      return { previousAuthors, tempAuthor, queryKey }
    },
    onError: (error, variables, context) => {
      // Rollback en caso de error
      if (context?.previousAuthors && context?.queryKey) {
        queryClient.setQueryData(context.queryKey, context.previousAuthors)
      }
      toast.error(error.message || 'Error al crear el autor')
    },
    onSettled: () => {
      // Refetch para consistencia
      queryClient.invalidateQueries({ queryKey: authorKeys.lists() })
    }
  })
}


// Mantener compatibilidad con funciones existentes para transición gradual
export function useAuthorsLegacy(includeBlogs = false, includeUser = false) {
  const { data: authors = [], isLoading: loading, error } = useAuthors(includeBlogs, includeUser)
  const createMutation = useCreateAuthor()
  const updateMutation = useUpdateAuthor()
  const deleteMutation = useDeleteAuthor()

  return {
    authors,
    loading,
    error: error?.message || null,
    createAuthor: createMutation.mutateAsync,
    updateAuthor: updateMutation.mutateAsync,
    deleteAuthor: deleteMutation.mutateAsync,
    refetch: () => {
      const queryClient = useQueryClient()
      queryClient.invalidateQueries({ queryKey: authorKeys.list({ includeBlogs, includeUser }) })
    }
  }
}