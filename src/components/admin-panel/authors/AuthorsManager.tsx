'use client'

import { useState } from 'react'
import { Plus, Search, Users, TrendingUp, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { useAuthors, useAuthorStats, usePopularAuthors, useAuthorSearchWithDebounce } from '@/hooks/blogs/authors/useAuthors'
import AuthorsList from './AuthorsList'
import CreateAuthorDialog from './CreateAuthorDialog'
import AuthorStatsCards from './AuthorStatsCards'
import PopularAuthorsList from './PopularAuthorsList'
import AuthorSearchResults from './AuthorSearchResults'

export default function AuthorsManager() {
 const [showCreateDialog, setShowCreateDialog] = useState(false)
 const [searchQuery, setSearchQuery] = useState('')
 const [activeTab, setActiveTab] = useState('all')

 // Queries
 const { data: authors = [], isLoading: authorsLoading } = useAuthors(true, true)
 const { data: stats, isLoading: statsLoading } = useAuthorStats()
 const { data: popularAuthors = [], isLoading: popularLoading } = usePopularAuthors(5)
 const { data: searchResults = [], isLoading: searchLoading } = useAuthorSearchWithDebounce(searchQuery)

 const handleCreateSuccess = () => {
  setShowCreateDialog(false)
 }

 return (
  <div className="space-y-6">
   {/* Header */}
   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
     <h1 className="text-3xl font-bold tracking-tight">Gestión de Autores</h1>
     <p className="text-muted-foreground">
      Administra los autores del blog y sus asociaciones
     </p>
    </div>
    <Button onClick={() => setShowCreateDialog(true)} className="w-fit">
     <Plus className="mr-2 h-4 w-4" />
     Nuevo Autor
    </Button>
   </div>

   {/* Stats Cards */}
   <AuthorStatsCards
    stats={stats}
    isLoading={statsLoading}
    totalAuthors={authors.length}
   />

   {/* Search */}
   <Card>
    <CardHeader>
     <CardTitle className="flex items-center gap-2">
      <Search className="h-5 w-5" />
      Buscar Autores
     </CardTitle>
    </CardHeader>
    <CardContent>
     <div className="flex gap-2">
      <Input
       placeholder="Buscar por nombre o descripción..."
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
       className="flex-1"
      />
      {searchQuery && (
       <Badge variant="secondary" className="px-3">
        {searchResults.length} resultado(s)
       </Badge>
      )}
     </div>
     {searchQuery && (
      <div className="mt-4">
       <AuthorSearchResults
        results={searchResults}
        isLoading={searchLoading}
        query={searchQuery}
       />
      </div>
     )}
    </CardContent>
   </Card>

   {/* Main Content Tabs */}
   <Tabs value={activeTab} onValueChange={setActiveTab}>
    <TabsList className="grid w-full grid-cols-3">
     <TabsTrigger value="all" className="flex items-center gap-2">
      <Users className="h-4 w-4" />
      Todos los Autores
      <Badge variant="secondary" className="ml-1">
       {authors.length}
      </Badge>
     </TabsTrigger>
     <TabsTrigger value="popular" className="flex items-center gap-2">
      <TrendingUp className="h-4 w-4" />
      Más Populares
     </TabsTrigger>
     <TabsTrigger value="analytics" className="flex items-center gap-2">
      <BarChart3 className="h-4 w-4" />
      Analíticas
     </TabsTrigger>
    </TabsList>

    <TabsContent value="all" className="space-y-4">
     <AuthorsList
      authors={authors}
      isLoading={authorsLoading}
     />
    </TabsContent>

    <TabsContent value="popular" className="space-y-4">
     <PopularAuthorsList
      authors={popularAuthors}
      isLoading={popularLoading}
     />
    </TabsContent>

    <TabsContent value="analytics" className="space-y-4">
     <div className="grid gap-4">
      <Card>
       <CardHeader>
        <CardTitle>Métricas Detalladas</CardTitle>
        <CardDescription>
         Análisis profundo del rendimiento de autores
        </CardDescription>
       </CardHeader>
       <CardContent>
        <div className="text-center py-8 text-muted-foreground">
         <BarChart3 className="h-12 w-12 mx-auto mb-2" />
         <p>Panel de analíticas en desarrollo</p>
        </div>
       </CardContent>
      </Card>
     </div>
    </TabsContent>
   </Tabs>

   {/* Create Author Dialog */}
   <CreateAuthorDialog
    open={showCreateDialog}
    onOpenChange={setShowCreateDialog}
    onSuccess={handleCreateSuccess}
   />
  </div>
 )
}