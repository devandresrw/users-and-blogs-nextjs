'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Camera, Edit2, Save, X } from 'lucide-react'
import { ImageUpload } from '@/components/account/profile/UploadImages'
import { changeUserName } from '@/lib/profile/change-name.service'
import { useRouter } from 'next/navigation'

interface User {
 id: string
 name: string
 email: string
 image?: string
}

export const ProfileHeader = ({ user }: { user: User }) => {
 const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
 const [isEditingName, setIsEditingName] = useState(false)
 const [newName, setNewName] = useState(user.name)
 const [isUpdatingName, setIsUpdatingName] = useState(false)
 const [nameError, setNameError] = useState<string | null>(null)
 const router = useRouter()

 const handleSaveName = async () => {
  if (!newName.trim()) {
   setNameError('El nombre no puede estar vacío')
   return
  }

  if (newName.trim().length < 2 || newName.trim().length > 50) {
   setNameError('El nombre debe tener entre 2 y 50 caracteres')
   return
  }

  if (newName.trim() === user.name) {
   setIsEditingName(false)
   setNameError(null)
   return
  }

  setIsUpdatingName(true)
  setNameError(null)

  try {
   const result = await changeUserName(user.id, newName.trim())

   if (result.success) {
    setIsEditingName(false)
    router.refresh() // Refrescar para mostrar el nuevo nombre
   } else {
    setNameError(result.message || 'Error al actualizar el nombre')
   }
  } catch (error) {
   console.error('Error updating name:', error)
   setNameError('Error inesperado al actualizar el nombre')
  } finally {
   setIsUpdatingName(false)
  }
 }

 const handleCancelEdit = () => {
  setNewName(user.name)
  setIsEditingName(false)
  setNameError(null)
 }

 return (
  <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-card rounded-lg border">
   <div className="relative">
    <img
     src={user.image || "/profile-icon.png"}
     alt={user.name}
     className="w-32 h-32 rounded-full object-cover border-4 border-border"
    />
    <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
     <DialogTrigger asChild>
      <Button
       size="sm"
       className="absolute bottom-0 right-0 rounded-full p-2"
       variant="secondary"
      >
       <Camera className="h-4 w-4" />
      </Button>
     </DialogTrigger>
     <DialogContent>
      <DialogHeader>
       <DialogTitle>Cambiar foto de perfil</DialogTitle>
      </DialogHeader>
      <ImageUpload
       userId={user.id}
       currentImage={user.image}
       onSuccess={() => setIsImageDialogOpen(false)}
      />
     </DialogContent>
    </Dialog>
   </div>

   <div className="text-center md:text-left flex-1">
    <div className="flex items-center gap-2 justify-center md:justify-start">
     {!isEditingName ? (
      <>
       <h1 className="text-3xl font-bold">{user.name}</h1>
       <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsEditingName(true)}
        className="p-1 h-8 w-8"
       >
        <Edit2 className="h-4 w-4" />
       </Button>
      </>
     ) : (
      <div className="flex items-center gap-2 w-full max-w-sm">
       <Input
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
        className="text-xl font-bold"
        disabled={isUpdatingName}
        autoFocus
       />
       <Button
        variant="ghost"
        size="sm"
        onClick={handleSaveName}
        disabled={isUpdatingName}
        className="p-1 h-8 w-8"
       >
        <Save className="h-4 w-4" />
       </Button>
       <Button
        variant="ghost"
        size="sm"
        onClick={handleCancelEdit}
        disabled={isUpdatingName}
        className="p-1 h-8 w-8"
       >
        <X className="h-4 w-4" />
       </Button>
      </div>
     )}
    </div>

    {nameError && (
     <p className="text-sm text-red-600 mt-1">{nameError}</p>
    )}

    <p className="text-muted-foreground mt-1">{user.email}</p>
   </div>
  </div>
 )
}