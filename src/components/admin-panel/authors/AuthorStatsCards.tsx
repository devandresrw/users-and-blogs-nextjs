'use client'

import { Users, UserCheck, Crown, TrendingUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AuthorStats } from '@/hooks/blogs/authors/useAuthors'

interface AuthorStatsCardsProps {
 stats?: AuthorStats
 isLoading: boolean
 totalAuthors: number
}

export default function AuthorStatsCards({ stats, isLoading, totalAuthors }: AuthorStatsCardsProps) {
 if (isLoading) {
  return (
   <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
     <Card key={i}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
       <Skeleton className="h-4 w-20" />
       <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
       <Skeleton className="h-8 w-16 mb-1" />
       <Skeleton className="h-3 w-24" />
      </CardContent>
     </Card>
    ))}
   </div>
  )
 }

 return (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-sm font-medium">
      Total de Autores
     </CardTitle>
     <Users className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
     <div className="text-2xl font-bold">{stats?.totalAuthors || totalAuthors}</div>
     <p className="text-xs text-muted-foreground">
      Autores registrados
     </p>
    </CardContent>
   </Card>

   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-sm font-medium">
      Con Blogs
     </CardTitle>
     <TrendingUp className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
     <div className="text-2xl font-bold">{stats?.authorsWithBlogs || 0}</div>
     <p className="text-xs text-muted-foreground">
      Autores con contenido
     </p>
    </CardContent>
   </Card>

   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-sm font-medium">
      Con Usuarios
     </CardTitle>
     <UserCheck className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
     <div className="text-2xl font-bold">{stats?.authorsWithUsers || 0}</div>
     <p className="text-xs text-muted-foreground">
      Autores vinculados
     </p>
    </CardContent>
   </Card>

   <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
     <CardTitle className="text-sm font-medium">
      Más Productivo
     </CardTitle>
     <Crown className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
     <div className="text-2xl font-bold">
      {stats?.topAuthor?.blogCount || 0}
     </div>
     <p className="text-xs text-muted-foreground">
      {stats?.topAuthor?.name ? `${stats.topAuthor.name}` : 'Sin datos'}
     </p>
    </CardContent>
   </Card>
  </div>
 )
}