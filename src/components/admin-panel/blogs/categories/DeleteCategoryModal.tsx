'use client'

import { useEffect } from 'react'
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Loader2, AlertTriangle } from 'lucide-react'
import { useCategoryManager, type Category } from '@/hooks/blogs/categories/useCategories'

interface DeleteCategoryModalProps {
 category: Category
 isOpen: boolean
 onClose: () => void
}

export function DeleteCategoryModal({ category, isOpen, onClose }: DeleteCategoryModalProps) {
 const {
  deleteCategory,
  isDeleting,
  deleteError,
  deleteSuccess,
  resetMutations
 } = useCategoryManager(category.id)

 // Cerrar modal al completar exitosamente
 useEffect(() => {
  if (deleteSuccess) {
   handleClose()
  }
 }, [deleteSuccess])

 const handleDelete = async () => {
  try {
   await deleteCategory()
  } catch (error) {
   // El error se maneja en el hook
  }
 }

 const handleClose = () => {
  resetMutations()
  onClose()
 }

 const hasRelations = category._count && (
  category._count.Blog > 0 ||
  category._count.polls > 0 ||
  category._count.Image > 0
 )

 return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
   <DialogContent className="sm:max-w-md">
    <DialogHeader>
     <DialogTitle className="flex items-center">
      <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
      Eliminar Categoría
     </DialogTitle>
     <DialogDescription>
      Esta acción no se puede deshacer.
     </DialogDescription>
    </DialogHeader>

    <div className="space-y-4">
     <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium">{category.name}</h3>
      <p className="text-sm text-gray-600">/{category.slug}</p>
      {category.baseLanguage && (
       <p className="text-sm text-gray-600">
        Idioma: {category.baseLanguage.toUpperCase()}
       </p>
      )}
     </div>

     {hasRelations && (
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
       <div className="flex items-start">
        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
        <div>
         <h4 className="font-medium text-yellow-800">
          Esta categoría tiene contenido asociado:
         </h4>
         <ul className="text-sm text-yellow-700 mt-1 space-y-1">
          {category._count?.Blog! > 0 && (
           <li>• {category._count!.Blog!} blog(s)</li>
          )}
          {category._count?.polls! > 0 && (
           <li>• {category._count!.polls!} encuesta(s)</li>
          )}
          {category._count?.Image! > 0 && (
           <li>• {category._count!.Image!} imagen(es)</li>
          )}
         </ul>
         <p className="text-sm text-yellow-700 mt-2">
          Eliminar esta categoría puede afectar el contenido asociado.
         </p>
        </div>
       </div>
      </div>
     )}

     {deleteError && (
      <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
       {deleteError.message}
      </div>
     )}

     <div className="flex justify-end space-x-2 pt-4">
      <Button
       variant="outline"
       onClick={handleClose}
       disabled={isDeleting}
      >
       Cancelar
      </Button>
      <Button
       variant="destructive"
       onClick={handleDelete}
       disabled={isDeleting}
      >
       {isDeleting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
       Eliminar
      </Button>
     </div>
    </div>
   </DialogContent>
  </Dialog>
 )
}