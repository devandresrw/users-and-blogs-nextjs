'use client';

import { useBlogs } from '@/hooks/blogs/useGetAllBlogs';
import { BlogsGrid } from '@/components/blogs/BlogsAllGrid';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertCircle, Search } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function WrapperAllBlogs() {
  const params = useParams();
  const lang = params.lang as 'en' | 'es';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);

  // Evitar problemas de hidratación
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    data: blogsData,
    isLoading,
    isError,
    error,
    refetch
  } = useBlogs({
    lang,
    page: currentPage,
    limit: 9,
    category: selectedCategory || undefined,
  }, {
    enabled: true, // Siempre habilitado para mantener consistencia SSR/CSR
  });

  // Filtrar blogs por término de búsqueda (cliente)
  const filteredCategories = useMemo(() => {
    if (!blogsData?.categories || !searchTerm) return blogsData?.categories || [];

    return blogsData.categories.map(category => ({
      ...category,
      blogs: category.blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    })).filter(category => category.blogs.length > 0);
  }, [blogsData?.categories, searchTerm]);

  // Obtener todas las categorías para el selector
  const allCategories = useMemo(() => {
    return blogsData?.categories.map(cat => ({
      value: cat.slug,
      label: cat.name
    })) || [];
  }, [blogsData?.categories]);

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === 'all' ? '' : value);
    setCurrentPage(1);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // Mostrar loading inicial hasta que se hidrate
  if (!isHydrated || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          <div className="text-center space-y-4">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">
            {lang === 'es' ? 'Error al cargar los blogs' : 'Error loading blogs'}
          </h2>
          <p className="text-muted-foreground text-center">
            {error?.message || (lang === 'es' ? 'Ha ocurrido un error inesperado' : 'An unexpected error occurred')}
          </p>
          <Button onClick={() => refetch()}>
            {lang === 'es' ? 'Intentar de nuevo' : 'Try again'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">
          {lang === 'es' ? 'Nuestros Blogs' : 'Our Blogs'}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {lang === 'es'
            ? 'Descubre artículos interesantes sobre tecnología, desarrollo web y mucho más.'
            : 'Discover interesting articles about technology, web development and much more.'
          }
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <form onSubmit={handleSearch} className="flex gap-2 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={lang === 'es' ? 'Buscar blogs...' : 'Search blogs...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </form>

        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder={lang === 'es' ? 'Todas las categorías' : 'All categories'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {lang === 'es' ? 'Todas las categorías' : 'All categories'}
            </SelectItem>
            {allCategories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Stats */}
      {blogsData && (
        <div className="flex justify-center">
          <div className="bg-muted rounded-lg px-6 py-3">
            <span className="text-sm text-muted-foreground">
              {lang === 'es'
                ? `${blogsData.totalBlogs} blogs en ${blogsData.totalCategories} categorías`
                : `${blogsData.totalBlogs} blogs in ${blogsData.totalCategories} categories`
              }
            </span>
          </div>
        </div>
      )}

      {/* Blogs Grid */}
      <BlogsGrid
        categories={filteredCategories}
        lang={lang}
        isLoading={false}
      />

      {/* No results */}
      {filteredCategories.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {lang === 'es'
              ? `No se encontraron blogs que coincidan con "${searchTerm}"`
              : `No blogs found matching "${searchTerm}"`
            }
          </p>
        </div>
      )}
    </div>
  );
}