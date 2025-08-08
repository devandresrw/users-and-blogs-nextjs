import CryptoJS from 'crypto-js';
import prismaService from '@/lib/config/prisma.service';

// Función para generar token
function generateToken(): string {
 return CryptoJS.lib.WordArray.random(32).toString();
}

// Función para crear token de verificación
export async function createVerificationToken(userId: string) {
 const token = generateToken();
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

// Función para verificar token
export async function verifyToken(token: string) {
 // Buscar por token usando findFirst
 const verificationToken = await prismaService.prisma.verificationToken.findFirst({
  where: { token },
 });

 if (!verificationToken) {
  throw new Error('Token inválido');
 }

 if (verificationToken.expires < new Date()) {
  // Eliminar token expirado
  await prismaService.prisma.verificationToken.deleteMany({
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
 await prismaService.prisma.verificationToken.deleteMany({
  where: { token },
 });

 return true;
}

// Exportar como clase para compatibilidad
export const VerificationService = {
 createVerificationToken,
 verifyToken
};

// Exportaciones por defecto
export default {
 createVerificationToken,
 verifyToken
};