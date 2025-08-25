/*
Pagina principal de perfil contiene
permite modificar la informacón del usuario
Nombre, correo, info, redes sociales... 

*/
import { WrapperProfile } from '@/components/account/profile/WrapperProfile'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
 const user = await getCurrentUser()

 if (!user) {
  redirect('/es/in')
 }

 const userWithName = {
  ...user,
  name: user.name || user.email || 'Usuario',
  image: user.image || null,
  description: user.description || null,
  interests: user.interests || []
 }

 return <WrapperProfile user={userWithName} />
}