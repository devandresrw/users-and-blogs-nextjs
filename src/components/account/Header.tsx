
import Link from "next/link";
import { signOut } from "next-auth/react";

type HeaderProps = {
 userName: string;
 userImage?: string;
};

export const HeaderAccount = ({ userName, userImage }: HeaderProps) => {
 return (
  <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem" }}>
   <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <img
     src="/logo.png"
     alt="Logo"
     style={{ width: 40, height: 40, borderRadius: "50%" }}
    />
    <span>{userName}</span>
    <img
     src={userImage || "/profile-icon.png"}
     alt="Profile"
     style={{ width: 32, height: 32, borderRadius: "50%" }}
    />
   </div>
   <nav>
    <ul style={{ display: "flex", listStyle: "none", gap: "1rem", margin: 0 }}>
     <li>
      <button onClick={() => signOut()}>Cerrar sesión</button>
     </li>
    </ul>
   </nav>
  </header>
 );
}