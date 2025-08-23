import { CreateCategoryData, UpdateCategoryData } from '@/hooks/blogs/categories/useCategories'

const API_BASE = '/api/blogs/categories'

// Helper para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
 if (!response.ok) {
  const error = await response.json().catch(() => ({ error: 'Error desconocido' }))
  throw new Error(error.error || `Error ${response.status}`)
 }
 return response.json()
}

// =============== QUERIES (GET) ===============
export async function fetchCategories(params?: {
 includeRelations?: boolean
 language?: string
}) {
 const searchParams = new URLSearchParams()
 if (params?.includeRelations) searchParams.append('includeRelations', 'true')
 if (params?.language) searchParams.append('language', params.language)

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse(response)
}

export async function fetchCategoryById(id: string) {
 const response = await fetch(`${API_BASE}/${id}`)
 return handleResponse(response)
}

export async function fetchPopularCategories(params?: {
 limit?: number
 language?: string
}) {
 const searchParams = new URLSearchParams({ popular: 'true' })
 if (params?.limit) searchParams.append('limit', params.limit.toString())
 if (params?.language) searchParams.append('language', params.language)

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse(response)
}

export async function searchCategories(params: {
 query: string
 language?: string
 limit?: number
}) {
 const searchParams = new URLSearchParams({ query: params.query })
 if (params.language) searchParams.append('language', params.language)
 if (params.limit) searchParams.append('limit', params.limit.toString())

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse(response)
}

export async function fetchAvailableLanguages() {
 const response = await fetch(`${API_BASE}?languages=true`)
 return handleResponse(response)
}

export async function fetchCategoryStats() {
 const response = await fetch(`${API_BASE}?stats=true`)
 return handleResponse(response)
}

export async function validateCategoryBlogAssociation(categoryId: string, blogId: string) {
 const response = await fetch(`${API_BASE}?validate=${categoryId}&blogId=${blogId}`)
 return handleResponse(response)
}

// =============== MUTATIONS (POST/PUT/DELETE) ===============
export async function createCategory(data: CreateCategoryData) {
 const response = await fetch(API_BASE, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 })
 return handleResponse(response)
}

export async function updateCategory(data: UpdateCategoryData) {
 const response = await fetch(API_BASE, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 })
 return handleResponse(response)
}

export async function deleteCategory(id: string) {
 const response = await fetch(`${API_BASE}?id=${id}`, {
  method: 'DELETE',
 })
 return handleResponse(response)
}