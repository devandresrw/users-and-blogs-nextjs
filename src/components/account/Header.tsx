import Link from "next/link";
import { SignOutButton } from '@/components/account/Logout'
type HeaderProps = {
 userName: string;
 userImage?: string;
};

export const HeaderAccount = ({ userName, userImage }: HeaderProps) => {
 return (

  <header className="flex justify-between">
   <div className="flex justify-between">
    <img
     src="/logo.png"
     alt="Logo"

    />
    <span>{userName}</span>
    <img
     src={userImage || "/profile-icon.png"}
     alt="Profile"
     style={{ width: 32, height: 32, borderRadius: "50%" }}
    />
   </div>
   <nav>
    <SignOutButton />
   </nav>
  </header>
 );
}