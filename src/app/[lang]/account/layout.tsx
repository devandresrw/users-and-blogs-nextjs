'use client'
import { HeaderAccount } from '@/components/account/Header'
import { useEffect } from 'react'
export default function AccountLayout({ children }: { children: React.ReactNode }) {
 useEffect(() => {
  if (window.location.hash === "#_=_") {
   history.replaceState(null, "", window.location.pathname + window.location.search);
  }
 }, []);
 return (
  <div>
   <HeaderAccount userName="User Name" userImage="/profile-icon.png" />
   <main>{children}</main>
  </div>
 );
}