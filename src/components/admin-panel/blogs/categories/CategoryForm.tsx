'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
} from '@/components/ui/dialog'
import {
 Form,
 FormControl,
 FormField,
 FormItem,
 FormLabel,
 FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Loader2 } from 'lucide-react'
import {
 useCategoryManager,
 useCategoryLanguages,
 type Category
} from '@/hooks/blogs/categories/useCategories'

const categorySchema = z.object({
 name: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
 slug: z.string().min(2, 'El slug debe tener al menos 2 caracteres'),
 baseLanguage: z.string().optional(),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface CategoryFormProps {
 category?: Category | null
 isOpen: boolean
 onClose: () => void
}

export function CategoryForm({ category, isOpen, onClose }: CategoryFormProps) {
 const isEditing = !!category
 const { data: languages } = useCategoryLanguages()

 const {
  createCategory,
  updateCategory,
  isCreating,
  isUpdating,
  createError,
  updateError,
  createSuccess,
  updateSuccess,
  resetMutations
 } = useCategoryManager(category?.id)

 const form = useForm<CategoryFormData>({
  resolver: zodResolver(categorySchema),
  defaultValues: {
   name: '',
   slug: '',
   baseLanguage: '',
  },
 })

 // Cargar datos al editar
 useEffect(() => {
  if (category) {
   form.reset({
    name: category.name,
    slug: category.slug,
    baseLanguage: category.baseLanguage || '',
   })
  } else {
   form.reset({
    name: '',
    slug: '',
    baseLanguage: '',
   })
  }
 }, [category, form])

 // Cerrar modal al completar exitosamente
 useEffect(() => {
  if (createSuccess || updateSuccess) {
   handleClose()
  }
 }, [createSuccess, updateSuccess])

 // Generar slug automáticamente
 const handleNameChange = (name: string) => {
  const slug = name
   .toLowerCase()
   .replace(/[^a-z0-9\s-]/g, '')
   .replace(/\s+/g, '-')
   .replace(/-+/g, '-')
   .trim()

  form.setValue('slug', slug)
 }

 const onSubmit = async (data: CategoryFormData) => {
  try {
   // Convertir baseLanguage vacío a undefined
   const submitData = {
    ...data,
    baseLanguage: data.baseLanguage === "none" ? undefined : data.baseLanguage
   }

   if (isEditing) {
    await updateCategory(submitData)
   } else {
    await createCategory(submitData)
   }
  } catch (error) {
   // El error se maneja en el hook
  }
 }

 const handleClose = () => {
  form.reset()
  resetMutations()
  onClose()
 }

 const isLoading = isCreating || isUpdating
 const error = createError || updateError

 return (
  <Dialog open={isOpen} onOpenChange={handleClose}>
   <DialogContent className="sm:max-w-md">
    <DialogHeader>
     <DialogTitle>
      {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
     </DialogTitle>
    </DialogHeader>

    <Form {...form}>
     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <FormField
       control={form.control}
       name="name"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Nombre</FormLabel>
         <FormControl>
          <Input
           placeholder="Ingresa el nombre de la categoría"
           {...field}
           onChange={(e) => {
            field.onChange(e)
            if (!isEditing) handleNameChange(e.target.value)
           }}
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="slug"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Slug</FormLabel>
         <FormControl>
          <Input
           placeholder="slug-de-la-categoria"
           {...field}
          />
         </FormControl>
         <FormMessage />
        </FormItem>
       )}
      />

      <FormField
       control={form.control}
       name="baseLanguage"
       render={({ field }) => (
        <FormItem>
         <FormLabel>Idioma Base</FormLabel>
         <Select
          onValueChange={field.onChange}
          value={field.value || "none"}
         >
          <FormControl>
           <SelectTrigger>
            <SelectValue placeholder="Selecciona un idioma" />
           </SelectTrigger>
          </FormControl>
          <SelectContent>
           <SelectItem value="none">Sin idioma específico</SelectItem>
           {languages?.map((lang) => (
            <SelectItem key={lang} value={lang}>
             {lang.toUpperCase()}
            </SelectItem>
           ))}
          </SelectContent>
         </Select>
         <FormMessage />
        </FormItem>
       )}
      />

      {error && (
       <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
        {error.message}
       </div>
      )}

      <div className="flex justify-end space-x-2 pt-4">
       <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        disabled={isLoading}
       >
        Cancelar
       </Button>
       <Button type="submit" disabled={isLoading}>
        {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
        {isEditing ? 'Actualizar' : 'Crear'}
       </Button>
      </div>
     </form>
    </Form>
   </DialogContent>
  </Dialog>
 )
}