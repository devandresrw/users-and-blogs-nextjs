'use client'

import { useState, useEffect } from 'react'
import { X, Save, Hash, Globe, FileText } from 'lucide-react'
import { createTag, updateTag } from '@/lib/actions/tags.actions'
import { toast } from 'sonner'

interface TagFormProps {
  tag?: {
    id: string
    name: string
    slug: string
    description?: string | null
    baseLanguage: string
  }
  onSuccess: () => void
  onCancel: () => void
  availableLanguages: string[]
}

// Mapeo de códigos de idioma a nombres legibles
const languageNames: Record<string, string> = {
  'es': 'Español',
  'en': 'English'
}

export function TagForm({ tag, onSuccess, onCancel, availableLanguages }: TagFormProps) {
  const [formData, setFormData] = useState({
    name: tag?.name || '',
    slug: tag?.slug || '',
    description: tag?.description || '',
    baseLanguage: tag?.baseLanguage || 'es' // Por defecto español
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const isEditing = !!tag

  // Asegurar que siempre tengamos español e inglés disponibles
  const supportedLanguages = ['es', 'en']
  const languageOptions = supportedLanguages.filter(lang => 
    availableLanguages.includes(lang) || lang === 'es' || lang === 'en'
  )

  // Generar slug automáticamente basado en el nombre
  useEffect(() => {
    if (!isEditing && formData.name) {
      const slug = formData.name
        .toLowerCase()
        .normalize('NFD') // Normalizar para separar acentos
        .replace(/[\u0300-\u036f]/g, '') // Remover acentos
        .replace(/[^a-z0-9\s-]/g, '') // Solo letras, números, espacios y guiones
        .replace(/\s+/g, '-') // Espacios a guiones
        .replace(/-+/g, '-') // Múltiples guiones a uno solo
        .trim()
      
      setFormData(prev => ({ ...prev, slug }))
    }
  }, [formData.name, isEditing])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    } else if (formData.name.length > 100) {
      newErrors.name = 'El nombre debe tener máximo 100 caracteres'
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'El slug es requerido'
    } else if (formData.slug.length > 100) {
      newErrors.slug = 'El slug debe tener máximo 100 caracteres'
    } else if (!/^[a-z0-9-]+$/.test(formData.slug)) {
      newErrors.slug = 'El slug solo puede contener letras minúsculas, números y guiones'
    }

    if (!formData.baseLanguage) {
      newErrors.baseLanguage = 'El idioma es requerido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setLoading(true)
    try {
      let result

      if (isEditing) {
        result = await updateTag({
          id: tag!.id,
          ...formData
        })
      } else {
        result = await createTag(formData)
      }

      if (result.success) {
        onSuccess()
      } else {
        toast.error(result.error || 'Error al guardar el tag')
      }
    } catch (error) {
      toast.error('Error inesperado')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isEditing ? 'Editar Tag' : 'Crear Nuevo Tag'}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Idioma - Movido arriba para mejor UX */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Globe className="w-4 h-4 inline mr-1" />
              Idioma
            </label>
            <select
              value={formData.baseLanguage}
              onChange={(e) => handleInputChange('baseLanguage', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.baseLanguage ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              disabled={loading}
            >
              {languageOptions.map((lang) => (
                <option key={lang} value={lang}>
                  {languageNames[lang] || lang.toUpperCase()}
                </option>
              ))}
            </select>
            {errors.baseLanguage && (
              <p className="text-red-500 text-sm mt-1">{errors.baseLanguage}</p>
            )}
          </div>

          {/* Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <Hash className="w-4 h-4 inline mr-1" />
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder={formData.baseLanguage === 'es' ? 'Nombre del tag' : 'Tag name'}
              disabled={loading}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => handleInputChange('slug', e.target.value)}
              className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono ${
                errors.slug ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              }`}
              placeholder="url-slug"
              disabled={loading}
            />
            {errors.slug && (
              <p className="text-red-500 text-sm mt-1">{errors.slug}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              <FileText className="w-4 h-4 inline mr-1" />
              Descripción (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder={formData.baseLanguage === 'es' ? 'Descripción del tag' : 'Tag description'}
              disabled={loading}
            />
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading}
            >
              <Save className="w-4 h-4" />
              <span>{loading ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}