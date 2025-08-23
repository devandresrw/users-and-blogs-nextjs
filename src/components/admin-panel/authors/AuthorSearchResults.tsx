'use client'

import { Search, User, BookOpen } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Author } from '@/hooks/blogs/authors/useAuthors'

interface AuthorSearchResultsProps {
 results: Author[]
 isLoading: boolean
 query: string
}

export default function AuthorSearchResults({ results, isLoading, query }: AuthorSearchResultsProps) {
 if (isLoading) {
  return (
   <div className="space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
     <div key={i} className="flex items-center gap-3 p-3 border rounded-lg">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
       <Skeleton className="h-4 w-32" />
       <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-6 w-16" />
     </div>
    ))}
   </div>
  )
 }

 if (results.length === 0 && query) {
  return (
   <div className="flex flex-col items-center justify-center py-8">
    <Search className="h-12 w-12 text-muted-foreground mb-4" />
    <h3 className="text-lg font-semibold mb-2">No se encontraron autores</h3>
    <p className="text-muted-foreground text-center">
     No hay autores que coincidan con "{query}"
    </p>
   </div>
  )
 }

 return (
  <div className="space-y-3">
   {results.map((author) => (
    <div key={author.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
     <Avatar className="h-10 w-10">
      <AvatarImage
       src={author.profileImage?.url || author.profilePicture || ''}
       alt={author.name}
      />
      <AvatarFallback>
       {author.name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
     </Avatar>

     <div className="flex-1">
      <div className="font-medium">{author.name}</div>
      {author.description && (
       <div className="text-sm text-muted-foreground line-clamp-1">
        {author.description}
       </div>
      )}
     </div>

     <div className="flex items-center gap-2">
      {author.user && (
       <Badge variant="secondary" className="text-xs">
        <User className="h-3 w-3 mr-1" />
        Usuario
       </Badge>
      )}
      <Badge variant="outline" className="text-xs">
       <BookOpen className="h-3 w-3 mr-1" />
       {author._count?.blogAuthors || 0}
      </Badge>
     </div>
    </div>
   ))}
  </div>
 )
}