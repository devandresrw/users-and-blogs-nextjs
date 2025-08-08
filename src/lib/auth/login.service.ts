'use server';
import prismaService from "@/lib/config/prisma.service";
import { compare } from "bcryptjs";

export async function verifyUserCredentials(credentials: any) {
 const user = await prismaService.prisma.user.findUnique({
  where: { email: credentials?.email },
 });

 if (!user || !user.password) return null;

 const isValid = await compare(credentials.password, user.password);
 if (!isValid) return null;

 return {
  id: user.id,
  email: user.email,
  name: user.email,
  role: user.role,
 };
}