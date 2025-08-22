import { WrapperTags } from '@/components/admin-panel/blogs/tags/WrapperTags'
import { getAllTags, getAvailableTagLanguages } from '@/lib/actions/tags.actions'

export default async function TagsPage() {
  const [tagsResult, languagesResult] = await Promise.all([
    getAllTags(true),
    getAvailableTagLanguages()
  ])

  const tags = tagsResult.success ? tagsResult.data : []
  const fetchedLanguages = languagesResult.success ? languagesResult.data : []
  
  // Asegurar que siempre tengamos español e inglés disponibles
  const defaultLanguages = ['es', 'en']
  const availableLanguages = Array.from(new Set([...defaultLanguages, ...fetchedLanguages]))

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Gestión de Tags
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Administra las etiquetas para categorizar tus blogs en español e inglés
        </p>
      </div>
      
      <WrapperTags 
        initialTags={tags}
        availableLanguages={availableLanguages}
      />
    </div>
  )
}