/*
Layou principal de la seccion de cuentas 
contiene el header y el limpiador de urls 
*/

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