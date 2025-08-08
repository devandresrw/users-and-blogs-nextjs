'use server'
import CryptoJS from 'crypto-js';
import prismaService from '@/lib/config/prisma.service';

export class VerificationService {
 static generateToken(): string {
  // Generar token aleatorio con crypto-js
  return CryptoJS.lib.WordArray.random(32).toString();
 }

 static async createVerificationToken(userId: string) {
  const token = this.generateToken();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 horas

  await prismaService.prisma.verificationToken.create({
   data: {
    identifier: userId,
    token,
    expires,
   },
  });

  return token;
 }

 static async verifyToken(token: string) {
  const verificationToken = await prismaService.prisma.verificationToken.findUnique({
   where: { token },
  });

  if (!verificationToken) {
   throw new Error('Token inválido');
  }

  if (verificationToken.expires < new Date()) {
   await prismaService.prisma.verificationToken.delete({
    where: { token },
   });
   throw new Error('Token expirado');
  }

  // Activar usuario
  await prismaService.prisma.user.update({
   where: { id: verificationToken.identifier },
   data: { isActive: true },
  });

  // Eliminar token usado
  await prismaService.prisma.verificationToken.delete({
   where: { token },
  });

  return true;
 }
}