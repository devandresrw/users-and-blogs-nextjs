import { NextRequest, NextResponse } from 'next/server';
import { getBlogsByCategories } from '@/lib/actions/blogs.actions';

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  blogs: Blog[];
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image?: string | null;
  createdAt: string;
  author: {
    name: string;
    image?: string | null;
  };
  tags: Tag[];
  readTime: number;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface BlogsResponse {
  categories: BlogCategory[];
  totalBlogs: number;
  totalCategories: number;
  currentPage?: number;
  totalPages?: number;
}

// Datos de fallback para consistencia SSR/CSR
const getFallbackResponse = (): BlogsResponse => ({
  categories: [],
  totalBlogs: 0,
  totalCategories: 0,
  currentPage: 1,
  totalPages: 0
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lang = searchParams.get('lang') || 'es';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');

    // Llamar a la función que obtiene datos reales de la base de datos
    const data = await getBlogsByCategories({
      lang,
      page,
      limit,
      categorySlug: category || undefined
    });

    // Transformar los datos para que coincidan con los tipos esperados
    const response: BlogsResponse = {
      categories: data.categories.map(category => ({
        ...category,
        description: category.description || undefined,
        blogs: category.blogs.map(blog => ({
          ...blog,
          image: blog.image || undefined,
          author: {
            ...blog.author,
            image: blog.author.image || undefined
          }
        }))
      })),
      totalBlogs: data.totalBlogs,
      totalCategories: data.totalCategories,
      currentPage: data.currentPage,
      totalPages: data.totalPages
    };

    return NextResponse.json(response, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);

    // En caso de error, devolver estructura vacía pero válida
    const fallbackResponse = getFallbackResponse();

    return NextResponse.json(fallbackResponse, {
      status: 200, // Cambiar a 200 para evitar errores en el cliente
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    });
  }
}