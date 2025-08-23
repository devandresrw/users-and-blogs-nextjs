'use client'

import { Category } from '@/hooks/blogs/categories/useCategories'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Edit, Trash2, FileText, MessageSquare, Image } from 'lucide-react'

interface CategoryItemProps {
 category: Category
 viewMode: 'grid' | 'list'
 onEdit: () => void
 onDelete: () => void
}

export function CategoryItem({ category, viewMode, onEdit, onDelete }: CategoryItemProps) {
 if (viewMode === 'list') {
  return (
   <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
    <div className="flex-1">
     <div className="flex items-center space-x-3">
      <div>
       <h3 className="font-medium">{category.name}</h3>
       <p className="text-sm text-gray-500">/{category.slug}</p>
      </div>
      <Badge variant="outline">
       {category.baseLanguage?.toUpperCase() || 'N/A'}
      </Badge>
     </div>

     {category._count && (
      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
       <span className="flex items-center">
        <FileText className="w-3 h-3 mr-1" />
        {category._count.Blog || 0} blogs
       </span>
       <span className="flex items-center">
        <MessageSquare className="w-3 h-3 mr-1" />
        {category._count.polls || 0} encuestas
       </span>
       <span className="flex items-center">
        <Image className="w-3 h-3 mr-1" />
        {category._count.Image || 0} imágenes
       </span>
      </div>
     )}
    </div>

    <div className="flex items-center space-x-2">
     <Button variant="ghost" size="sm" onClick={onEdit}>
      <Edit className="w-4 h-4" />
     </Button>
     <Button variant="ghost" size="sm" onClick={onDelete}>
      <Trash2 className="w-4 h-4 text-red-500" />
     </Button>
    </div>
   </div>
  )
 }

 return (
  <Card className="hover:shadow-md transition-shadow">
   <CardHeader className="pb-3">
    <div className="flex items-center justify-between">
     <h3 className="font-medium truncate">{category.name}</h3>
     <Badge variant="outline">
      {category.baseLanguage?.toUpperCase() || 'N/A'}
     </Badge>
    </div>
    <p className="text-sm text-gray-500 truncate">/{category.slug}</p>
   </CardHeader>

   {category._count && (
    <CardContent className="py-3">
     <div className="grid grid-cols-3 gap-2 text-xs text-center">
      <div className="flex flex-col items-center">
       <FileText className="w-4 h-4 mb-1 text-blue-500" />
       <span className="font-medium">{category._count.Blog || 0}</span>
       <span className="text-gray-500">Blogs</span>
      </div>
      <div className="flex flex-col items-center">
       <MessageSquare className="w-4 h-4 mb-1 text-green-500" />
       <span className="font-medium">{category._count.polls || 0}</span>
       <span className="text-gray-500">Encuestas</span>
      </div>
      <div className="flex flex-col items-center">
       <Image className="w-4 h-4 mb-1 text-purple-500" />
       <span className="font-medium">{category._count.Image || 0}</span>
       <span className="text-gray-500">Imágenes</span>
      </div>
     </div>
    </CardContent>
   )}

   <CardFooter className="pt-3 gap-2">
    <Button variant="outline" size="sm" onClick={onEdit} className="flex-1">
     <Edit className="w-4 h-4 mr-1" />
     Editar
    </Button>
    <Button variant="outline" size="sm" onClick={onDelete}>
     <Trash2 className="w-4 h-4 text-red-500" />
    </Button>
   </CardFooter>
  </Card>
 )
}