'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
 BarChart3,
 Globe,
 TrendingUp,
 FileText,
 Languages as LanguagesIcon
} from 'lucide-react'

type BlogsManagementStatsProps = {
 stats: {
  total: number
  translated: number
  untranslated: number
  languages: string[]
  byLanguage: Record<string, number>
 }
 targetLanguage?: string
}

export default function BlogsManagementStats({
 stats,
 targetLanguage
}: BlogsManagementStatsProps) {
 const translationPercentage = stats.total > 0
  ? Math.round((stats.translated / stats.total) * 100)
  : 0

 const getLanguageName = (code: string) => {
  const names: Record<string, string> = {
   'es': 'Español',
   'en': 'Inglés',
   'fr': 'Francés',
   'de': 'Alemán',
   'it': 'Italiano',
   'pt': 'Portugués'
  }
  return names[code] || code.toUpperCase()
 }

 const sortedLanguages = Object.entries(stats.byLanguage)
  .sort(([, a], [, b]) => b - a)
  .slice(0, 5)

 return (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
   {/* Total de blogs */}
   <Card className="p-4">
    <div className="flex items-center space-x-2">
     <FileText className="h-5 w-5 text-blue-600" />
     <div>
      <div className="text-2xl font-bold">{stats.total}</div>
      <p className="text-sm text-muted-foreground">Total de blogs</p>
     </div>
    </div>
   </Card>

   {/* Blogs traducidos */}
   <Card className="p-4">
    <div className="flex items-center space-x-2">
     <TrendingUp className="h-5 w-5 text-green-600" />
     <div className="flex-1">
      <div className="text-2xl font-bold text-green-600">{stats.translated}</div>
      <p className="text-sm text-muted-foreground">Traducidos</p>
      <Progress value={translationPercentage} className="mt-2" />
      <p className="text-xs text-muted-foreground mt-1">{translationPercentage}% completado</p>
     </div>
    </div>
   </Card>

   {/* Blogs sin traducir */}
   <Card className="p-4">
    <div className="flex items-center space-x-2">
     <BarChart3 className="h-5 w-5 text-orange-600" />
     <div>
      <div className="text-2xl font-bold text-orange-600">{stats.untranslated}</div>
      <p className="text-sm text-muted-foreground">Sin traducir</p>
      {targetLanguage && (
       <Badge variant="outline" className="mt-2 text-xs">
        Para {getLanguageName(targetLanguage)}
       </Badge>
      )}
     </div>
    </div>
   </Card>

   {/* Idiomas disponibles */}
   <Card className="p-4">
    <div className="flex items-center space-x-2">
     <LanguagesIcon className="h-5 w-5 text-purple-600" />
     <div className="flex-1">
      <div className="text-2xl font-bold text-purple-600">{stats.languages.length}</div>
      <p className="text-sm text-muted-foreground">Idiomas disponibles</p>
      <div className="flex flex-wrap gap-1 mt-2">
       {stats.languages.slice(0, 3).map((lang) => (
        <Badge key={lang} variant="outline" className="text-xs">
         {lang.toUpperCase()}
        </Badge>
       ))}
       {stats.languages.length > 3 && (
        <Badge variant="outline" className="text-xs">
         +{stats.languages.length - 3}
        </Badge>
       )}
      </div>
     </div>
    </div>
   </Card>

   {/* Distribución por idiomas (span completo en móvil) */}
   <Card className="p-4 md:col-span-2 lg:col-span-4">
    <div className="space-y-3">
     <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      <h3 className="font-medium">Distribución por idiomas</h3>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {sortedLanguages.map(([language, count]) => {
       const percentage = Math.round((count / stats.total) * 100)
       return (
        <div key={language} className="space-y-2">
         <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{getLanguageName(language)}</span>
          <span className="text-sm text-muted-foreground">{count}</span>
         </div>
         <Progress value={percentage} className="h-2" />
         <span className="text-xs text-muted-foreground">{percentage}%</span>
        </div>
       )
      })}
     </div>
    </div>
   </Card>
  </div>
 )
}