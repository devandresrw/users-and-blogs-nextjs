'use client'

import { useState } from 'react'
import { useCategories } from '@/hooks/blogs/categories/useCategories'
import { CategoryFilters } from './CategoryFilters'
import { CategoriesList } from './CategoriesList'
import { CategoryForm } from './CategoryForm'
import { DeleteCategoryModal } from './DeleteCategoryModal'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Category } from '@/hooks/blogs/categories/useCategories'

interface WrapperCategoriesProps {
 language?: string
}

export function WrapperCategories({ language }: WrapperCategoriesProps) {
 const [filters, setFilters] = useState({
  search: '',
  language: language || '',
  includeRelations: false
 })
 const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
 const [isFormOpen, setIsFormOpen] = useState(false)
 const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

 // Obtener categorías con filtros
 const { data: categories, isLoading, error } = useCategories({
  language: filters.language || undefined,
  includeRelations: filters.includeRelations
 })

 // Filtrar categorías por búsqueda local
 const filteredCategories = categories?.filter((category) =>
  category.name.toLowerCase().includes(filters.search.toLowerCase()) ||
  category.slug.toLowerCase().includes(filters.search.toLowerCase())
 ) || []

 const handleCreateCategory = () => {
  setSelectedCategory(null)
  setIsFormOpen(true)
 }

 const handleEditCategory = (category: Category) => {
  setSelectedCategory(category)
  setIsFormOpen(true)
 }

 const handleDeleteCategory = (category: Category) => {
  setSelectedCategory(category)
  setIsDeleteModalOpen(true)
 }

 const handleCloseForm = () => {
  setIsFormOpen(false)
  setSelectedCategory(null)
 }

 const handleCloseDeleteModal = () => {
  setIsDeleteModalOpen(false)
  setSelectedCategory(null)
 }

 if (error) {
  return (
   <Card>
    <CardContent className="p-6">
     <div className="text-center text-red-600">
      Error al cargar las categorías: {error.message}
     </div>
    </CardContent>
   </Card>
  )
 }

 return (
  <div className="space-y-6">
   <Card>
    <CardHeader>
     <div className="flex items-center justify-between">
      <CardTitle>Gestión de Categorías</CardTitle>
      <Button onClick={handleCreateCategory}>
       <Plus className="w-4 h-4 mr-2" />
       Nueva Categoría
      </Button>
     </div>
    </CardHeader>
    <CardContent className="space-y-6">
     <CategoryFilters
      filters={filters}
      onFiltersChange={setFilters}
     />

     <CategoriesList
      categories={filteredCategories}
      isLoading={isLoading}
      onEdit={handleEditCategory}
      onDelete={handleDeleteCategory}
     />
    </CardContent>
   </Card>

   {isFormOpen && (
    <CategoryForm
     category={selectedCategory}
     isOpen={isFormOpen}
     onClose={handleCloseForm}
    />
   )}

   {isDeleteModalOpen && selectedCategory && (
    <DeleteCategoryModal
     category={selectedCategory}
     isOpen={isDeleteModalOpen}
     onClose={handleCloseDeleteModal}
    />
   )}
  </div>
 )
}