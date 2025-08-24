// src/components/admin-panel/blogs/management/translate/TranslationQueueManager.tsx
'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
 Select,
 SelectContent,
 SelectItem,
 SelectTrigger,
 SelectValue
} from '@/components/ui/select'
import {
 Play,
 Pause,
 RotateCcw,
 Languages,
 Clock,
 CheckCircle,
 XCircle,
 AlertCircle
} from 'lucide-react'
import {
 useTranslationQueue,
 useAddTranslationJobs,
 useStartTranslationProcess
} from '@/hooks/tanslation/useHandleTanslate'

type TranslationQueueManagerProps = {
 selectedBlogs: string[]
 onClearSelection?: () => void
}

// Idiomas disponibles
const AVAILABLE_LANGUAGES = [
 { code: 'en', name: 'Inglés', flag: '🇺🇸' },
 { code: 'fr', name: 'Francés', flag: '🇫🇷' },
 { code: 'de', name: 'Alemán', flag: '🇩🇪' },
 { code: 'it', name: 'Italiano', flag: '🇮🇹' },
 { code: 'pt', name: 'Portugués', flag: '🇵🇹' },
 { code: 'ja', name: 'Japonés', flag: '🇯🇵' },
 { code: 'ko', name: 'Coreano', flag: '🇰🇷' },
 { code: 'zh', name: 'Chino', flag: '🇨🇳' },
 { code: 'ar', name: 'Árabe', flag: '🇸🇦' },
]

export default function TranslationQueueManager({
 selectedBlogs,
 onClearSelection
}: TranslationQueueManagerProps) {
 const [selectedLanguage, setSelectedLanguage] = useState<string>('')
 const [priority, setPriority] = useState<number>(0)

 // Queries y mutaciones
 const {
  data: queueData,
  isLoading: queueLoading,
  error: queueError
 } = useTranslationQueue()

 const addJobsMutation = useAddTranslationJobs()
 const startProcessMutation = useStartTranslationProcess()

 // Calcular estadísticas
 const stats = queueData?.stats
 const activeJobs = queueData?.activeJobs || []
 const totalJobs = stats?.total || 0
 const completedJobs = stats?.completed || 0
 const progress = totalJobs > 0 ? (completedJobs / totalJobs) * 100 : 0

 // Estimación de tiempo
 const pendingJobs = (stats?.pending || 0) + (stats?.processing || 0)
 const estimatedMinutes = Math.ceil(pendingJobs / 5) // 5 traducciones por minuto

 // Manejar adición de trabajos
 const handleAddJobs = async () => {
  if (selectedBlogs.length === 0) {
   alert('Selecciona al menos un blog')
   return
  }

  if (!selectedLanguage) {
   alert('Selecciona un idioma objetivo')
   return
  }

  try {
   await addJobsMutation.mutateAsync({
    blogIds: selectedBlogs,
    targetLanguage: selectedLanguage,
    priority
   })

   // Limpiar selección si está disponible
   onClearSelection?.()
   setSelectedLanguage('')
  } catch (error) {
   console.error('Error agregando trabajos:', error)
  }
 }

 // Manejar inicio de procesamiento
 const handleStartProcessing = async () => {
  try {
   await startProcessMutation.mutateAsync()
  } catch (error) {
   console.error('Error iniciando procesamiento:', error)
  }
 }

 if (queueLoading) {
  return (
   <Card className="p-6">
    <div className="animate-pulse space-y-4">
     <div className="h-6 bg-muted rounded w-1/3"></div>
     <div className="grid grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
       <div key={i} className="h-20 bg-muted rounded"></div>
      ))}
     </div>
    </div>
   </Card>
  )
 }

 return (
  <div className="space-y-6">
   {/* Header */}
   <Card className="p-6">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center space-x-2">
      <Languages className="h-5 w-5 text-primary" />
      <h3 className="text-lg font-semibold">Cola de Traducción</h3>
     </div>

     <div className="flex items-center space-x-2">
      {(stats?.processing || 0) > 0 && (
       <Badge variant="default" className="animate-pulse">
        <Clock className="h-3 w-3 mr-1" />
        Procesando
       </Badge>
      )}
      {estimatedMinutes > 0 && (
       <Badge variant="outline">
        ~{estimatedMinutes} min restantes
       </Badge>
      )}
     </div>
    </div>

    {/* Estadísticas principales */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
     <div className="bg-orange-50 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-orange-600">
       {stats?.pending || 0}
      </div>
      <div className="text-sm text-orange-700 flex items-center justify-center mt-1">
       <Clock className="h-3 w-3 mr-1" />
       Pendientes
      </div>
     </div>

     <div className="bg-blue-50 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-blue-600">
       {stats?.processing || 0}
      </div>
      <div className="text-sm text-blue-700 flex items-center justify-center mt-1">
       <Play className="h-3 w-3 mr-1" />
       Procesando
      </div>
     </div>

     <div className="bg-green-50 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-green-600">
       {stats?.completed || 0}
      </div>
      <div className="text-sm text-green-700 flex items-center justify-center mt-1">
       <CheckCircle className="h-3 w-3 mr-1" />
       Completados
      </div>
     </div>

     <div className="bg-red-50 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-red-600">
       {stats?.failed || 0}
      </div>
      <div className="text-sm text-red-700 flex items-center justify-center mt-1">
       <XCircle className="h-3 w-3 mr-1" />
       Fallidos
      </div>
     </div>
    </div>

    {/* Barra de progreso */}
    {totalJobs > 0 && (
     <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
       <span className="text-sm font-medium">Progreso General</span>
       <span className="text-sm text-muted-foreground">
        {Math.round(progress)}% ({completedJobs}/{totalJobs})
       </span>
      </div>
      <Progress value={progress} className="h-2" />
     </div>
    )}

    {/* Formulario de nueva traducción */}
    <div className="border-t pt-6">
     <h4 className="font-medium mb-4">Agregar Nueva Traducción</h4>

     <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
      {/* Selector de idioma */}
      <div>
       <label className="text-sm font-medium mb-2 block">
        Idioma Objetivo
       </label>
       <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
        <SelectTrigger>
         <SelectValue placeholder="Selecciona idioma" />
        </SelectTrigger>
        <SelectContent>
         {AVAILABLE_LANGUAGES.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
           <div className="flex items-center space-x-2">
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
           </div>
          </SelectItem>
         ))}
        </SelectContent>
       </Select>
      </div>

      {/* Selector de prioridad */}
      <div>
       <label className="text-sm font-medium mb-2 block">
        Prioridad
       </label>
       <Select value={priority.toString()} onValueChange={(v) => setPriority(parseInt(v))}>
        <SelectTrigger>
         <SelectValue />
        </SelectTrigger>
        <SelectContent>
         <SelectItem value="0">Normal</SelectItem>
         <SelectItem value="1">Alta</SelectItem>
         <SelectItem value="2">Urgente</SelectItem>
        </SelectContent>
       </Select>
      </div>

      {/* Info de selección */}
      <div className="flex items-end">
       <div className="text-sm text-muted-foreground">
        <div className="font-medium">{selectedBlogs.length} blogs seleccionados</div>
        <div>= {selectedBlogs.length} trabajos</div>
       </div>
      </div>

      {/* Botones de acción */}
      <div className="flex space-x-2">
       <Button
        onClick={handleAddJobs}
        disabled={
         addJobsMutation.isPending ||
         selectedBlogs.length === 0 ||
         !selectedLanguage
        }
        className="flex-1"
       >
        {addJobsMutation.isPending ? 'Agregando...' : 'Agregar a Cola'}
       </Button>
      </div>
     </div>

     {/* Botón de procesamiento */}
     <div className="flex space-x-2">
      <Button
       onClick={handleStartProcessing}
       disabled={startProcessMutation.isPending || (stats?.pending || 0) === 0}
       variant="outline"
      >
       <Play className="h-4 w-4 mr-2" />
       {startProcessMutation.isPending ? 'Iniciando...' : 'Procesar Cola'}
      </Button>

      <Button
       onClick={() => window.location.reload()}
       variant="ghost"
       size="sm"
      >
       <RotateCcw className="h-4 w-4 mr-2" />
       Actualizar
      </Button>
     </div>
    </div>
   </Card>

   {/* Trabajos activos */}
   {activeJobs.length > 0 && (
    <Card className="p-6">
     <h4 className="font-medium mb-4 flex items-center">
      <AlertCircle className="h-4 w-4 mr-2" />
      Trabajos en Proceso ({activeJobs.length})
     </h4>

     <div className="space-y-3 max-h-80 overflow-y-auto">
      {activeJobs.map((job) => (
       <div
        key={job.id}
        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
       >
        <div className="flex-1">
         <div className="font-medium text-sm truncate">
          {job.blog?.title || `Blog ${job.blogId.slice(0, 8)}...`}
         </div>
         <div className="text-xs text-muted-foreground mt-1">
          Traduciendo a: {AVAILABLE_LANGUAGES.find(l => l.code === job.targetLanguage)?.name || job.targetLanguage}
         </div>
        </div>

        <Badge
         variant={
          job.status === 'processing' ? 'default' :
           job.status === 'failed' ? 'destructive' : 'secondary'
         }
         className="ml-2"
        >
         {job.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
         {job.status === 'failed' && <XCircle className="h-3 w-3 mr-1" />}
         {job.status}
        </Badge>
       </div>
      ))}
     </div>
    </Card>
   )}

   {/* Mensajes de estado */}
   {queueError && (
    <Alert variant="destructive">
     <AlertCircle className="h-4 w-4" />
     <AlertDescription>
      Error al cargar la cola de traducción: {queueError.message}
     </AlertDescription>
    </Alert>
   )}

   {addJobsMutation.isError && (
    <Alert variant="destructive">
     <AlertCircle className="h-4 w-4" />
     <AlertDescription>
      Error al agregar trabajos: {addJobsMutation.error?.message}
     </AlertDescription>
    </Alert>
   )}

   {addJobsMutation.isSuccess && (
    <Alert>
     <CheckCircle className="h-4 w-4" />
     <AlertDescription>
      Trabajos agregados exitosamente a la cola de traducción
     </AlertDescription>
    </Alert>
   )}
  </div>


 )
}