import { NextRequest, NextResponse } from 'next/server';
import { registerUser } from '@/lib/auth/register.service';
import axios from 'axios';

export async function POST(request: NextRequest) {
 try {
  // Verificar si es FormData (para archivos) o JSON
  const contentType = request.headers.get('content-type');

  let bodyData: any = {};
  let imageFile: string | null = null;

  if (contentType?.includes('multipart/form-data')) {
   // Manejar FormData para archivos
   const formData = await request.formData();

   bodyData = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirmPassword: formData.get('confirmPassword') as string,
    name: formData.get('name') as string,
    recaptchaToken: formData.get('recaptchaToken') as string,
   };

   const file = formData.get('image') as File;
   if (file && file.size > 0) {
    // Convertir File a base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    imageFile = `data:${file.type};base64,${buffer.toString('base64')}`;
   }
  } else {
   // Manejar JSON normal
   if (!contentType || !contentType.includes('application/json')) {
    return NextResponse.json(
     { message: 'Content-Type debe ser application/json o multipart/form-data' },
     { status: 400 }
    );
   }

   const bodyText = await request.text();
   if (!bodyText || bodyText.trim() === '') {
    return NextResponse.json(
     { message: 'El body de la petición está vacío' },
     { status: 400 }
    );
   }

   try {
    bodyData = JSON.parse(bodyText);
    // Para JSON, la imagen vendría como base64 en el campo image
    imageFile = bodyData.image || null;
   } catch (parseError) {
    console.error('Error parseando JSON:', parseError);
    return NextResponse.json(
     { message: 'JSON inválido en el body de la petición' },
     { status: 400 }
    );
   }
  }

  const { email, password, confirmPassword, name, recaptchaToken } = bodyData;

  // Validar campos requeridos
  if (!email || !password || !confirmPassword) {
   return NextResponse.json(
    { message: 'Email y contraseña son requeridos' },
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
    const recaptchaResponse = await axios.post(
     'https://www.google.com/recaptcha/api/siteverify',
     `secret=${process.env.RECAPTCHA_SECRET}&response=${recaptchaToken}`,
     {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      timeout: 5000
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
    return NextResponse.json(
     { message: 'Error al verificar reCAPTCHA. Intenta nuevamente.' },
     { status: 500 }
    );
   }
  } else {
   console.log('⚠️ reCAPTCHA omitido en desarrollo');
  }

  // Registrar usuario con nombre e imagen
  const user = await registerUser({
   email,
   password,
   name: name || email.split('@')[0],
   imageFile: imageFile || undefined
  });

  return NextResponse.json(
   {
    message: 'Usuario registrado exitosamente. Te hemos enviado un email de verificación.',
    user: {
     id: user.id,
     email: user.email,
     name: user.name,
     image: user.image,
     isActive: user.isActive
    }
   },
   { status: 201 }
  );

 } catch (error: any) {
  console.error('Error en registro:', error);

  if (error.message === 'El usuario ya existe') {
   return NextResponse.json(
    { message: 'Ya existe una cuenta con este email' },
    { status: 409 }
   );
  }

  return NextResponse.json(
   { message: 'Error interno del servidor. Intenta nuevamente.' },
   { status: 500 }
  );
 }
}