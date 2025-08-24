import { BlogManagementData, BlogManagementResponse } from '@/lib/actions/blogs-management.actions'

const API_BASE = '/api/blogs/managment'

// Helper para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
 if (!response.ok) {
  const errorData = await response.text()
  let errorMessage = 'Error en la petición'

  try {
   const errorJson = JSON.parse(errorData)
   errorMessage = errorJson.error || errorMessage
  } catch {
   errorMessage = errorData || errorMessage
  }

  throw new Error(errorMessage)
 }
 return response.json()
}

// =============== QUERIES (GET) ===============
export async function fetchBlogsForManagement(params?: {
 lang?: string;
 page?: number;
 limit?: number;
 status?: 'translated' | 'untranslated' | 'all';
 targetLanguage?: string;
}): Promise<BlogManagementData> {
 const searchParams = new URLSearchParams()

 if (params?.lang) searchParams.append('lang', params.lang)
 if (params?.page) searchParams.append('page', params.page.toString())
 if (params?.limit) searchParams.append('limit', params.limit.toString())
 if (params?.status) searchParams.append('status', params.status)
 if (params?.targetLanguage) searchParams.append('targetLanguage', params.targetLanguage)

 const url = searchParams.toString() ? `${API_BASE}?${searchParams}` : API_BASE
 const response = await fetch(url)

 // La respuesta del endpoint ya es solo los datos, no el wrapper con success
 return handleResponse<BlogManagementData>(response)
}

// Funciones específicas para diferentes casos de uso
export async function fetchBlogsTranslationStatus(params: {
 targetLanguage: string;
 lang?: string;
 page?: number;
 limit?: number;
}): Promise<BlogManagementData> {
 return fetchBlogsForManagement({
  ...params,
  status: 'all'
 })
}

export async function fetchUntranslatedBlogs(params: {
 targetLanguage: string;
 lang?: string;
 page?: number;
 limit?: number;
}): Promise<BlogManagementData> {
 return fetchBlogsForManagement({
  ...params,
  status: 'untranslated'
 })
}

export async function fetchTranslatedBlogs(params: {
 targetLanguage: string;
 lang?: string;
 page?: number;
 limit?: number;
}): Promise<BlogManagementData> {
 return fetchBlogsForManagement({
  ...params,
  status: 'translated'
 })
}

// =============== TYPES ===============
export type BlogsManagementParams = Parameters<typeof fetchBlogsForManagement>[0]
export type BlogsTranslationStatusParams = Parameters<typeof fetchBlogsTranslationStatus>[0]
export type UntranslatedBlogsParams = Parameters<typeof fetchUntranslatedBlogs>[0]
export type TranslatedBlogsParams = Parameters<typeof fetchTranslatedBlogs>[0]