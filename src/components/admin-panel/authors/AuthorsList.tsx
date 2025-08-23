'use client'

import { useState } from 'react'
import { MoreHorizontal, Edit, Trash2, ExternalLink, User, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuTrigger,
 DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import {
 AlertDialog,
 AlertDialogAction,
 AlertDialogCancel,
 AlertDialogContent,
 AlertDialogDescription,
 AlertDialogFooter,
 AlertDialogHeader,
 AlertDialogTitle
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { Author, useDeleteAuthor } from '@/hooks/blogs/authors/useAuthors'
import EditAuthorDialog from './EditAuthorDialog'

interface AuthorsListProps {
 authors: Author[]
 isLoading: boolean
}

export default function AuthorsList({ authors, isLoading }: AuthorsListProps) {
 const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
 const [deletingAuthor, setDeletingAuthor] = useState<Author | null>(null)

 const deleteAuthorMutation = useDeleteAuthor()

 const handleDelete = async () => {
  if (!deletingAuthor) return

  try {
   await deleteAuthorMutation.mutateAsync(deletingAuthor.id)
   setDeletingAuthor(null)
  } catch (error) {
   // Error already handled by the hook
  }
 }

 if (isLoading) {
  return (
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
     <Card key={i}>
      <CardHeader className="pb-3">
       <div className="flex items-center gap-3">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2">
         <Skeleton className="h-4 w-24" />
         <Skeleton className="h-3 w-16" />
        </div>
       </div>
      </CardHeader>
      <CardContent>
       <Skeleton className="h-3 w-full mb-2" />
       <Skeleton className="h-3 w-2/3" />
      </CardContent>
     </Card>
    ))}
   </div>
  )
 }

 if (authors.length === 0) {
  return (
   <Card>
    <CardContent className="flex flex-col items-center justify-center py-12">
     <User className="h-12 w-12 text-muted-foreground mb-4" />
     <h3 className="text-lg font-semibold mb-2">No hay autores</h3>
     <p className="text-muted-foreground text-center">
      Aún no has creado ningún autor. Crea tu primer autor para comenzar.
     </p>
    </CardContent>
   </Card>
  )
 }

 return (
  <>
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
    {authors.map((author) => (
     <Card key={author.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
       <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
         <Avatar className="h-12 w-12">
          <AvatarImage
           src={author.profileImage?.url || author.profilePicture || ''}
           alt={author.name}
          />
          <AvatarFallback>
           {author.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
         </Avatar>
         <div>
          <CardTitle className="text-base">{author.name}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
           {author.user && (
            <Badge variant="secondary" className="text-xs">
             <User className="h-3 w-3 mr-1" />
             Usuario
            </Badge>
           )}
           <Badge variant="outline" className="text-xs">
            <BookOpen className="h-3 w-3 mr-1" />
            {author._count?.blogAuthors || 0} blogs
           </Badge>
          </div>
         </div>
        </div>

        <DropdownMenu>
         <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
           <MoreHorizontal className="h-4 w-4" />
          </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setEditingAuthor(author)}>
           <Edit className="mr-2 h-4 w-4" />
           Editar
          </DropdownMenuItem>
          {author.link && (
           <DropdownMenuItem asChild>
            <a href={author.link} target="_blank" rel="noopener noreferrer">
             <ExternalLink className="mr-2 h-4 w-4" />
             Ver sitio web
            </a>
           </DropdownMenuItem>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem
           onClick={() => setDeletingAuthor(author)}
           className="text-destructive"
          >
           <Trash2 className="mr-2 h-4 w-4" />
           Eliminar
          </DropdownMenuItem>
         </DropdownMenuContent>
        </DropdownMenu>
       </div>
      </CardHeader>

      <CardContent>
       {author.description && (
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
         {author.description}
        </p>
       )}

       <div className="flex flex-wrap gap-1">
        {author.twitter && (
         <Badge variant="outline" className="text-xs">
          Twitter
         </Badge>
        )}
        {author.instagram && (
         <Badge variant="outline" className="text-xs">
          Instagram
         </Badge>
        )}
        {author.linkedin && (
         <Badge variant="outline" className="text-xs">
          LinkedIn
         </Badge>
        )}
        {author.facebook && (
         <Badge variant="outline" className="text-xs">
          Facebook
         </Badge>
        )}
       </div>
      </CardContent>
     </Card>
    ))}
   </div>

   {/* Edit Dialog */}
   {editingAuthor && (
    <EditAuthorDialog
     author={editingAuthor}
     open={!!editingAuthor}
     onOpenChange={(open) => !open && setEditingAuthor(null)}
     onSuccess={() => setEditingAuthor(null)}
    />
   )}

   {/* Delete Confirmation */}
   <AlertDialog open={!!deletingAuthor} onOpenChange={() => setDeletingAuthor(null)}>
    <AlertDialogContent>
     <AlertDialogHeader>
      <AlertDialogTitle>¿Eliminar autor?</AlertDialogTitle>
      <AlertDialogDescription>
       Esta acción eliminará permanentemente el autor "{deletingAuthor?.name}"
       {deletingAuthor?._count?.blogAuthors && deletingAuthor._count.blogAuthors > 0 && (
        <span> y lo desvinculará de {deletingAuthor._count.blogAuthors} blog(s)</span>
       )}
       . Esta acción no se puede deshacer.
      </AlertDialogDescription>
     </AlertDialogHeader>
     <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction
       onClick={handleDelete}
       className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
       disabled={deleteAuthorMutation.isPending}
      >
       {deleteAuthorMutation.isPending ? 'Eliminando...' : 'Eliminar'}
      </AlertDialogAction>
     </AlertDialogFooter>
    </AlertDialogContent>
   </AlertDialog>
  </>
 )
}