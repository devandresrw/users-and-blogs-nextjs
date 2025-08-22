import { BlogsResponse } from '@/app/api/blogs/route';

export async function getBlogsSEOData(lang: 'en' | 'es'): Promise<{
  title: string;
  description: string;
  totalBlogs: number;
  totalCategories: number;
  categories: string[];
}> {
  try {
    const baseUrl = process.env.NEXTJS_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blogs?lang=${lang}&limit=100`, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });

    if (!response.ok) {
      console.warn(`SEO fetch failed with status: ${response.status}`);
      throw new Error('Failed to fetch blogs data');
    }

    const data: BlogsResponse = await response.json();

    const title = lang === 'es'
      ? `Blogs de Tecnología | ${data.totalBlogs} Artículos`
      : `Technology Blogs | ${data.totalBlogs} Articles`;

    const description = lang === 'es'
      ? `Descubre ${data.totalBlogs} artículos sobre tecnología, desarrollo web y programación en ${data.totalCategories} categorías diferentes.`
      : `Discover ${data.totalBlogs} articles about technology, web development and programming across ${data.totalCategories} different categories.`;

    const categories = data.categories?.map(cat => cat.name) || [];

    return {
      title,
      description,
      totalBlogs: data.totalBlogs,
      totalCategories: data.totalCategories,
      categories,
    };
  } catch (error) {
    console.error('Error fetching SEO data:', error);

    // Datos de fallback
    const fallbackTitle = lang === 'es' ? 'Blogs de Tecnología' : 'Technology Blogs';
    const fallbackDescription = lang === 'es'
      ? 'Descubre artículos interesantes sobre tecnología, desarrollo web y programación.'
      : 'Discover interesting articles about technology, web development and programming.';

    return {
      title: fallbackTitle,
      description: fallbackDescription,
      totalBlogs: 0,
      totalCategories: 0,
      categories: [],
    };
  }
}