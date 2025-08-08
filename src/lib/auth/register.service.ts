'use server'
import prismaService from "@/lib/config/prisma.service";
import { hash } from "argon2";
import { EmailService } from "@/lib/email/verify-email.service";
import { VerificationService } from "@/lib/tokens/verification-email.service";

export async function registerUser({ email, password }: { email: string; password: string }) {
 // Verifica si el usuario ya existe
 const existingUser = await prismaService.prisma.user.findUnique({ where: { email } });
 if (existingUser) {
  throw new Error("El usuario ya existe");
 }

 // Hashea la contraseña con Argon2
 const hashedPassword = await hash(password);

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
 const token = await VerificationService.createVerificationToken(user.id);

 // Enviar email de verificación
 await EmailService.sendVerificationEmail(email, token);

 // Retorna el usuario sin la contraseña
 return {
  id: user.id,
  email: user.email,
  role: user.role,
  isActive: user.isActive,
 };
}