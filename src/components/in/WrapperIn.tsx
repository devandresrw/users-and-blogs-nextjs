import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormLogin } from '@/components/in/FormLogin'
import { FormRegister } from '@/components/in/FormRegister'
import clsx from 'clsx'


export const WrapperIn = ({ params, dict }: { params: { lang: 'en' | 'es' }, dict: any }) => {
  const { lang } = params
  return (
    <div className="bg-[#131708] flex justify-center items-center min-h-screen text-white">
      <div className='border-white/60 rounded border w-[20rem] h-[25rem]
   p-4 bg-[#0E0D26] flex fle-col justify-center items-center'>
        <Tabs defaultValue="account" className="w-full">
          <TabsList className='w-full flex justify-between bg-[#0E0D26]
     h-[2.5rem] gap-2 border-white/60 border-2 -mt-24'>
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
          <div className="">
            <TabsContent value="account"><FormLogin params={params} dict={dict} /></TabsContent>
            <TabsContent value="password"><FormRegister params={params} dict={dict} /></TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}