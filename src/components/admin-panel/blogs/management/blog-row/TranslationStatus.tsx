'use client'

import { Badge } from '@/components/ui/badge'
import { CheckCircle, XCircle, Circle } from 'lucide-react'

type TranslationStatusProps = {
 status: 'translated' | 'untranslated' | 'unknown'
 hasTargetTranslation?: boolean
 targetLanguage?: string
}

export default function TranslationStatus({
 status,
 hasTargetTranslation,
 targetLanguage
}: TranslationStatusProps) {
 const getStatusConfig = () => {
  switch (status) {
   case 'translated':
    return {
     icon: CheckCircle,
     variant: 'default' as const,
     className: 'bg-green-100 text-green-800 border-green-200',
     text: 'Traducido'
    }
   case 'untranslated':
    return {
     icon: XCircle,
     variant: 'secondary' as const,
     className: 'bg-orange-100 text-orange-800 border-orange-200',
     text: 'Sin traducir'
    }
   default:
    return {
     icon: Circle,
     variant: 'outline' as const,
     className: 'bg-gray-100 text-gray-600 border-gray-200',
     text: 'Desconocido'
    }
  }
 }

 const config = getStatusConfig()
 const Icon = config.icon

 return (
  <div className="space-y-1">
   <Badge
    variant={config.variant}
    className={`text-xs flex items-center space-x-1 w-fit ${config.className}`}
   >
    <Icon className="h-3 w-3" />
    <span>{config.text}</span>
   </Badge>

   {targetLanguage && (
    <div className="text-xs text-muted-foreground">
     {targetLanguage.toUpperCase()}: {hasTargetTranslation ? 'Sí' : 'No'}
    </div>
   )}
  </div>
 )
}