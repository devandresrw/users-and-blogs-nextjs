import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FormLogin } from '@/components/in/FormLogin'
import { FormRegister } from '@/components/in/FormRegister'
import { useTranslation } from 'next-i18next'

export const WrapperIn = () => {
 const { t } = useTranslation('common')
 return (
  <div className="bg-black flex justify-center items-center min-h-screen ">
   <Tabs defaultValue="account" className="w-[400px]">
    <TabsList>
     <TabsTrigger value="account">{t('login')}</TabsTrigger>
     <TabsTrigger value="password">{t('register')}</TabsTrigger>
    </TabsList>
    <TabsContent value="account"><FormLogin /></TabsContent>
    <TabsContent value="password"><FormRegister /></TabsContent>
   </Tabs>
  </div>
 )
}