import { WrapperCategories } from '@/components/admin-panel/blogs/categories/WrapperCategories'

interface CategoriesPageProps {
 params: {
  lang: string
 }
}

export default function CategoriesPage({ params }: CategoriesPageProps) {
 return (
  <div className="container mx-auto py-6">
   <WrapperCategories language={params.lang} />
  </div>
 )
}