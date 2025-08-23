import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { categoryKeys } from '@/lib/query-keys'
import {
 fetchCategories,
 fetchCategoryById,
 fetchPopularCategories,
 searchCategories,
 fetchAvailableLanguages,
 fetchCategoryStats,
 validateCategoryBlogAssociation,
 createCategory,
 updateCategory,
 deleteCategory,
} from '@/lib/api/categorys.api'
import { toast } from 'sonner'

// Tipos para los datos de entrada
export type CreateCategoryData = {
 name: string
 slug: string
 baseLanguage?: string
}

export type UpdateCategoryData = {
 id: string
 name?: string
 slug?: string
 baseLanguage?: string
}

// Tipo para una categoría completa
export type Category = {
 id: string
 name: string
 slug: string
 baseLanguage: string
 _count?: {
  polls: number
  Blog: number
  Image: number
 }
 polls?: any[]
 Blog?: any[]
 Image?: any[]
}

// Tipo para opciones de select
export type CategoryOption = {
 value: string
 label: string
 slug: string
}

// =============== QUERIES ===============

// Hook para obtener todas las categorías
export function useCategories(params?: {
 includeRelations?: boolean
 language?: string
}) {
 return useQuery<Category[]>({
  queryKey: categoryKeys.list(params),
  queryFn: () => fetchCategories(params) as Promise<Category[]>,
  staleTime: 5 * 60 * 1000, // 5 minutos
 })
}

// Hook para obtener una categoría por ID
export function useCategory(id: string) {
 return useQuery<Category>({
  queryKey: categoryKeys.detail(id),
  queryFn: () => fetchCategoryById(id) as Promise<Category>,
  enabled: !!id,
  staleTime: 5 * 60 * 1000,
 })
}

// Hook para obtener categorías populares
export function usePopularCategories(params?: {
 limit?: number
 language?: string
}) {
 return useQuery<Category[]>({
  queryKey: categoryKeys.popular(params),
  queryFn: () => fetchPopularCategories(params) as Promise<Category[]>,
  staleTime: 10 * 60 * 1000, // 10 minutos
 })
}

// Hook para buscar categorías
export function useSearchCategories(
 query: string,
 language?: string,
 options?: {
  enabled?: boolean
  limit?: number
 }
) {
 return useQuery<Category[]>({
  queryKey: categoryKeys.search(query, language),
  queryFn: () => searchCategories({
   query,
   language,
   limit: options?.limit
  }) as Promise<Category[]>,
  enabled: !!query && (options?.enabled ?? true),
  staleTime: 2 * 60 * 1000, // 2 minutos
 })
}

// Hook para obtener idiomas disponibles
export function useCategoryLanguages() {
 return useQuery<string[]>({
  queryKey: categoryKeys.languages(),
  queryFn: () => fetchAvailableLanguages() as Promise<string[]>,
  staleTime: 30 * 60 * 1000, // 30 minutos
 })
}

// Hook para obtener estadísticas de categorías
export function useCategoryStats() {
 return useQuery({
  queryKey: categoryKeys.stats(),
  queryFn: () => fetchCategoryStats() as Promise<any>,
  staleTime: 15 * 60 * 1000, // 15 minutos
 })
}

// Hook para validar asociación categoría-blog
export function useValidateCategoryBlogAssociation(
 categoryId: string,
 blogId: string,
 enabled = true
) {
 return useQuery<{ isAssociated: boolean }>({
  queryKey: categoryKeys.validation(categoryId, blogId),
  queryFn: () => validateCategoryBlogAssociation(categoryId, blogId) as Promise<{ isAssociated: boolean }>,
  enabled: !!categoryId && !!blogId && enabled,
  staleTime: 5 * 60 * 1000,
 })
}

// =============== MUTATIONS ===============

// Hook para crear categoría
export function useCreateCategory() {
 const queryClient = useQueryClient()

 return useMutation<Category, Error, CreateCategoryData>({
  mutationFn: (data) => createCategory(data) as Promise<Category>,
  onSuccess: (data) => {
   // Invalidar queries relacionadas
   queryClient.invalidateQueries({ queryKey: categoryKeys.all })
   queryClient.invalidateQueries({ queryKey: categoryKeys.stats() })
   queryClient.invalidateQueries({ queryKey: categoryKeys.languages() })

   toast.success('Categoría creada exitosamente')
  },
  onError: (error: Error) => {
   toast.error(error.message || 'Error al crear la categoría')
  },
 })
}

// Hook para actualizar categoría
export function useUpdateCategory() {
 const queryClient = useQueryClient()

 return useMutation<Category, Error, UpdateCategoryData>({
  mutationFn: (data) => updateCategory(data) as Promise<Category>,
  onSuccess: (data, variables) => {
   // Invalidar queries relacionadas
   queryClient.invalidateQueries({ queryKey: categoryKeys.all })
   queryClient.invalidateQueries({ queryKey: categoryKeys.detail(variables.id) })
   queryClient.invalidateQueries({ queryKey: categoryKeys.stats() })

   // Actualizar la caché específica si es posible
   queryClient.setQueryData(categoryKeys.detail(variables.id), data)

   toast.success('Categoría actualizada exitosamente')
  },
  onError: (error: Error) => {
   toast.error(error.message || 'Error al actualizar la categoría')
  },
 })
}

// Hook para eliminar categoría
export function useDeleteCategory() {
 const queryClient = useQueryClient()

 return useMutation<{ success: boolean; message: string }, Error, string>({
  mutationFn: (id) => deleteCategory(id) as Promise<{ success: boolean; message: string }>,
  onSuccess: (data, categoryId) => {
   // Invalidar queries relacionadas
   queryClient.invalidateQueries({ queryKey: categoryKeys.all })
   queryClient.invalidateQueries({ queryKey: categoryKeys.stats() })

   // Remover de la caché específica
   queryClient.removeQueries({ queryKey: categoryKeys.detail(categoryId) })

   toast.success('Categoría eliminada exitosamente')
  },
  onError: (error: Error) => {
   toast.error(error.message || 'Error al eliminar la categoría')
  },
 })
}

// =============== HOOKS DE CONVENIENCIA ===============

// Hook para obtener opciones de categorías para selects
export function useCategoryOptions(language?: string): {
 options: CategoryOption[]
 isLoading: boolean
} {
 const { data: categories, isLoading } = useCategories({ language })

 // Verificar que categories sea un array y convertir a opciones
 const options: CategoryOption[] = Array.isArray(categories)
  ? categories.map((category) => ({
   value: category.id,
   label: category.name,
   slug: category.slug,
  }))
  : []

 return {
  options,
  isLoading,
 }
}

// Hook para gestión completa de una categoría (para formularios)
export function useCategoryManager(categoryId?: string) {
 const queryClient = useQueryClient()

 // Queries
 const categoryQuery = useCategory(categoryId || '')
 const createMutation = useCreateCategory()
 const updateMutation = useUpdateCategory()
 const deleteMutation = useDeleteCategory()

 // Estado derivado
 const isLoading = categoryQuery.isLoading
 const isCreating = createMutation.isPending
 const isUpdating = updateMutation.isPending
 const isDeleting = deleteMutation.isPending
 const isMutating = isCreating || isUpdating || isDeleting

 // Funciones de acción
 const createCategoryAction = async (data: CreateCategoryData): Promise<Category> => {
  return createMutation.mutateAsync(data)
 }

 const updateCategoryAction = async (data: Omit<UpdateCategoryData, 'id'>): Promise<Category> => {
  if (!categoryId) throw new Error('Category ID is required for update')
  return updateMutation.mutateAsync({ ...data, id: categoryId })
 }

 const deleteCategoryAction = async (): Promise<{ success: boolean; message: string }> => {
  if (!categoryId) throw new Error('Category ID is required for delete')
  return deleteMutation.mutateAsync(categoryId)
 }

 // Reset de mutaciones
 const resetMutations = () => {
  createMutation.reset()
  updateMutation.reset()
  deleteMutation.reset()
 }

 return {
  // Data
  category: categoryQuery.data,

  // Loading states
  isLoading,
  isCreating,
  isUpdating,
  isDeleting,
  isMutating,

  // Actions
  createCategory: createCategoryAction,
  updateCategory: updateCategoryAction,
  deleteCategory: deleteCategoryAction,
  resetMutations,

  // Errors
  createError: createMutation.error,
  updateError: updateMutation.error,
  deleteError: deleteMutation.error,

  // Success states
  createSuccess: createMutation.isSuccess,
  updateSuccess: updateMutation.isSuccess,
  deleteSuccess: deleteMutation.isSuccess,
 }
}

// Hook para prefetching de categorías (optimización)
export function usePrefetchCategories() {
 const queryClient = useQueryClient()

 const prefetchCategories = (params?: {
  includeRelations?: boolean
  language?: string
 }) => {
  return queryClient.prefetchQuery({
   queryKey: categoryKeys.list(params),
   queryFn: () => fetchCategories(params) as Promise<Category[]>,
   staleTime: 5 * 60 * 1000,
  })
 }

 const prefetchCategory = (id: string) => {
  return queryClient.prefetchQuery({
   queryKey: categoryKeys.detail(id),
   queryFn: () => fetchCategoryById(id) as Promise<Category>,
   staleTime: 5 * 60 * 1000,
  })
 }

 const prefetchPopularCategories = (params?: {
  limit?: number
  language?: string
 }) => {
  return queryClient.prefetchQuery({
   queryKey: categoryKeys.popular(params),
   queryFn: () => fetchPopularCategories(params) as Promise<Category[]>,
   staleTime: 10 * 60 * 1000,
  })
 }

 return {
  prefetchCategories,
  prefetchCategory,
  prefetchPopularCategories,
 }
}