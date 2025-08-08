import { NextRequest, NextResponse } from 'next/server';
import { VerificationService } from '@/lib/tokens/verification-email.service';

export async function POST(request: NextRequest) {
 try {
  const { token } = await request.json();

  if (!token) {
   return NextResponse.json(
    { message: 'Token requerido' },
    { status: 400 }
   );
  }

  await VerificationService.verifyToken(token);

  return NextResponse.json(
   { message: 'Cuenta verificada exitosamente' },
   { status: 200 }
  );
 } catch (error: any) {
  return NextResponse.json(
   { message: error.message || 'Error interno del servidor' },
   { status: 400 }
  );
 }
}