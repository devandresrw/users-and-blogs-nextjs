import { CreateTagData, UpdateTagData } from '@/hooks/blogs/tags/useTags'

const API_BASE = '/api/blogs/tags'

// Helper para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Error desconocido' }))
    throw new Error(error.error || `Error ${response.status}`)
  }
  return response.json()
}

// =============== QUERIES (GET) ===============
export async function fetchTags(params?: {
  includeBlogs?: boolean
  language?: string
}) {
  const searchParams = new URLSearchParams()
  if (params?.includeBlogs) searchParams.append('includeBlogs', 'true')
  if (params?.language) searchParams.append('language', params.language)
  
  const response = await fetch(`${API_BASE}?${searchParams}`)
  return handleResponse(response)
}

export async function fetchTagById(id: string) {
  const response = await fetch(`${API_BASE}/${id}`)
  return handleResponse(response)
}

export async function fetchPopularTags(params?: {
  limit?: number
  language?: string
}) {
  const searchParams = new URLSearchParams({ popular: 'true' })
  if (params?.limit) searchParams.append('limit', params.limit.toString())
  if (params?.language) searchParams.append('language', params.language)
  
  const response = await fetch(`${API_BASE}?${searchParams}`)
  return handleResponse(response)
}

export async function fetchTagsForBlog(blogId: string) {
  const response = await fetch(`${API_BASE}?blogId=${blogId}`)
  return handleResponse(response)
}

export async function searchTags(params: {
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

export async function fetchTagStats() {
  const response = await fetch(`${API_BASE}?stats=true`)
  return handleResponse(response)
}

export async function validateTagBlogAssociation(tagId: string, blogId: string) {
  const response = await fetch(`${API_BASE}?validate=${tagId}&blogId=${blogId}`)
  return handleResponse(response)
}

// =============== MUTATIONS (POST/PUT/DELETE) ===============
export async function createTag(data: CreateTagData) {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function updateTag(data: UpdateTagData) {
  const response = await fetch(API_BASE, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return handleResponse(response)
}

export async function deleteTag(id: string) {
  const response = await fetch(`${API_BASE}?id=${id}`, {
    method: 'DELETE',
  })
  return handleResponse(response)
}