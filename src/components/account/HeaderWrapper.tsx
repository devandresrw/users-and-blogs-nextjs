import { getCurrentUser } from "@/lib/actions/user.actions";
import { HeaderAccount } from "./Header";

export async function HeaderWrapper() {
 const user = await getCurrentUser();

 if (!user) {
  return null; // O componente de login
 }

 return (
  <HeaderAccount
   userName={user.name || "Usuario"}
   userImage={user.image || undefined}
  />
 );
}