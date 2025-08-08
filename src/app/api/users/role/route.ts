import { NextResponse } from "next/server";
import prismaService from "@/lib/config/prisma.service";

export async function GET(request: Request) {
 const { searchParams } = new URL(request.url);
 const email = searchParams.get("email");
 if (!email) return NextResponse.json({ error: "Email requerido" }, { status: 400 });

 const user = await prismaService.prisma.user.findUnique({
  where: { email },
  select: { role: true },
 });

 if (!user) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

 return NextResponse.json({ role: user.role });
}