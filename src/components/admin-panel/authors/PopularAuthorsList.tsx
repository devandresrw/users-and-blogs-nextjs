'use client'

import { Trophy, BookOpen, User } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Author } from '@/hooks/blogs/authors/useAuthors'

interface PopularAuthorsListProps {
 authors: Author[]
 isLoading: boolean
}

export default function PopularAuthorsList({ authors, isLoading }: PopularAuthorsListProps) {
 if (isLoading) {
  return (
   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <Trophy className="h-5 w-5" />
      Autores Más Populares
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
       <div key={i} className="flex items-center gap-3">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div className="flex-1 space-y-1">
         <Skeleton className="h-4 w-32" />
         <Skeleton className="h-3 w-20" />
        </div>
        <Skeleton className="h-6 w-12" />
       </div>
      ))}
     </div>
    </CardContent>
   </Card>
  )
 }

 if (authors.length === 0) {
  return (
   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <Trophy className="h-5 w-5" />
      Autores Más Populares
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="flex flex-col items-center justify-center py-8">
      <User className="h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-center">
       No hay autores con blogs aún
      </p>
     </div>
    </CardContent>
   </Card>
  )
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle className="flex items-center gap-2">
     <Trophy className="h-5 w-5" />
     Autores Más Populares
    </CardTitle>
   </CardHeader>
   <CardContent>
    <div className="space-y-4">
     {authors.map((author, index) => (
      <div key={author.id} className="flex items-center gap-3">
       <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted">
        <span className="text-sm font-semibold">#{index + 1}</span>
       </div>

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
        <div className="text-sm text-muted-foreground">
         {author.description?.slice(0, 50) || 'Sin descripción'}
         {author.description && author.description.length > 50 && '...'}
        </div>
       </div>

       <Badge variant="secondary" className="flex items-center gap-1">
        <BookOpen className="h-3 w-3" />
        {author._count?.blogAuthors || 0}
       </Badge>
      </div>
     ))}
    </div>
   </CardContent>
  </Card>
 )
}