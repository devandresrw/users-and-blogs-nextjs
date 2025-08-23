'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2 } from 'lucide-react'
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
import { useCreateAuthor, CreateAuthorData } from '@/hooks/blogs/authors/useAuthors'

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

 const onSubmit = async (data: FormData) => {
  try {
   const cleanData: CreateAuthorData = {
    ...data,
    link: data.link || undefined,
    description: data.description || undefined,
    twitter: data.twitter || undefined,
    instagram: data.instagram || undefined,
    facebook: data.facebook || undefined,
    linkedin: data.linkedin || undefined,
    profilePicture: data.profilePicture || undefined,
   }

   await createAuthorMutation.mutateAsync(cleanData)
   form.reset()
   onSuccess()
  } catch (error) {
   // Error is handled by the mutation
  }
 }

 return (
  <Dialog open={open} onOpenChange={onOpenChange}>
   <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
    <DialogHeader>
     <DialogTitle>Crear Nuevo Autor</DialogTitle>
     <DialogDescription>
      Completa la información del autor. Los campos marcados con * son obligatorios.
     </DialogDescription>
    </DialogHeader>

    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
         <FormLabel>Foto de Perfil</FormLabel>
         <FormControl>
          <Input
           placeholder="https://ejemplo.com/imagen.jpg"
           type="url"
           {...field}
          />
         </FormControl>
         <FormDescription>
          URL de la imagen de perfil
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
        onClick={() => onOpenChange(false)}
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