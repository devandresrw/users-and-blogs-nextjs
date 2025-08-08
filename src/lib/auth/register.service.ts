'use server'
import prismaService from "@/lib/config/prisma.service";
import { hash } from "bcryptjs";
import { sendVerificationEmail } from "@/lib/email/verify-email.service";
import { createVerificationToken } from "@/lib/tokens/verification-email.service";

export async function registerUser({ email, password }: { email: string; password: string }) {
 try {
  // Verifica si el usuario ya existe
  const existingUser = await prismaService.prisma.user.findUnique({ where: { email } });
  if (existingUser) {
   throw new Error("El usuario ya existe");
  }

  // Hashea la contraseña con bcryptjs
  const hashedPassword = await hash(password, 12);

  // Crea el usuario
  const user = await prismaService.prisma.user.create({
   data: {
    email,
    password: hashedPassword,
    isActive: false,
    role: "USER",
   },
  });

  // Generar token de verificación
  const token = await createVerificationToken(user.id);

  // Enviar email de verificación
  await sendVerificationEmail(email, token);

  // Retorna el usuario sin la contraseña
  return {
   id: user.id,
   email: user.email,
   role: user.role,
   isActive: user.isActive,
  };
 } catch (error) {
  console.error('Error en registerUser:', error);
  throw error;
 }
}