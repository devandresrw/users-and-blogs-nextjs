'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useCategoryLanguages } from '@/hooks/blogs/categories/useCategories'
import { Search } from 'lucide-react'

interface CategoryFiltersProps {
 filters: {
  search: string
  language: string
  includeRelations: boolean
 }
 onFiltersChange: (filters: any) => void
}

export function CategoryFilters({ filters, onFiltersChange }: CategoryFiltersProps) {
 const { data: languages, isLoading: languagesLoading } = useCategoryLanguages()

 const handleFilterChange = (key: string, value: any) => {
  onFiltersChange({
   ...filters,
   [key]: value
  })
 }

 return (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-black rounded-lg">
   <div className="space-y-2">
    <Label htmlFor="search">Buscar categorías</Label>
    <div className="relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
     <Input
      id="search"
      type="text"
      placeholder="Buscar por nombre o slug..."
      value={filters.search}
      onChange={(e) => handleFilterChange('search', e.target.value)}
      className="pl-10"
     />
    </div>
   </div>

   <div className="space-y-2">
    <Label htmlFor="language">Idioma</Label>
    <Select
     value={filters.language || "all"}
     onValueChange={(value) => handleFilterChange('language', value === "all" ? "" : value)}
    >
     <SelectTrigger>
      <SelectValue placeholder="Todos los idiomas" />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="all">Todos los idiomas</SelectItem>
      {!languagesLoading && languages?.map((lang) => (
       <SelectItem key={lang} value={lang}>
        {lang.toUpperCase()}
       </SelectItem>
      ))}
     </SelectContent>
    </Select>
   </div>

   <div className="space-y-2">
    <Label htmlFor="includeRelations">Incluir relaciones</Label>
    <div className="flex items-center space-x-2">
     <Switch
      id="includeRelations"
      checked={filters.includeRelations}
      onCheckedChange={(checked) => handleFilterChange('includeRelations', checked)}
     />
     <span className="text-sm text-gray-600">
      Mostrar conteos de blogs, encuestas e imágenes
     </span>
    </div>
   </div>
  </div>
 )
}