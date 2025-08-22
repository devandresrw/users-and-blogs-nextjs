'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Languages, AlertCircle, RefreshCw } from 'lucide-react'
import { TagsList } from '@/components/admin-panel/blogs/tags/TagsList' // Cambiar TagList por TagsList
import { TagForm } from '@/components/admin-panel/blogs/tags/TagForm'
import { TagFilters } from '@/components/admin-panel/blogs/tags/TagFilters'
import { DeleteTagModal } from '@/components/admin-panel/blogs/tags/DeleteTagModal'
import { getAllTags } from '@/lib/actions/tags.actions'
import { toast } from 'sonner'

interface Tag {
  id: string
  name: string
  slug: string
  description?: string | null
  baseLanguage: string
  blogs?: {
    blog: {
      id: string
      title: string
      slug: string
      baseLanguage: string
    }
  }[]
  _count?: {
    blogs: number
  }
}

interface WrapperTagsProps {
  initialTags: Tag[]
  availableLanguages: string[]
}

export function WrapperTags({ initialTags, availableLanguages }: WrapperTagsProps) {
  const [tags, setTags] = useState<Tag[]>(initialTags)
  const [filteredTags, setFilteredTags] = useState<Tag[]>(initialTags)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [deletingTag, setDeletingTag] = useState<Tag | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all')
  const [loading, setLoading] = useState(false)
  const [connectionError, setConnectionError] = useState(false)

  // Filtrar tags cuando cambian los filtros
  useEffect(() => {
    let filtered = tags

    // Filtrar por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(tag =>
        tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tag.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Filtrar por idioma
    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(tag => tag.baseLanguage === selectedLanguage)
    }

    setFilteredTags(filtered)
  }, [tags, searchQuery, selectedLanguage])

  const refreshTags = async () => {
    setLoading(true)
    setConnectionError(false)
    try {
      const result = await getAllTags(true)
      if (result.success) {
        // Asegurar que el tipo sea correcto
        const tagsData = result.data || []
        setTags(tagsData as Tag[])
        setConnectionError(false)
      } else {
        if (result.error?.includes('too many clients') || result.error?.includes('connection')) {
          setConnectionError(true)
          toast.error('Problema de conexión. Intenta recargar la página.')
        } else {
          toast.error(result.error || 'Error al cargar las tags')
        }
      }
    } catch (error: any) {
      console.error('Error refreshing tags:', error)
      if (error.message?.includes('too many clients') || error.message?.includes('connection')) {
        setConnectionError(true)
        toast.error('Problema de conexión. Intenta recargar la página.')
      } else {
        toast.error('Error al cargar las tags')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleTagCreated = () => {
    setShowCreateForm(false)
    refreshTags()
    toast.success('Tag creado exitosamente')
  }

  const handleTagUpdated = () => {
    setEditingTag(null)
    refreshTags()
    toast.success('Tag actualizado exitosamente')
  }

  const handleTagDeleted = () => {
    setDeletingTag(null)
    refreshTags()
    toast.success('Tag eliminado exitosamente')
  }

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag)
  }

  const handleDelete = (tag: Tag) => {
    setDeletingTag(tag)
  }

  const handleReload = () => {
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      {/* Error de conexión */}
      {connectionError && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Problema de conexión
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300">
                  Demasiadas conexiones activas. Recarga la página para solucionarlo.
                </p>
              </div>
            </div>
            <button
              onClick={handleReload}
              className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Recargar</span>
            </button>
          </div>
        </div>
      )}

      {/* Header con botón crear */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCreateForm(true)}
            disabled={connectionError}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>Crear Tag</span>
          </button>

          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Languages className="w-4 h-4" />
            <span>Total: {tags.length} tags</span>
            <span>•</span>
            <span>Filtrados: {filteredTags.length}</span>
          </div>
        </div>

        <button
          onClick={refreshTags}
          disabled={loading || connectionError}
          className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
        >
          {loading ? 'Cargando...' : 'Actualizar'}
        </button>
      </div>

      {/* Filtros */}
      <TagFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        availableLanguages={availableLanguages}
      />

      {/* Lista de tags */}
      <TagsList
        tags={filteredTags}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modales */}
      {showCreateForm && !connectionError && (
        <TagForm
          onSuccess={handleTagCreated}
          onCancel={() => setShowCreateForm(false)}
          availableLanguages={availableLanguages}
        />
      )}

      {editingTag && !connectionError && (
        <TagForm
          tag={editingTag}
          onSuccess={handleTagUpdated}
          onCancel={() => setEditingTag(null)}
          availableLanguages={availableLanguages}
        />
      )}

      {deletingTag && !connectionError && (
        <DeleteTagModal
          tag={deletingTag}
          onSuccess={handleTagDeleted}
          onCancel={() => setDeletingTag(null)}
        />
      )}
    </div>
  )
}