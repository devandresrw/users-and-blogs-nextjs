'use client'
import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue,
} from '@/components/ui/select'

// Definir el tipo específico para este componente
type BlogsManagementFiltersType = {
 lang: string
 page: number
 limit: number
 status: 'translated' | 'untranslated' | 'all'
 targetLanguage?: string
}

type BlogsManagementFiltersProps = {
 filters: BlogsManagementFiltersType
 onFiltersChange: (filters: Partial<BlogsManagementFiltersType>) => void
 availableLanguages?: string[]
 isLoading?: boolean
}

// Opciones de idiomas comunes
const COMMON_LANGUAGES = [
 { code: 'es', name: 'Español' },
 { code: 'en', name: 'Inglés' },
 { code: 'fr', name: 'Francés' },
 { code: 'de', name: 'Alemán' },
 { code: 'it', name: 'Italiano' },
 { code: 'pt', name: 'Portugués' },
 { code: 'ja', name: 'Japonés' },
 { code: 'ko', name: 'Coreano' },
 { code: 'zh', name: 'Chino' },
 { code: 'ar', name: 'Árabe' },
]

export default function BlogsManagementFilters({
 filters,
 onFiltersChange,
 availableLanguages = [],
 isLoading = false
}: BlogsManagementFiltersProps) {
 const [searchTerm, setSearchTerm] = useState('')
 const [showAdvanced, setShowAdvanced] = useState(false)

 // Obtener nombre del idioma
 const getLanguageName = (code: string) => {
  return COMMON_LANGUAGES.find(lang => lang.code === code)?.name || code.toUpperCase()
 }

 // Limpiar todos los filtros
 const clearAllFilters = () => {
  setSearchTerm('')
  onFiltersChange({
   lang: 'es',
   page: 1,
   status: 'all',
   targetLanguage: undefined
  })
 }

 // Contar filtros activos
 const activeFiltersCount = [
  filters.status !== 'all',
  filters.targetLanguage !== undefined,
  filters.lang !== 'es',
  searchTerm.trim() !== ''
 ].filter(Boolean).length

 return (
  <Card className="p-4 space-y-4">
   {/* Header con título y botón de limpiar */}
   <div className="flex items-center justify-between">
    <div className="flex items-center space-x-2">
     <Filter className="h-4 w-4" />
     <h3 className="font-medium">Filtros de búsqueda</h3>
     {activeFiltersCount > 0 && (
      <Badge variant="secondary" className="text-xs">
       {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
      </Badge>
     )}
    </div>

    {activeFiltersCount > 0 && (
     <Button
      variant="ghost"
      size="sm"
      onClick={clearAllFilters}
      className="text-xs"
     >
      <X className="h-3 w-3 mr-1" />
      Limpiar filtros
     </Button>
    )}
   </div>

   {/* Filtros principales */}
   <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
    {/* Búsqueda por texto */}
    <div className="relative">
     <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
     <Input
      placeholder="Buscar por título..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="pl-9"
      disabled={isLoading}
     />
    </div>

    {/* Estado de traducción */}
    <Select
     value={filters.status}
     onValueChange={(value: 'translated' | 'untranslated' | 'all') =>
      onFiltersChange({ status: value })
     }
     disabled={isLoading}
    >
     <SelectTrigger>
      <SelectValue placeholder="Estado de traducción" />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="all">Todos los estados</SelectItem>
      <SelectItem value="translated">Traducidos</SelectItem>
      <SelectItem value="untranslated">Sin traducir</SelectItem>
     </SelectContent>
    </Select>

    {/* Idioma base */}
    <Select
     value={filters.lang}
     onValueChange={(value) => onFiltersChange({ lang: value })}
     disabled={isLoading}
    >
     <SelectTrigger>
      <SelectValue placeholder="Idioma base" />
     </SelectTrigger>
     <SelectContent>
      {COMMON_LANGUAGES.map((lang) => (
       <SelectItem key={lang.code} value={lang.code}>
        {lang.name}
       </SelectItem>
      ))}
     </SelectContent>
    </Select>

    {/* Idioma objetivo - ARREGLADO: usar valor especial para "ninguno" */}
    <Select
     value={filters.targetLanguage || 'none'}
     onValueChange={(value) =>
      onFiltersChange({ targetLanguage: value === 'none' ? undefined : value })
     }
     disabled={isLoading}
    >
     <SelectTrigger>
      <SelectValue placeholder="Idioma objetivo" />
     </SelectTrigger>
     <SelectContent>
      <SelectItem value="none">Sin filtro</SelectItem>
      {COMMON_LANGUAGES.map((lang) => (
       <SelectItem key={lang.code} value={lang.code}>
        {lang.name}
       </SelectItem>
      ))}
     </SelectContent>
    </Select>
   </div>

   {/* Filtros avanzados (opcional) */}
   <div className="flex items-center justify-between pt-2 border-t">
    <Button
     variant="ghost"
     size="sm"
     onClick={() => setShowAdvanced(!showAdvanced)}
     className="text-xs"
    >
     Filtros avanzados {showAdvanced ? '▲' : '▼'}
    </Button>

    {/* Resultados por página */}
    <div className="flex items-center space-x-2">
     <span className="text-xs text-muted-foreground">Mostrar:</span>
     <Select
      value={filters.limit.toString()}
      onValueChange={(value) => onFiltersChange({ limit: parseInt(value) })}
      disabled={isLoading}
     >
      <SelectTrigger className="w-20 h-8">
       <SelectValue />
      </SelectTrigger>
      <SelectContent>
       <SelectItem value="5">5</SelectItem>
       <SelectItem value="10">10</SelectItem>
       <SelectItem value="25">25</SelectItem>
       <SelectItem value="50">50</SelectItem>
      </SelectContent>
     </Select>
     <span className="text-xs text-muted-foreground">por página</span>
    </div>
   </div>

   {/* Filtros avanzados expandidos */}
   {showAdvanced && (
    <div className="pt-4 border-t space-y-3">
     <div className="text-sm font-medium">Idiomas disponibles en el sistema:</div>
     <div className="flex flex-wrap gap-2">
      {availableLanguages.length > 0 ? (
       availableLanguages.map((lang) => (
        <Badge
         key={lang}
         variant={filters.targetLanguage === lang ? "default" : "outline"}
         className="cursor-pointer text-xs"
         onClick={() =>
          onFiltersChange({
           targetLanguage: filters.targetLanguage === lang ? undefined : lang
          })
         }
        >
         {getLanguageName(lang)}
        </Badge>
       ))
      ) : (
       <span className="text-xs text-muted-foreground">No hay idiomas disponibles</span>
      )}
     </div>
    </div>
   )}

   {/* Resumen de filtros activos */}
   {activeFiltersCount > 0 && (
    <div className="pt-3 border-t">
     <div className="text-xs text-muted-foreground mb-2">Filtros activos:</div>
     <div className="flex flex-wrap gap-2">
      {filters.status !== 'all' && (
       <Badge variant="secondary" className="text-xs">
        Estado: {filters.status === 'translated' ? 'Traducidos' : 'Sin traducir'}
        <X
         className="h-3 w-3 ml-1 cursor-pointer"
         onClick={() => onFiltersChange({ status: 'all' })}
        />
       </Badge>
      )}
      {filters.targetLanguage && (
       <Badge variant="secondary" className="text-xs">
        Objetivo: {getLanguageName(filters.targetLanguage)}
        <X
         className="h-3 w-3 ml-1 cursor-pointer"
         onClick={() => onFiltersChange({ targetLanguage: undefined })}
        />
       </Badge>
      )}
      {filters.lang !== 'es' && (
       <Badge variant="secondary" className="text-xs">
        Base: {getLanguageName(filters.lang)}
        <X
         className="h-3 w-3 ml-1 cursor-pointer"
         onClick={() => onFiltersChange({ lang: 'es' })}
        />
       </Badge>
      )}
      {searchTerm.trim() !== '' && (
       <Badge variant="secondary" className="text-xs">
        Búsqueda: "{searchTerm}"
        <X
         className="h-3 w-3 ml-1 cursor-pointer"
         onClick={() => setSearchTerm('')}
        />
       </Badge>
      )}
     </div>
    </div>
   )}
  </Card>
 )
}