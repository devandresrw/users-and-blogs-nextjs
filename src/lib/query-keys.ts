export const tagKeys = {
  all: ['tags'] as const,
  lists: () => [...tagKeys.all, 'list'] as const,
  list: (params?: { language?: string; includeBlogs?: boolean }) =>
    [...tagKeys.lists(), params] as const,
  popular: (params?: { language?: string; limit?: number }) =>
    [...tagKeys.all, 'popular', params] as const,
  search: (query: string, language?: string) =>
    [...tagKeys.all, 'search', { query, language }] as const,
  detail: (id: string) => [...tagKeys.all, 'detail', id] as const,
  forBlog: (blogId: string) => [...tagKeys.all, 'forBlog', blogId] as const,
  stats: () => [...tagKeys.all, 'stats'] as const,
  languages: () => [...tagKeys.all, 'languages'] as const,
  validation: (tagId: string, blogId: string) =>
    [...tagKeys.all, 'validation', { tagId, blogId }] as const,
}


export const categoryKeys = {
  all: ['categories'] as const,
  lists: () => [...categoryKeys.all, 'list'] as const,
  list: (params?: { language?: string; includeRelations?: boolean }) =>
    [...categoryKeys.lists(), params] as const,
  popular: (params?: { language?: string; limit?: number }) =>
    [...categoryKeys.all, 'popular', params] as const,
  search: (query: string, language?: string) =>
    [...categoryKeys.all, 'search', { query, language }] as const,
  detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
  stats: () => [...categoryKeys.all, 'stats'] as const,
  languages: () => [...categoryKeys.all, 'languages'] as const,
  validation: (categoryId: string, blogId: string) =>
    [...categoryKeys.all, 'validation', { categoryId, blogId }] as const,
}

export const authorKeys = {
  all: ['authors'] as const,
  lists: () => [...authorKeys.all, 'list'] as const,
  list: (params?: { includeBlogs?: boolean; includeUser?: boolean }) =>
    [...authorKeys.lists(), params] as const,
  popular: (params?: { limit?: number }) =>
    [...authorKeys.all, 'popular', params] as const,
  search: (query: string) =>
    [...authorKeys.all, 'search', { query }] as const,
  detail: (id: string) => [...authorKeys.all, 'detail', id] as const,
  forBlog: (blogId: string) => [...authorKeys.all, 'forBlog', blogId] as const,
  stats: () => [...authorKeys.all, 'stats'] as const,
  validation: (authorId: string, blogId: string) =>
    [...authorKeys.all, 'validation', { authorId, blogId }] as const,
  byUser: (userId: string) => [...authorKeys.all, 'byUser', userId] as const,
}