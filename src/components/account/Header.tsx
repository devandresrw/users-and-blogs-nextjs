import Link from "next/link";
import Image from "next/image";
import { SignOutButton } from '@/components/account/Logout'
import { AdminNavigation } from '@/components/navigations/AdminNavigation'

type HeaderProps = {
 userName: string;
 userImage?: string;
 userRole?: string;
};

export const HeaderAccount = ({ userName, userImage, userRole }: HeaderProps) => {
 return (
  <header className="flex justify-between items-center p-4 border-b">
   <div className="flex items-center gap-4">
    <Link href="/es">
     <Image
      src="/logo.png"
      alt="Logo"
      width={32}
      height={32}
      className="h-8 w-8 cursor-pointer"
      priority
     />
    </Link>
    <span className="font-medium">{userName}</span>
   </div>

   {/* Navegación principal */}
   <nav className="flex items-center gap-4">
    <Link
     href="/es/account"
     className="text-sm hover:text-primary transition-colors"
    >
     Dashboard
    </Link>

    <Link
     href="/es/account/profile"
     className="text-sm hover:text-primary transition-colors"
    >
     Perfil
    </Link>

    {/* Navegación administrativa condicional */}
    <AdminNavigation userRole={userRole} />
   </nav>

   <div className="flex items-center gap-4">
    <Link href="/es/account/profile">
     <img
      src={userImage || "/profile-icon.png"}
      alt="Profile"
      className="w-8 h-8 rounded-full cursor-pointer hover:ring-2 hover:ring-primary transition-all"
     />
    </Link>
    <SignOutButton />
   </div>
  </header>
 );
}