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