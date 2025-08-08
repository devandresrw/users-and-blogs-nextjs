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
   authorization: {
    params: {
     prompt: "consent",
     access_type: "offline",
     response_type: "code"
    }
   }
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
    if (!credentials?.email || !credentials?.password) return null;
    try {
     const user = await prismaService.prisma.user.findUnique({
      where: { email: credentials.email as string },
     });
     if (!user || !user.password) return null;
     if (!user.isActive) throw new Error('Cuenta no verificada. Revisa tu email.');
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
  maxAge: 30 * 24 * 60 * 60,
 },
 callbacks: {
  async signIn({ user, account }) {
   if (account?.provider === 'google' || account?.provider === 'facebook') {
    try {
     const prisma = prismaService.prisma;
     const existingUser = await prisma.user.findUnique({
      where: { email: user.email! },
      include: { accounts: true },
     });

     if (existingUser) {
      const providerLinked = existingUser.accounts.some(
       (acc) =>
        acc.provider === account.provider &&
        acc.providerAccountId === account.providerAccountId
      );

      if (!providerLinked) {
       await prisma.account.create({
        data: {
         userId: existingUser.id,
         type: account.type,
         provider: account.provider,
         providerAccountId: account.providerAccountId,
         access_token: account.access_token,
         refresh_token: account.refresh_token,
         expires_at: typeof account.expires_at === "number" ? account.expires_at : undefined,
         token_type: account.token_type,
         scope: account.scope,
         id_token: account.id_token,
         session_state: account.session_state ? String(account.session_state) : undefined,
        },
       });
      }

      await prisma.user.update({
       where: { id: existingUser.id },
       data: {
        name: user.name || existingUser.name,
        image: user.image || existingUser.image,
        isActive: true,
        emailVerified: new Date(),
       },
      });

      user.role = existingUser.role;
     } else {
      user.role = "USER";
     }
    } catch (error) {
     console.error('Error en signIn callback:', error);
     return false;
    }
   }
   return true;
  },
  async jwt({ token, user }) {
   // Guardar el rol en el token JWT
   if (user && user.role) {
    token.role = user.role;
   }
   return token;
  },
  async session({ session, token }) {
   // Pasar el rol del token a la sesión
   if (session.user && token.role) session.user.role = token.role;
   return session;
  },
 },
 pages: {
  signIn: '/es/in',
  error: '/es/in',
 },
});