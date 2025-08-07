'use client'
import { useRouter } from 'next/navigation'

export default function Home() {
 const router = useRouter()
 return (
  <div className="flex flex-col items-center justify-center min-h-screen">
   <h1>Selecciona tu idioma / Select your language</h1>
   <button onClick={() => router.push('/es/')}>Español</button>
   <button onClick={() => router.push('/en/')}>English</button>
  </div>
 )
}