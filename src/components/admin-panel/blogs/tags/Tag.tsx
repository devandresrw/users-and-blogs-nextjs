'use client'

import { Edit, Trash2, Hash, FileText, Globe } from 'lucide-react'

interface TagProps {
  tag: {
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
  onEdit: () => void
  onDelete: () => void
}

// Mapeo de códigos de idioma a nombres legibles
const languageNames: Record<string, string> = {
  'es': 'ES',
  'en': 'EN'
}

export function Tag({ tag, onEdit, onDelete }: TagProps) {
  const blogCount = tag._count?.blogs || tag.blogs?.length || 0

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center space-x-2">
          <Hash className="w-4 h-4 text-blue-500" />
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {tag.name}
          </h3>
        </div>
        
        <div className="flex space-x-1">
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
            title="Editar tag"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
            title="Eliminar tag"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slug */}
      <div className="mb-3">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-mono bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
          /{tag.slug}
        </span>
      </div>

      {/* Descripción */}
      {tag.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
          {tag.description}
        </p>
      )}

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-1">
          <Globe className="w-3 h-3" />
          <span className="font-medium">
            {languageNames[tag.baseLanguage] || tag.baseLanguage.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <FileText className="w-3 h-3" />
          <span>{blogCount} blog{blogCount !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  )
}