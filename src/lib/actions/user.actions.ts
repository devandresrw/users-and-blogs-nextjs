'use server'

import { auth } from "@/auth";
import prismaService from "@/lib/config/prisma.service";

export async function getCurrentUser() {
 try {
  const session = await auth();

  if (!session?.user?.email) {
   return null;
  }

  // Obtener datos actualizados de la base de datos
  const user = await prismaService.prisma.user.findUnique({
   where: { email: session.user.email },
   select: {
    id: true,
    name: true,
    email: true,
    image: true,
    cloudinaryImageId: true,
    emailVerified: true,
    role: true,
    isActive: true,
   }
  });

  return user;
 } catch (error) {
  console.error('Error getting current user:', error);
  return null;
 }
}