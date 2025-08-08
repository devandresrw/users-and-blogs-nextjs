import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prismaService from "@/lib/config/prisma.service";
import { compare } from "bcryptjs";

// Extender los tipos de NextAuth para incluir 'role'
declare module "next-auth" {
 interface User {
  role?: string;
 }

 interface Session {
  user: {
   id: string;
   email?: string | null;
   name?: string | null;
   image?: string | null;
   role?: string;
  }
 }
}

declare module "@auth/core/jwt" {
 interface JWT {
  role?: string;
 }
}

export const { auth, handlers } = NextAuth({
 secret: process.env.NEXTAUTH_SECRET,
 adapter: PrismaAdapter(prismaService.prisma),

 providers: [
  GoogleProvider({
   clientId: process.env.GOOGLE_CLIENT_ID!,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }),
  FacebookProvider({
   clientId: process.env.FACEBOOK_CLIENT_ID!,
   clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
  }),
  CredentialsProvider({
   name: "Credentials",
   credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
   },
   async authorize(credentials) {
    if (!credentials?.email || !credentials?.password) {
     return null;
    }

    try {
     // Verificación directa en la base de datos
     const user = await prismaService.prisma.user.findUnique({
      where: { email: credentials.email as string },
     });

     if (!user || !user.password) return null;

     // Verificar si la cuenta está activa
     if (!user.isActive) {
      throw new Error('Cuenta no verificada. Revisa tu email.');
     }

     const isValid = await compare(credentials.password as string, user.password);
     if (!isValid) return null;

     return {
      id: user.id,
      email: user.email,
      name: user.name || user.email,
      role: user.role,
     };
    } catch (error) {
     console.error('Error in authorize:', error);
     return null;
    }
   },
  }),
 ],
 session: {
  strategy: "jwt",
  maxAge: 30 * 24 * 60 * 60, // 30 días
 },
 callbacks: {
  async signIn({ user, account, profile }) {
   // Para proveedores OAuth (Google, Facebook)
   if (account?.provider !== 'credentials') {
    try {
     // Verificar si el usuario ya existe
     const existingUser = await prismaService.prisma.user.findUnique({
      where: { email: user.email! },
     });

     if (existingUser) {
      // Actualizar información del proveedor si es necesario
      await prismaService.prisma.user.update({
       where: { id: existingUser.id },
       data: {
        name: user.name,
        image: user.image,
        provider: account.provider,
        providerId: account.providerAccountId,
        isActive: true, // Los usuarios de OAuth se consideran verificados
       },
      });
      user.role = existingUser.role;
     }
    } catch (error) {
     console.error('Error en signIn callback:', error);
    }
   }
   return true;
  },
  async jwt({ token, user }) {
   if (user?.role) {
    token.role = user.role;
   }
   return token;
  },
  async session({ session, token }) {
   if (session.user && token.role) {
    session.user.role = token.role;
   }
   return session;
  },
 },
 pages: {
  signIn: '/es/in', // Página personalizada de login
  error: '/es/in', // Redirigir errores a login
 },
});