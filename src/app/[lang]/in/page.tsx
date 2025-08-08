// src/app/[lang]/in/page.tsx
import type { Dictionary } from '@/types/interfaces/dictionary.interface'
import { WrapperIn } from '@/components/in/WrapperIn'
import { getDictionary } from '@/app/[lang]/dictionaries'

export default async function InPage({ params }: { params: { lang: 'en' | 'es' } }) {
 const dict: Dictionary = await getDictionary(params.lang)
 return <WrapperIn params={params} dict={dict} />
}