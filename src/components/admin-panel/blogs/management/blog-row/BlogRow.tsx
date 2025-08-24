'use client'

import { BlogManagementItem } from '@/lib/actions/blogs-management.actions'
import { TableCell, TableRow } from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import TranslationStatus from './TranslationStatus'
import BlogActions from './BlogActions'

type BlogRowProps = {
 blog: BlogManagementItem
 isSelected: boolean
 onSelect: () => void
 onTranslate: () => void
 onEdit: () => void
 onView: () => void
}

export default function BlogRow({
 blog,
 isSelected,
 onSelect,
 onTranslate,
 onEdit,
 onView
}: BlogRowProps) {
 const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('es-ES', {
   year: 'numeric',
   month: 'short',
   day: 'numeric'
  })
 }

 const getReadTimeDisplay = (readTime: number | null) => {
  if (!readTime) return 'N/A'
  return `${readTime} min`
 }

 const truncateTitle = (title: string, maxLength: number = 50) => {
  if (title.length <= maxLength) return title
  return title.substring(0, maxLength) + '...'
 }

 return (
  <TableRow className={isSelected ? 'bg-muted/50' : ''}>
   <TableCell>
    <Checkbox
     checked={isSelected}
     onCheckedChange={onSelect}
     aria-label={`Seleccionar ${blog.title}`}
    />
   </TableCell>

   <TableCell className="max-w-xs">
    <div className="space-y-1">
     <div className="font-medium text-sm" title={blog.title}>
      {truncateTitle(blog.title)}
     </div>
     <div className="flex items-center space-x-2">
      <Badge variant="outline" className="text-xs">
       {blog.baseLanguage.toUpperCase()}
      </Badge>
      {blog.titlePunch && (
       <span className="text-xs text-muted-foreground">
        • {truncateTitle(blog.titlePunch, 30)}
       </span>
      )}
     </div>
    </div>
   </TableCell>

   <TableCell>
    {blog.author ? (
     <div className="flex items-center space-x-2">
      <Avatar className="h-6 w-6">
       <AvatarImage src={blog.author.profilePicture || ''} />
       <AvatarFallback className="text-xs">
        {blog.author.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
       </AvatarFallback>
      </Avatar>
      <span className="text-sm">{blog.author.name}</span>
     </div>
    ) : (
     <span className="text-sm text-muted-foreground">Sin autor</span>
    )}
   </TableCell>

   <TableCell>
    {blog.category ? (
     <Badge variant="secondary" className="text-xs">
      {blog.category.name}
     </Badge>
    ) : (
     <span className="text-sm text-muted-foreground">Sin categoría</span>
    )}
   </TableCell>

   <TableCell>
    <TranslationStatus
     status={blog.translations.translationStatus}
     hasTargetTranslation={blog.translations.hasTargetTranslation}
     targetLanguage={blog.translations.targetLanguage}
    />
   </TableCell>

   <TableCell>
    <div className="flex flex-wrap gap-1">
     {blog.translations.availableLanguages.slice(0, 3).map((lang) => (
      <Badge
       key={lang}
       variant={lang === blog.baseLanguage ? "default" : "outline"}
       className="text-xs"
      >
       {lang.toUpperCase()}
      </Badge>
     ))}
     {blog.translations.availableLanguages.length > 3 && (
      <Badge variant="outline" className="text-xs">
       +{blog.translations.availableLanguages.length - 3}
      </Badge>
     )}
    </div>
   </TableCell>

   <TableCell className="text-sm text-muted-foreground">
    <div className="space-y-1">
     <div>{formatDate(blog.dateCreated)}</div>
     {blog.readTime && (
      <div className="text-xs">{getReadTimeDisplay(blog.readTime)}</div>
     )}
    </div>
   </TableCell>

   <TableCell className="text-sm text-muted-foreground">
    {blog.views.toLocaleString()}
   </TableCell>

   <TableCell className="text-right">
    <BlogActions
     blog={blog}
     onTranslate={onTranslate}
     onEdit={onEdit}
     onView={onView}
    />
   </TableCell>
  </TableRow>
 )
}