import { CreateAuthorData, UpdateAuthorData, Author, AuthorStats, AuthorValidation } from '@/hooks/blogs/authors/useAuthors'

const API_BASE = '/api/blogs/authors'

// Helper para manejar respuestas
async function handleResponse<T>(response: Response): Promise<T> {
 if (!response.ok) {
  const error = await response.json().catch(() => ({ error: 'Error desconocido' }))
  throw new Error(error.error || `Error ${response.status}`)
 }
 return response.json()
}

// =============== QUERIES (GET) ===============
export async function fetchAuthors(params?: {
 includeBlogs?: boolean
 includeUser?: boolean
}): Promise<Author[]> {
 const searchParams = new URLSearchParams()
 if (params?.includeBlogs) searchParams.append('includeBlogs', 'true')
 if (params?.includeUser) searchParams.append('includeUser', 'true')

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse<Author[]>(response)
}

export async function fetchAuthorById(id: string): Promise<Author> {
 const response = await fetch(`${API_BASE}/${id}`)
 return handleResponse<Author>(response)
}

export async function fetchPopularAuthors(params?: {
 limit?: number
}): Promise<Author[]> {
 const searchParams = new URLSearchParams({ popular: 'true' })
 if (params?.limit) searchParams.append('limit', params.limit.toString())

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse<Author[]>(response)
}

export async function fetchAuthorsByUser(userId: string): Promise<Author> {
 const response = await fetch(`${API_BASE}?userId=${userId}`)
 return handleResponse<Author>(response)
}

export async function searchAuthors(params: {
 query: string
 limit?: number
}): Promise<Author[]> {
 const searchParams = new URLSearchParams({ query: params.query })
 if (params.limit) searchParams.append('limit', params.limit.toString())

 const response = await fetch(`${API_BASE}?${searchParams}`)
 return handleResponse<Author[]>(response)
}

export async function fetchAuthorStats(): Promise<AuthorStats> {
 const response = await fetch(`${API_BASE}?stats=true`)
 return handleResponse<AuthorStats>(response)
}

export async function validateAuthorBlogAssociation(authorId: string, blogId: string): Promise<AuthorValidation> {
 const response = await fetch(`${API_BASE}?validate=${authorId}&blogId=${blogId}`)
 return handleResponse<AuthorValidation>(response)
}

// =============== MUTATIONS (POST/PUT/DELETE) ===============
export async function createAuthor(data: CreateAuthorData): Promise<Author> {
 const response = await fetch(API_BASE, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 })
 return handleResponse<Author>(response)
}

export async function updateAuthor(data: UpdateAuthorData): Promise<Author> {
 const response = await fetch(API_BASE, {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data),
 })
 return handleResponse<Author>(response)
}

export async function deleteAuthor(id: string): Promise<{ message: string }> {
 const response = await fetch(`${API_BASE}?id=${id}`, {
  method: 'DELETE',
 })
 return handleResponse<{ message: string }>(response)
}