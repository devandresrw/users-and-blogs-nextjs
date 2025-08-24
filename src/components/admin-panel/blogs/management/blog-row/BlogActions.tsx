'use client'

import { BlogManagementItem } from '@/lib/actions/blogs-management.actions'
import { Button } from '@/components/ui/button'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
 Eye,
 Edit,
 Languages,
 MoreHorizontal,
 Copy,
 Trash,
 ExternalLink
} from 'lucide-react'

type BlogActionsProps = {
 blog: BlogManagementItem
 onTranslate: () => void
 onEdit: () => void
 onView: () => void
}

export default function BlogActions({
 blog,
 onTranslate,
 onEdit,
 onView
}: BlogActionsProps) {
 const handleCopyId = () => {
  navigator.clipboard.writeText(blog.id)
  // Aquí podrías agregar un toast notification
 }

 const handleOpenInNewTab = () => {
  // Construir URL del blog basado en tu estructura de rutas
  const blogUrl = `/${blog.baseLanguage}/blog/${blog.slug}`
  window.open(blogUrl, '_blank')
 }

 return (
  <div className="flex items-center space-x-1">
   {/* Acciones rápidas */}
   <Button
    variant="ghost"
    size="sm"
    onClick={onView}
    className="h-8 w-8 p-0"
    title="Ver blog"
   >
    <Eye className="h-4 w-4" />
   </Button>

   <Button
    variant="ghost"
    size="sm"
    onClick={onTranslate}
    className="h-8 w-8 p-0"
    title="Traducir blog"
   >
    <Languages className="h-4 w-4" />
   </Button>

   {/* Menú de más opciones */}
   <DropdownMenu>
    <DropdownMenuTrigger asChild>
     <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0"
      title="Más opciones"
     >
      <MoreHorizontal className="h-4 w-4" />
     </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-48">
     <DropdownMenuItem onClick={onView} className="cursor-pointer">
      <Eye className="mr-2 h-4 w-4" />
      Ver detalles
     </DropdownMenuItem>

     <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
      <Edit className="mr-2 h-4 w-4" />
      Editar blog
     </DropdownMenuItem>

     <DropdownMenuItem onClick={onTranslate} className="cursor-pointer">
      <Languages className="mr-2 h-4 w-4" />
      Gestionar traducciones
     </DropdownMenuItem>

     <DropdownMenuSeparator />

     <DropdownMenuItem onClick={handleOpenInNewTab} className="cursor-pointer">
      <ExternalLink className="mr-2 h-4 w-4" />
      Abrir en nueva pestaña
     </DropdownMenuItem>

     <DropdownMenuItem onClick={handleCopyId} className="cursor-pointer">
      <Copy className="mr-2 h-4 w-4" />
      Copiar ID
     </DropdownMenuItem>

     <DropdownMenuSeparator />

     <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
      <Trash className="mr-2 h-4 w-4" />
      Eliminar
     </DropdownMenuItem>
    </DropdownMenuContent>
   </DropdownMenu>
  </div>
 )
}