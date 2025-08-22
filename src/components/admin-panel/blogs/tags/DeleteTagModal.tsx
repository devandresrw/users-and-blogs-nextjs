'use client'

import { useState } from 'react'
import { X, Trash2, AlertTriangle, Hash, FileText } from 'lucide-react'
import { deleteTag } from '@/lib/actions/tags.actions'
import { toast } from 'sonner'

interface DeleteTagModalProps {
  tag: {
    id: string
    name: string
    slug: string
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
  onSuccess: () => void
  onCancel: () => void
}

export function DeleteTagModal({ tag, onSuccess, onCancel }: DeleteTagModalProps) {
  const [loading, setLoading] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  
  const blogCount = tag._count?.blogs || tag.blogs?.length || 0
  const hasBlogs = blogCount > 0
  const expectedConfirmText = tag.name

  const handleDelete = async () => {
    if (hasBlogs && confirmText !== expectedConfirmText) {
      toast.error(`Debes escribir "${expectedConfirmText}" para confirmar`)
      return
    }

    setLoading(true)
    try {
      const result = await deleteTag(tag.id)
      
      if (result.success) {
        toast.success(result.message || 'Tag eliminado exitosamente')
        onSuccess()
      } else {
        toast.error(result.error || 'Error al eliminar el tag')
      }
    } catch (error) {
      toast.error('Error inesperado al eliminar el tag')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Eliminar Tag
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={loading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Tag info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Hash className="w-4 h-4 text-blue-500" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {tag.name}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({tag.baseLanguage.toUpperCase()})
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              /{tag.slug}
            </p>
            {hasBlogs && (
              <div className="flex items-center space-x-1 mt-2 text-sm text-amber-600 dark:text-amber-400">
                <FileText className="w-4 h-4" />
                <span>Asociado a {blogCount} blog{blogCount !== 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Warning */}
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-4">
            <p className="text-red-800 dark:text-red-200 text-sm">
              <strong>¡Advertencia!</strong> Esta acción no se puede deshacer.
              {hasBlogs && (
                <span className="block mt-1">
                  El tag se desvinculará de todos los blogs asociados.
                </span>
              )}
            </p>
          </div>

          {/* Confirmation input */}
          {hasBlogs && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Para confirmar, escribe el nombre del tag: <strong>{expectedConfirmText}</strong>
              </label>
              <input
                type="text"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder={expectedConfirmText}
                disabled={loading}
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              disabled={loading || (hasBlogs && confirmText !== expectedConfirmText)}
            >
              <Trash2 className="w-4 h-4" />
              <span>{loading ? 'Eliminando...' : 'Eliminar'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}