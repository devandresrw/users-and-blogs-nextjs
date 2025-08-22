'use client'

import { useState, useEffect } from 'react'
import { Plus, Search, Filter, Languages } from 'lucide-react'
import { TagsList } from '@/components/admin-panel/blogs/tags/TagList'
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
    try {
      const result = await getAllTags(true)
      if (result.success) {
        setTags(result.data)
      } else {
        toast.error('Error al cargar las tags')
      }
    } catch (error) {
      toast.error('Error al cargar las tags')
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

  return (
    <div className="space-y-6">
      {/* Header con botón crear */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
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
          disabled={loading}
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
      {showCreateForm && (
        <TagForm
          onSuccess={handleTagCreated}
          onCancel={() => setShowCreateForm(false)}
          availableLanguages={availableLanguages}
        />
      )}

      {editingTag && (
        <TagForm
          tag={editingTag}
          onSuccess={handleTagUpdated}
          onCancel={() => setEditingTag(null)}
          availableLanguages={availableLanguages}
        />
      )}

      {deletingTag && (
        <DeleteTagModal
          tag={deletingTag}
          onSuccess={handleTagDeleted}
          onCancel={() => setDeletingTag(null)}
        />
      )}
    </div>
  )
}