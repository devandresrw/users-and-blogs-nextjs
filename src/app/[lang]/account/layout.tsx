import { HeaderWrapper } from '@/components/account/HeaderWrapper'
import { ClientSideHashFix } from '@/components/account/CleanUrl'

export default function AccountLayout({ children }: { children: React.ReactNode }) {
 return (
  <div>
   <HeaderWrapper />
   <main>{children}</main>
   <ClientSideHashFix />
  </div>
 );
}