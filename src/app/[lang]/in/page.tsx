import { WrapperIn } from '@/components/in/WrapperIn'
export default function InPage({ params }: { params: { lang: 'en' | 'es' } }) {
 return <WrapperIn params={params} />
}