'use client'

import { Edit, Trash2, Hash, FileText, Globe } from 'lucide-react'
import { Tag } from './Tag'

interface TagsListProps {
  tags: Array<{
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
  }>
  onEdit: (tag: any) => void
  onDelete: (tag: any) => void
  loading: boolean
}

export function TagsList({ tags, onEdit, onDelete, loading }: TagsListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
          </div>
        ))}
      </div>
    )
  }

  if (tags.length === 0) {
    return (
      <div className="text-center py-12">
        <Hash className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No se encontraron tags
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Crea tu primer tag o ajusta los filtros de búsqueda
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tags.map((tag) => (
        <Tag
          key={tag.id}
          tag={tag}
          onEdit={() => onEdit(tag)}
          onDelete={() => onDelete(tag)}
        />
      ))}
    </div>
  )
}