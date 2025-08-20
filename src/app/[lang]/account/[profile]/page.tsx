import { WrapperProfile } from '@/components/account/profile/WrapperProfile'
import { getCurrentUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'

export default async function ProfilePage() {
 const user = await getCurrentUser()

 if (!user) {
  redirect('/es/in')
 }

 return <WrapperProfile user={user} />
}