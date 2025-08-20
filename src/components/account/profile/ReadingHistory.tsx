'use client'
import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Clock, BookOpen } from 'lucide-react'

interface ReadingHistoryItem {
 id: string
 title: string
 readAt: string
 category: string
 readTime: number
}

export const ReadingHistory = ({ userId }: { userId: string }) => {
 const [history, setHistory] = useState<ReadingHistoryItem[]>([])
 const [loading, setLoading] = useState(true)

 useEffect(() => {
  // Simulación de carga de datos
  const fetchHistory = async () => {
   try {
    // const response = await fetch(`/api/user/${userId}/reading-history`)
    // const data = await response.json()

    // Datos de ejemplo
    const mockData: ReadingHistoryItem[] = [
     {
      id: '1',
      title: 'Introducción a Next.js 14',
      readAt: '2024-01-15',
      category: 'Tecnología',
      readTime: 5
     },
     {
      id: '2',
      title: 'Mejores prácticas en React',
      readAt: '2024-01-10',
      category: 'Desarrollo',
      readTime: 8
     }
    ]

    setHistory(mockData)
   } catch (error) {
    console.error('Error fetching reading history:', error)
   } finally {
    setLoading(false)
   }
  }

  fetchHistory()
 }, [userId])

 if (loading) {
  return (
   <Card>
    <CardHeader>
     <CardTitle>Historial de Lectura</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
     {[...Array(3)].map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
       <Skeleton className="h-12 w-12 rounded" />
       <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
       </div>
      </div>
     ))}
    </CardContent>
   </Card>
  )
 }

 return (
  <Card>
   <CardHeader>
    <CardTitle className="flex items-center gap-2">
     <BookOpen className="h-5 w-5" />
     Historial de Lectura
    </CardTitle>
   </CardHeader>
   <CardContent>
    {history.length === 0 ? (
     <p className="text-muted-foreground">No has leído ningún artículo aún.</p>
    ) : (
     <div className="space-y-4">
      {history.map((item) => (
       <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
        <div>
         <h4 className="font-medium">{item.title}</h4>
         <p className="text-sm text-muted-foreground">{item.category}</p>
        </div>
        <div className="text-right">
         <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {item.readTime} min
         </div>
         <p className="text-xs text-muted-foreground">
          {new Date(item.readAt).toLocaleDateString()}
         </p>
        </div>
       </div>
      ))}
     </div>
    )}
   </CardContent>
  </Card>
 )
}