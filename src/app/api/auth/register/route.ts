import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth/register.service';
import axios from 'axios';

export async function POST(request: NextRequest) {
 try {
  const { email, password, confirmPassword, recaptchaToken } = await request.json();

  // Validar campos requeridos
  if (!email || !password || !confirmPassword) {
   return NextResponse.json(
    { message: 'Todos los campos son requeridos' },
    { status: 400 }
   );
  }

  // Validar que las contraseñas coincidan
  if (password !== confirmPassword) {
   return NextResponse.json(
    { message: 'Las contraseñas no coinciden' },
    { status: 400 }
   );
  }

  // Validar reCAPTCHA solo en producción
  if (process.env.NODE_ENV === 'production') {
   if (!recaptchaToken) {
    return NextResponse.json(
     { message: 'Token de reCAPTCHA requerido' },
     { status: 400 }
    );
   }

   try {
    // Usar axios para verificar reCAPTCHA (consistente con api.service.ts)
    const recaptchaResponse = await axios.post(
     'https://www.google.com/recaptcha/api/siteverify',
     `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
     {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 5000 // 5 segundos de timeout
     }
    );

    const recaptchaData = recaptchaResponse.data;

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
     return NextResponse.json(
      { message: 'Falló la verificación de reCAPTCHA. Intenta nuevamente.' },
      { status: 400 }
     );
    }
   } catch (recaptchaError: any) {
    console.error('Error verificando reCAPTCHA:', recaptchaError);

    // Manejar timeout específicamente
    if (recaptchaError.code === 'ECONNABORTED' || recaptchaError.message?.includes('timeout')) {
     return NextResponse.json(
      { message: 'Timeout al verificar reCAPTCHA. Intenta nuevamente.' },
      { status: 408 }
     );
    }

    return NextResponse.json(
     { message: 'Error al verificar reCAPTCHA. Intenta nuevamente.' },
     { status: 500 }
    );
   }
  } else {
   // En desarrollo, solo loguear
   console.log('⚠️ reCAPTCHA omitido en desarrollo');
  }

  // Registrar usuario
  const user = await registerUser({ email, password });

  return NextResponse.json(
   {
    message: 'Usuario registrado exitosamente. Te hemos enviado un email de verificación.',
    user: {
     id: user.id,
     email: user.email,
     isActive: user.isActive
    }
   },
   { status: 201 }
  );

 } catch (error: any) {
  console.error('Error en registro:', error);

  // Errores específicos
  if (error.message === 'El usuario ya existe') {
   return NextResponse.json(
    { message: 'Ya existe una cuenta con este email' },
    { status: 409 }
   );
  }

  if (error.message?.includes('Invalid email')) {
   return NextResponse.json(
    { message: 'Email inválido' },
    { status: 400 }
   );
  }

  return NextResponse.json(
   { message: 'Error interno del servidor. Intenta nuevamente.' },
   { status: 500 }
  );
 }
}