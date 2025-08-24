import { useQuery } from '@tanstack/react-query'
import {
 fetchBlogsForManagement,
 fetchBlogsTranslationStatus,
 fetchUntranslatedBlogs,
 fetchTranslatedBlogs,
 type BlogsManagementParams
} from '@/lib/api/blogs-management.api'
import { blogManagementKeys } from '@/lib/query-keys'



export function useBlogsTranslationStatus(
 targetLanguage: string,
 params?: { lang?: string; page?: number; limit?: number }
) {
 const queryParams = { ...params, targetLanguage }

 return useQuery({
  queryKey: blogManagementKeys.translationStatus(queryParams),
  queryFn: () => fetchBlogsTranslationStatus(queryParams),
  enabled: !!targetLanguage,
  staleTime: 1000 * 60 * 5,
 })
}

export function useUntranslatedBlogs(
 targetLanguage: string,
 params?: { lang?: string; page?: number; limit?: number }
) {
 const queryParams = { ...params, targetLanguage }

 return useQuery({
  queryKey: blogManagementKeys.untranslated(queryParams),
  queryFn: () => fetchUntranslatedBlogs(queryParams),
  enabled: !!targetLanguage,
  staleTime: 1000 * 60 * 2, // Menos tiempo porque es información más dinámica
 })
}

export function useTranslatedBlogs(
 targetLanguage: string,
 params?: { lang?: string; page?: number; limit?: number }
) {
 const queryParams = { ...params, targetLanguage }

 return useQuery({
  queryKey: blogManagementKeys.translated(queryParams),
  queryFn: () => fetchTranslatedBlogs(queryParams),
  enabled: !!targetLanguage,
  staleTime: 1000 * 60 * 5,
 })
}

export function useBlogsForManagement(params?: BlogsManagementParams) {
 return useQuery({
  queryKey: blogManagementKeys.list(params),
  queryFn: () => fetchBlogsForManagement(params),
  staleTime: 1000 * 60 * 5, // 5 minutos
 })
}