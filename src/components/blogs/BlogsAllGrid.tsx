import { BlogCategory } from '@/hooks/blogs/useGetAllBlogs';
import { BlogCard } from './BlogCard';
import { memo } from 'react';

interface BlogsGridProps {
  categories: BlogCategory[];
  lang: 'en' | 'es';
  isLoading?: boolean;
}

export const BlogsGrid = memo(({ categories, lang, isLoading }: BlogsGridProps) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="space-y-3">
                  <div className="aspect-video w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          {lang === 'es'
            ? 'No hay blogs disponibles en este momento.'
            : 'No blogs available at the moment.'
          }
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {categories.map((category) => (
        <section key={category.id} className="space-y-6">
          <div className="border-l-4 border-primary pl-4">
            <h2 className="text-2xl font-bold text-foreground">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-muted-foreground mt-1">
                {category.description}
              </p>
            )}
          </div>

          {category.blogs && category.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.blogs.map((blog) => (
                <BlogCard
                  key={blog.id}
                  blog={blog}
                  lang={lang}
                />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              {lang === 'es'
                ? 'No hay blogs en esta categoría aún.'
                : 'No blogs in this category yet.'
              }
            </p>
          )}
        </section>
      ))}
    </div>
  );
});

BlogsGrid.displayName = 'BlogsGrid';