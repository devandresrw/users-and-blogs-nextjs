// Actualizar el archivo BlogsManagementTable.tsx
'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
 Table,
 TableBody,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from '@/components/ui/table'
import { Card } from '@/components/ui/card'
import { Languages, Eye, Edit } from 'lucide-react'
import { BlogManagementItem } from '@/lib/actions/blogs-management.actions'

type BlogsManagementTableProps = {
 blogs: BlogManagementItem[]
 isLoading?: boolean
 selectedBlogs: string[]
 onSelectBlog: (blogId: string) => void
 onSelectAll: (selected: boolean) => void
 onTranslateBlog: (blogId: string) => void
 onEditBlog: (blogId: string) => void
 onViewBlog: (blogId: string) => void
}

// Mapeo de códigos de idioma a información visual
const LANGUAGE_INFO = {
 'es': { name: 'Español', flag: '🇪🇸', color: 'bg-red-100 text-red-800' },
 'en': { name: 'Inglés', flag: '🇺🇸', color: 'bg-blue-100 text-blue-800' },
 'fr': { name: 'Francés', flag: '🇫🇷', color: 'bg-blue-100 text-blue-800' },
 'de': { name: 'Alemán', flag: '🇩🇪', color: 'bg-yellow-100 text-yellow-800' },
 'it': { name: 'Italiano', flag: '🇮🇹', color: 'bg-green-100 text-green-800' },
 'pt': { name: 'Portugués', flag: '🇵🇹', color: 'bg-green-100 text-green-800' },
 'ja': { name: 'Japonés', flag: '🇯🇵', color: 'bg-pink-100 text-pink-800' },
 'ko': { name: 'Coreano', flag: '🇰🇷', color: 'bg-purple-100 text-purple-800' },
 'zh': { name: 'Chino', flag: '🇨🇳', color: 'bg-red-100 text-red-800' },
 'ar': { name: 'Árabe', flag: '🇸🇦', color: 'bg-orange-100 text-orange-800' },
} as const

export default function BlogsManagementTable({
 blogs,
 isLoading = false,
 selectedBlogs,
 onSelectBlog,
 onSelectAll,
 onTranslateBlog,
 onEditBlog,
 onViewBlog
}: BlogsManagementTableProps) {
 const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set())

 const toggleRowExpansion = (blogId: string) => {
  const newExpanded = new Set(expandedRows)
  if (newExpanded.has(blogId)) {
   newExpanded.delete(blogId)
  } else {
   newExpanded.add(blogId)
  }
  setExpandedRows(newExpanded)
 }

 const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
   year: 'numeric',
   month: 'short',
   day: 'numeric'
  })
 }

 const getLanguageInfo = (langCode: string) => {
  return LANGUAGE_INFO[langCode as keyof typeof LANGUAGE_INFO] || {
   name: langCode.toUpperCase(),
   flag: '🌍',
   color: 'bg-gray-100 text-gray-800'
  }
 }

 if (blogs.length === 0) {
  return (
   <Card className="p-8 text-center">
    <div className="text-muted-foreground">
     No se encontraron blogs con los filtros aplicados
    </div>
   </Card>
  )
 }

 return (
  <Card className="overflow-hidden">
   <Table>
    <TableHeader>
     <TableRow>
      <TableHead className="w-12">
       <Checkbox
        checked={selectedBlogs.length === blogs.length}
        onCheckedChange={onSelectAll}
        aria-label="Seleccionar todos"
       />
      </TableHead>
      <TableHead>Blog</TableHead>
      <TableHead>Idiomas</TableHead>
      <TableHead>Estado</TableHead>
      <TableHead>Fecha</TableHead>
      <TableHead>Vistas</TableHead>
      <TableHead className="text-right">Acciones</TableHead>
     </TableRow>
    </TableHeader>
    <TableBody>
     {blogs.map((blog) => {
      const isSelected = selectedBlogs.includes(blog.id)
      const isExpanded = expandedRows.has(blog.id)
      const langInfo = getLanguageInfo(blog.baseLanguage)

      return (
       <TableRow
        key={blog.id}
        className={isSelected ? 'bg-muted/50' : ''}
       >
        <TableCell>
         <Checkbox
          checked={isSelected}
          onCheckedChange={() => onSelectBlog(blog.id)}
          aria-label={`Seleccionar ${blog.title}`}
         />
        </TableCell>

        <TableCell>
         <div className="space-y-1">
          <div className="font-medium line-clamp-2">
           {blog.title}
          </div>
          {blog.titlePunch && (
           <div className="text-sm text-muted-foreground line-clamp-1">
            {blog.titlePunch}
           </div>
          )}
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
           <span>Base: {langInfo.flag} {langInfo.name}</span>
           {blog.category && (
            <>
             <span>•</span>
             <span>{blog.category.name}</span>
            </>
           )}
          </div>
         </div>
        </TableCell>

        <TableCell>
         <div className="space-y-2">
          {/* Idioma base */}
          <Badge
           className={`${langInfo.color} text-xs`}
           variant="secondary"
          >
           {langInfo.flag} {langInfo.name} (Base)
          </Badge>

          {/* Idiomas traducidos */}
          <div className="flex flex-wrap gap-1">
           {blog.translations.availableLanguages
            .filter(lang => lang !== blog.baseLanguage)
            .slice(0, isExpanded ? undefined : 3)
            .map((lang) => {
             const info = getLanguageInfo(lang)
             return (
              <Badge
               key={lang}
               className={`${info.color} text-xs`}
               variant="outline"
              >
               {info.flag} {info.name}
              </Badge>
             )
            })}

           {/* Mostrar más idiomas */}
           {blog.translations.availableLanguages.length > 4 && !isExpanded && (
            <Button
             variant="ghost"
             size="sm"
             className="h-5 px-2 text-xs"
             onClick={() => toggleRowExpansion(blog.id)}
            >
             +{blog.translations.availableLanguages.length - 4} más
            </Button>
           )}
          </div>

          {/* Total de idiomas */}
          <div className="text-xs text-muted-foreground">
           Total: {blog.translations.totalLanguages} idiomas
          </div>
         </div>
        </TableCell>

        <TableCell>
         <div className="space-y-1">
          <Badge
           variant={
            blog.translations.translationStatus === 'translated'
             ? 'default'
             : blog.translations.translationStatus === 'untranslated'
              ? 'destructive'
              : 'secondary'
           }
          >
           {blog.translations.translationStatus === 'translated' && 'Traducido'}
           {blog.translations.translationStatus === 'untranslated' && 'Sin traducir'}
           {blog.translations.translationStatus === 'unknown' && 'Desconocido'}
          </Badge>

          {blog.translations.targetLanguage && (
           <div className="text-xs text-muted-foreground">
            Target: {getLanguageInfo(blog.translations.targetLanguage).name}
           </div>
          )}
         </div>
        </TableCell>

        <TableCell>
         <div className="text-sm">
          {formatDate(blog.dateCreated)}
         </div>
         {blog.readTime && (
          <div className="text-xs text-muted-foreground">
           {blog.readTime} min lectura
          </div>
         )}
        </TableCell>

        <TableCell>
         <div className="text-sm font-medium">
          {blog.views.toLocaleString()}
         </div>
        </TableCell>

        <TableCell className="text-right">
         <div className="flex justify-end space-x-1">
          <Button
           variant="ghost"
           size="sm"
           onClick={() => onViewBlog(blog.id)}
          >
           <Eye className="h-4 w-4" />
          </Button>
          <Button
           variant="ghost"
           size="sm"
           onClick={() => onEditBlog(blog.id)}
          >
           <Edit className="h-4 w-4" />
          </Button>
          <Button
           variant="ghost"
           size="sm"
           onClick={() => onTranslateBlog(blog.id)}
          >
           <Languages className="h-4 w-4" />
          </Button>
         </div>
        </TableCell>
       </TableRow>
      )
     })}
    </TableBody>
   </Table>

   {isLoading && (
    <div className="p-4 text-center text-sm text-muted-foreground">
     Cargando...
    </div>
   )}
  </Card>
 )
}