import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { BlogsResponse, BlogCategory, Blog, Tag } from '@/app/api/blogs/route';

interface UseBlogsParams {
  lang: 'en' | 'es';
  page?: number;
  limit?: number;
  category?: string;
}

interface UseBlogsOptions extends Omit<UseQueryOptions<BlogsResponse>, 'queryKey' | 'queryFn'> {
  enabled?: boolean;
}

export const useBlogs = (
  params: UseBlogsParams,
  options: UseBlogsOptions = {}
) => {
  const { lang, page = 1, limit = 10, category } = params;

  return useQuery({
    queryKey: ['blogs', { lang, page, limit, category }],
    queryFn: async (): Promise<BlogsResponse> => {
      const searchParams = new URLSearchParams({
        lang,
        page: page.toString(),
        limit: limit.toString(),
        ...(category && { category }),
      });

      const response = await fetch(`/api/blogs?${searchParams}`, {
        cache: 'no-store',
      });

      if (!response.ok) {
        // Si hay error en el servidor, intentar extraer los datos de fallback
        const errorData = await response.json();
        if (errorData.data) {
          return errorData.data;
        }
        throw new Error('Error al cargar los blogs');
      }

      return response.json();
    },
    staleTime: 0, // Siempre considerar datos stale para consistencia
    gcTime: 5 * 60 * 1000, // 5 minutos
    retry: 1,
    refetchOnMount: false, // Evitar refetch automático
    refetchOnWindowFocus: false, // Evitar refetch en focus
    ...options,
  });
};

// Hook para una categoría específica
export const useBlogsByCategory = (
  categorySlug: string,
  lang: 'en' | 'es',
  options: UseBlogsOptions = {}
) => {
  return useBlogs(
    { lang, category: categorySlug },
    {
      ...options,
      enabled: !!categorySlug && options.enabled !== false,
    }
  );
};

// Exportar los tipos para uso en otros componentes
export type { BlogsResponse, BlogCategory, Blog, Tag };