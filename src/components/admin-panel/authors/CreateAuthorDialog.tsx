'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Upload, X } from 'lucide-react'
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogFooter,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog'
import {
 Form,
 FormControl,
 FormDescription,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useCreateAuthor } from '@/hooks/blogs/authors/useAuthors'

const createAuthorSchema = z.object({
 name: z.string().min(1, 'El nombre es requerido').max(100, 'El nombre debe tener máximo 100 caracteres'),
 link: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
 description: z.string().max(500, 'La descripción debe tener máximo 500 caracteres').optional(),
 twitter: z.string().max(100, 'El usuario de Twitter debe tener máximo 100 caracteres').optional(),
 instagram: z.string().max(100, 'El usuario de Instagram debe tener máximo 100 caracteres').optional(),
 facebook: z.string().max(100, 'El usuario de Facebook debe tener máximo 100 caracteres').optional(),
 linkedin: z.string().max(100, 'El usuario de LinkedIn debe tener máximo 100 caracteres').optional(),
 profilePicture: z.string().url('Debe ser una URL válida').optional().or(z.literal('')),
})

type FormData = z.infer<typeof createAuthorSchema>

interface CreateAuthorDialogProps {
 open: boolean
 onOpenChange: (open: boolean) => void
 onSuccess: () => void
}

export default function CreateAuthorDialog({ open, onOpenChange, onSuccess }: CreateAuthorDialogProps) {
 const [selectedImage, setSelectedImage] = useState<File | null>(null)
 const [imagePreview, setImagePreview] = useState<string>('')
 const createAuthorMutation = useCreateAuthor()

 const form = useForm<FormData>({
  resolver: zodResolver(createAuthorSchema),
  defaultValues: {
   name: '',
   link: '',
   description: '',
   twitter: '',
   instagram: '',
   facebook: '',
   linkedin: '',
   profilePicture: '',
  },
 })

 const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0]
  if (file) {
   // Validar tipo de archivo
   if (!file.type.startsWith('image/')) {
    alert('Por favor selecciona un archivo de imagen válido')
    return
   }

   // Validar tamaño (máximo 5MB)
   if (file.size > 5 * 1024 * 1024) {
    alert('La imagen debe ser menor a 5MB')
    return
   }

   setSelectedImage(file)

   // Crear preview
   const reader = new FileReader()
   reader.onload = (e) => {
    setImagePreview(e.target?.result as string)
   }
   reader.readAsDataURL(file)
  }
 }

 const removeImage = () => {
  setSelectedImage(null)
  setImagePreview('')
 }

 const onSubmit = async (data: FormData) => {
  try {
   // Crear FormData para enviar archivo
   const formData = new FormData()

   // Agregar campos de texto
   Object.entries(data).forEach(([key, value]) => {
    if (value) {
     formData.append(key, value)
    }
   })

   // Agregar imagen si existe
   if (selectedImage) {
    formData.append('imageFile', selectedImage)
   }

   await createAuthorMutation.mutateAsync(formData)

   // Reset form y estado
   form.reset()
   setSelectedImage(null)
   setImagePreview('')
   onSuccess()
  } catch (error) {
   // Error is handled by the mutation
  }
 }

 const handleDialogClose = () => {
  form.reset()
  setSelectedImage(null)
  setImagePreview('')
  onOpenChange(false)
 }

 return (
  <Dialog open={open} onOpenChange={handleDialogClose}>
   <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
    <DialogHeader>
     <DialogTitle>Crear Nuevo Autor</DialogTitle>
     <DialogDescription>
      Completa la información del autor. Los campos marcados con * son obligatorios.
     </DialogDescription>
    </DialogHeader>

    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Imagen de Perfil */}
      <div className="space-y-2">
       <FormLabel>Foto de Perfil</FormLabel>
       <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
         <AvatarImage src={imagePreview} alt="Preview" />
         <AvatarFallback>
          {form.watch('name')?.slice(0, 2).toUpperCase() || 'AU'}
         </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-2">
         <div className="flex gap-2">
          <Button
           type="button"
           variant="outline"
           size="sm"
           onClick={() => document.getElementById('image-upload')?.click()}
          >
           <Upload className="h-4 w-4 mr-2" />
           Subir Imagen
          </Button>

          {selectedImage && (
           <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeImage}
           >
            <X className="h-4 w-4 mr-2" />
            Quitar
           </Button>
          )}
         </div>

         <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
         />

         <p className="text-xs text-muted-foreground">
          Máximo 5MB. Formatos: JPG, PNG, WEBP
         </p>
        </div>
       </div>
      </div>

      <FormField
       control={form.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Nombre *</FormLabel>
         <FormControl>
          <Input placeholder="Nombre del autor" {...field} />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="description"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Descripción</FormLabel>
         <FormControl>
          <Textarea
           placeholder="Breve descripción del autor"
           className="resize-none"
           rows={3}
           {...field}
          />
         </FormControl>
         <FormDescription>
          Máximo 500 caracteres
         </FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="link"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Sitio Web</FormLabel>
         <FormControl>
          <Input
           placeholder="https://ejemplo.com"
           type="url"
           {...field}
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="profilePicture"
       render={({ field }) => (
        <FormItem>
         <FormLabel>URL de Imagen (Alternativa)</FormLabel>
         <FormControl>
          <Input
           placeholder="https://ejemplo.com/imagen.jpg"
           type="url"
           {...field}
          />
         </FormControl>
         <FormDescription>
          Solo si no subes una imagen arriba
         </FormDescription>
         <FormMessage />
        </FormItem>
       )}
      />

      <div className="grid grid-cols-2 gap-4">
       <FormField
        control={form.control}
        name="twitter"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Twitter</FormLabel>
          <FormControl>
           <Input placeholder="@usuario" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="instagram"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Instagram</FormLabel>
          <FormControl>
           <Input placeholder="@usuario" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="linkedin"
        render={({ field }) => (
         <FormItem>
          <FormLabel>LinkedIn</FormLabel>
          <FormControl>
           <Input placeholder="usuario" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />

       <FormField
        control={form.control}
        name="facebook"
        render={({ field }) => (
         <FormItem>
          <FormLabel>Facebook</FormLabel>
          <FormControl>
           <Input placeholder="usuario" {...field} />
          </FormControl>
          <FormMessage />
         </FormItem>
        )}
       />
      </div>

      <DialogFooter>
       <Button
        type="button"
        variant="outline"
        onClick={handleDialogClose}
        disabled={createAuthorMutation.isPending}
       >
        Cancelar
       </Button>
       <Button type="submit" disabled={createAuthorMutation.isPending}>
        {createAuthorMutation.isPending && (
         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        )}
        Crear Autor
       </Button>
      </DialogFooter>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 )
}