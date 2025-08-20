'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X } from 'lucide-react'
import { uploadProfileImage, deleteProfileImage } from '@/lib/profile/change-images.service'
import { useRouter } from 'next/navigation'

interface ImageUploadProps {
 userId: string
 currentImage?: string
 onSuccess: () => void
}

export const ImageUpload = ({ userId, currentImage, onSuccess }: ImageUploadProps) => {
 const [uploading, setUploading] = useState(false)
 const [deleting, setDeleting] = useState(false)
 const [preview, setPreview] = useState<string | null>(null)
 const [error, setError] = useState<string | null>(null)
 const router = useRouter()

 const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
   // Validar tamaño
   const maxSize = 5 * 1024 * 1024 // 5MB
   if (file.size > maxSize) {
    setError('La imagen es demasiado grande (máximo 5MB)')
    return
   }

   // Validar tipo
   if (!file.type.startsWith('image/')) {
    setError('El archivo debe ser una imagen')
    return
   }

   setError(null)
   const reader = new FileReader()
   reader.onloadend = () => {
    setPreview(reader.result as string)
   }
   reader.readAsDataURL(file)
  }
 }

 const handleUpload = async () => {
  const fileInput = document.getElementById('image-upload') as HTMLInputElement
  const file = fileInput?.files?.[0]

  if (!file) return

  setUploading(true)
  setError(null)

  try {
   const result = await uploadProfileImage(file, userId)

   if (result.success) {
    setPreview(null)
    fileInput.value = ''
    onSuccess()
    router.refresh() // Refrescar la página para mostrar la nueva imagen
   } else {
    setError(result.message || 'Error al subir la imagen')
   }
  } catch (error) {
   console.error('Error uploading image:', error)
   setError('Error inesperado al subir la imagen')
  } finally {
   setUploading(false)
  }
 }

 const handleDelete = async () => {
  if (!currentImage) return

  setDeleting(true)
  setError(null)

  try {
   const result = await deleteProfileImage(userId)

   if (result.success) {
    onSuccess()
    router.refresh()
   } else {
    setError(result.message || 'Error al eliminar la imagen')
   }
  } catch (error) {
   console.error('Error deleting image:', error)
   setError('Error inesperado al eliminar la imagen')
  } finally {
   setDeleting(false)
  }
 }

 return (
  <div className="space-y-4">
   {error && (
    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">
     {error}
    </div>
   )}

   <div className="flex flex-col items-center gap-4">
    {(preview || currentImage) && (
     <div className="relative">
      <img
       src={preview || currentImage}
       alt="Preview"
       className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
      />
      {currentImage && !preview && (
       <Button
        variant="destructive"
        size="sm"
        className="absolute -top-2 -right-2 rounded-full p-1 h-6 w-6"
        onClick={handleDelete}
        disabled={deleting}
       >
        <X className="h-3 w-3" />
       </Button>
      )}
     </div>
    )}

    <Input
     id="image-upload"
     type="file"
     accept="image/*"
     onChange={handleFileChange}
     className="max-w-xs"
    />
   </div>

   <div className="flex justify-end gap-2">
    <Button
     onClick={handleUpload}
     disabled={!preview || uploading}
     className="flex items-center gap-2"
    >
     <Upload className="h-4 w-4" />
     {uploading ? 'Subiendo...' : 'Subir'}
    </Button>
   </div>
  </div>
 )
}