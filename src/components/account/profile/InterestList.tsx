'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, X } from 'lucide-react'

interface User {
 id: string
 interests?: string[]
}

export const InterestsList = ({ user }: { user: User }) => {
 const [interests, setInterests] = useState<string[]>(user.interests || [])
 const [newInterest, setNewInterest] = useState('')
 const [isAdding, setIsAdding] = useState(false)

 const addInterest = async () => {
  if (newInterest.trim() && !interests.includes(newInterest.trim())) {
   const updatedInterests = [...interests, newInterest.trim()]
   setInterests(updatedInterests)
   // Aquí harías la llamada a la API
   // await updateUserInterests(user.id, updatedInterests)
   setNewInterest('')
   setIsAdding(false)
  }
 }

 const removeInterest = async (interestToRemove: string) => {
  const updatedInterests = interests.filter(interest => interest !== interestToRemove)
  setInterests(updatedInterests)
  // await updateUserInterests(user.id, updatedInterests)
 }

 return (
  <Card>
   <CardHeader className="flex flex-row items-center justify-between">
    <CardTitle>Mis Intereses</CardTitle>
    <Button
     variant="outline"
     size="sm"
     onClick={() => setIsAdding(true)}
     disabled={isAdding}
    >
     <Plus className="h-4 w-4" />
     Agregar
    </Button>
   </CardHeader>
   <CardContent>
    <div className="flex flex-wrap gap-2 mb-4">
     {interests.map((interest) => (
      <Badge key={interest} variant="secondary" className="flex items-center gap-1">
       {interest}
       <button
        onClick={() => removeInterest(interest)}
        className="ml-1 hover:text-destructive"
       >
        <X className="h-3 w-3" />
       </button>
      </Badge>
     ))}
    </div>

    {isAdding && (
     <div className="flex gap-2">
      <Input
       value={newInterest}
       onChange={(e) => setNewInterest(e.target.value)}
       placeholder="Nuevo interés..."
       onKeyPress={(e) => e.key === 'Enter' && addInterest()}
      />
      <Button onClick={addInterest} size="sm">
       Agregar
      </Button>
      <Button
       variant="outline"
       onClick={() => {
        setIsAdding(false)
        setNewInterest('')
       }}
       size="sm"
      >
       Cancelar
      </Button>
     </div>
    )}

    {interests.length === 0 && !isAdding && (
     <p className="text-muted-foreground">No has agregado intereses aún.</p>
    )}
   </CardContent>
  </Card>
 )
}