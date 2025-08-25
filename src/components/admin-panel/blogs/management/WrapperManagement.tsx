'use client'

import { useState } from 'react'
import { useBlogsForManagement } from '@/hooks/blogs/management/useBlogsManagement'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Download, Upload } from 'lucide-react'
import BlogsManagementFilters from './BlogsManagementFilters'
import BlogsManagementTable from './BlogsManagementTable'
import BlogsManagementStats from './BlogsManagementStats'
import TranslationQueueManager from './translate/TranslationQueueManager'


// Renombrar el tipo para evitar conflictos
type ManagementFilters = {
  lang: string
  page: number
  limit: number
  status: 'translated' | 'untranslated' | 'all'
  targetLanguage?: string
}

export default function WrapperManagement() {
  // Estado para los filtros - usar el tipo renombrado
  const [filters, setFilters] = useState<ManagementFilters>({
    lang: 'es',
    page: 1,
    limit: 10,
    status: 'all',
    targetLanguage: undefined
  })

  // Estado para selección de blogs
  const [selectedBlogs, setSelectedBlogs] = useState<string[]>([])

  // Query principal usando el hook que creamos
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching
  } = useBlogsForManagement(filters)

  // Función para actualizar filtros - usar el tipo renombrado
  const updateFilters = (newFilters: Partial<ManagementFilters>) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      // Reset page cuando cambien otros filtros
      page: newFilters.page ?? 1
    }))
    // Limpiar selección cuando cambien los filtros
    setSelectedBlogs([])
  }

  // Funciones para manejar selección
  const handleSelectBlog = (blogId: string) => {
    setSelectedBlogs(prev =>
      prev.includes(blogId)
        ? prev.filter(id => id !== blogId)
        : [...prev, blogId]
    )
  }

  const handleSelectAll = (selected: boolean) => {
    if (selected && data?.blogs) {
      setSelectedBlogs(data.blogs.map(blog => blog.id))
    } else {
      setSelectedBlogs([])
    }
  }

  // Funciones para acciones de blogs
  const handleTranslateBlog = (blogId: string) => {
    console.log('Traducir blog:', blogId)
    // Aquí implementarías la lógica de traducción
  }

  const handleEditBlog = (blogId: string) => {
    console.log('Editar blog:', blogId)
    // Aquí implementarías la navegación al editor
  }

  const handleViewBlog = (blogId: string) => {
    console.log('Ver blog:', blogId)
    // Aquí implementarías la vista de detalles
  }

  const handleBatchTranslate = async () => {
    if (!filters.targetLanguage) {
      alert('Selecciona un idioma objetivo en los filtros')
      return
    }

    console.log('🚀 Iniciando traducción en lote:', {
      selectedBlogs,
      targetLanguage: filters.targetLanguage,
      count: selectedBlogs.length
    })

    try {
      // Usar el hook de traducción
      const response = await fetch('/api/blogs/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogIds: selectedBlogs,
          targetLanguage: filters.targetLanguage,
          priority: 1 // Alta prioridad para traducciones manuales
        })
      })

      if (!response.ok) {
        throw new Error('Error al agregar trabajos de traducción')
      }

      const result = await response.json()
      console.log('✅ Trabajos agregados:', result)

      // Limpiar selección
      setSelectedBlogs([])

      // Mostrar mensaje de éxito
      alert(`${result.details.added} trabajos agregados a la cola de traducción`)

    } catch (error) {
      console.error('❌ Error en traducción:', error)
      alert('Error al agregar trabajos de traducción')
    }
  }

  const handleTranslateAll = async () => {
    // Llama a tu endpoint para traducir todos los blogs
    try {
      const res = await fetch('/api/blogs/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          translateAll: true, // Nuevo flag
          targetLanguage: filters.targetLanguage // o el idioma que elijas
        })
      });
      const data = await res.json();
      if (data.success) {
        alert('Traducción masiva enviada correctamente');
      } else {
        alert('Error: ' + data.error);
      }
    } catch (e) {
      alert('Error enviando traducción masiva');
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Cargando blogs...</span>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Error al cargar los blogs: {error.message}
          <button
            onClick={() => refetch()}
            className="ml-2 underline hover:no-underline"
          >
            Reintentar
          </button>
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Blogs</h1>
          <p className="text-muted-foreground">
            Administra y traduce el contenido de tu blog
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {/* Indicador de carga */}
          {isFetching && (
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Actualizando...</span>
            </div>
          )}

          {/* Acciones de importar/exportar */}
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar
          </Button>
        </div>
      </div>

      {/* Estadísticas mejoradas */}
      {data?.stats && (
        <BlogsManagementStats
          stats={data.stats}
          targetLanguage={filters.targetLanguage}
        />
      )}

      {/* NUEVO: Componente de Traducción */}
      <TranslationQueueManager
        selectedBlogs={selectedBlogs}
        onClearSelection={() => setSelectedBlogs([])}
      />

      {/* Filtros */}
      <BlogsManagementFilters
        filters={filters}
        onFiltersChange={updateFilters}
        availableLanguages={data?.stats?.languages || []}
        isLoading={isFetching}
      />

      {/* Acciones en lote */}
      {selectedBlogs.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">
                {selectedBlogs.length} blog{selectedBlogs.length > 1 ? 's' : ''} seleccionado{selectedBlogs.length > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handleBatchTranslate}
                disabled={!filters.targetLanguage}
              >
                Traducir seleccionados
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedBlogs([])}
              >
                Limpiar selección
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Tabla Principal */}
      {data?.blogs && (
        <BlogsManagementTable
          blogs={data.blogs}
          isLoading={isFetching}
          selectedBlogs={selectedBlogs}
          onSelectBlog={handleSelectBlog}
          onSelectAll={handleSelectAll}
          onTranslateBlog={handleTranslateBlog}
          onEditBlog={handleEditBlog}
          onViewBlog={handleViewBlog}
        />
      )}

      {/* Paginación mejorada */}
      {data?.pagination && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {data.blogs.length} de {data.pagination.totalItems} blogs
              (Página {data.pagination.currentPage} de {data.pagination.totalPages})
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilters({ page: 1 })}
                disabled={!data.pagination.hasPreviousPage}
              >
                Primera
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilters({ page: filters.page - 1 })}
                disabled={!data.pagination.hasPreviousPage}
              >
                Anterior
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilters({ page: filters.page + 1 })}
                disabled={!data.pagination.hasNextPage}
              >
                Siguiente
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateFilters({ page: data.pagination.totalPages })}
                disabled={!data.pagination.hasNextPage}
              >
                Última
              </Button>
            </div>
          </div>
        </Card>
      )}
      <Button
        onClick={handleTranslateAll}
        variant="default"
      >
        Traducir TODOS los blogs
      </Button>
    </div>
  )
}