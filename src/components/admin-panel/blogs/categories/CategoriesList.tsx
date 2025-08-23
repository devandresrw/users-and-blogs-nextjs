'use client'

import { useState } from 'react'
import { Category } from '@/hooks/blogs/categories/useCategories'
import { CategoryItem } from '@/components/admin-panel/blogs/categories/CategoryItem'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2, Grid, List } from 'lucide-react'

interface CategoriesListProps {
 categories: Category[]
 isLoading: boolean
 onEdit: (category: Category) => void
 onDelete: (category: Category) => void
}

export function CategoriesList({ categories, isLoading, onEdit, onDelete }: CategoriesListProps) {
 const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
 const [currentPage, setCurrentPage] = useState(1)
 const itemsPerPage = 12

 if (isLoading) {
  return (
   <div className="flex items-center justify-center py-8">
    <Loader2 className="w-6 h-6 animate-spin mr-2" />
    <span>Cargando categorías...</span>
   </div>
  )
 }

 if (!categories || categories.length === 0) {
  return (
   <div className="text-center py-8 text-gray-500">
    No se encontraron categorías
   </div>
  )
 }

 // Paginación
 const totalPages = Math.ceil(categories.length / itemsPerPage)
 const startIndex = (currentPage - 1) * itemsPerPage
 const endIndex = startIndex + itemsPerPage
 const currentCategories = categories.slice(startIndex, endIndex)

 return (
  <div className="space-y-4">
   {/* Header con controles */}
   <div className="flex items-center justify-between">
    <div className="text-sm text-gray-600">
     Mostrando {currentCategories.length} de {categories.length} categorías
    </div>

    <div className="flex items-center space-x-2">
     <Button
      variant={viewMode === 'grid' ? 'default' : 'outline'}
      size="sm"
      onClick={() => setViewMode('grid')}
     >
      <Grid className="w-4 h-4" />
     </Button>
     <Button
      variant={viewMode === 'list' ? 'default' : 'outline'}
      size="sm"
      onClick={() => setViewMode('list')}
     >
      <List className="w-4 h-4" />
     </Button>
    </div>
   </div>

   {/* Lista/Grid de categorías */}
   <div className={
    viewMode === 'grid'
     ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
     : 'space-y-2'
   }>
    {currentCategories.map((category) => (
     <CategoryItem
      key={category.id}
      category={category}
      viewMode={viewMode}
      onEdit={() => onEdit(category)}
      onDelete={() => onDelete(category)}
     />
    ))}
   </div>

   {/* Paginación */}
   {totalPages > 1 && (
    <div className="flex items-center justify-center space-x-2 pt-4">
     <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
     >
      Anterior
     </Button>

     <span className="text-sm text-gray-600">
      Página {currentPage} de {totalPages}
     </span>

     <Button
      variant="outline"
      size="sm"
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
     >
      Siguiente
     </Button>
    </div>
   )}
  </div>
 )
}