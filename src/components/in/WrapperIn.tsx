import { getDictionary } from '../../app/[lang]/dictionaries'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormLogin } from '@/components/in/FormLogin'
import { FormRegister } from '@/components/in/FormRegister'
import clsx from 'clsx'

export const WrapperIn = async (
 {
  params,
 }: {
  params: { lang: 'en' | 'es' }
 }) => {
 const { lang } = params
 const dict = await getDictionary(lang)
 return (
  <div className="bg-[#131708] flex justify-center items-center min-h-screen text-white">
   <div className='border-white/60 rounded border w-[20rem] h-[20rem]
   p-4 bg-[#0E0D26]'>
    <Tabs defaultValue="account" className="w-full">
     <TabsList className='w-full flex justify-between bg-[#0E0D26]
     h-[2.5rem] gap-2 border-white/60 border-2'>
      <TabsTrigger value="account"
       className={clsx(
        `flex-1 px-2 py-1 text-white/50 rounded 
        capitalize transition-colors`,
        `data-[state=active]:bg-gray-800
         data-[state=active]:text-white`
       )}>{dict.products.login}</TabsTrigger>
      <TabsTrigger value="password"
       className={clsx(
        `flex-1 px-2 py-1 text-white/50 rounded 
        capitalize transition-colors`,
        `data-[state=active]:bg-gray-800
         data-[state=active]:text-white`
       )} >{dict.products.register}</TabsTrigger>
     </TabsList>
     <TabsContent value="account"><FormLogin params={params} /></TabsContent>
     <TabsContent value="password"><FormRegister /></TabsContent>
    </Tabs>
   </div>
  </div>
 )
}