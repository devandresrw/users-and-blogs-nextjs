import SideBar from "@/components/admin-panel/SideBar";
import { HeaderAccount } from "@/components/account/Header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
 // Puedes obtener estos datos del contexto, props o mockearlos aquí para pruebas
 const userName = "Admin";
 const userImage = "/profile-icon.png";
 const userRole = "ADMINISTRADOR";

 return (
  <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
   <HeaderAccount userName={userName} userImage={userImage} userRole={userRole} />
   <div style={{ display: "flex", flex: 1 }}>
    <SideBar />
    <main style={{ flex: 1, padding: 24 }}>{children}</main>
   </div>
  </div>
 );
}