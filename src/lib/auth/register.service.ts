import { hash } from 'bcryptjs';
import prismaService from '@/lib/config/prisma.service';
import { sendVerificationEmail } from '@/lib/email/verify-email.service';
import { uploadProfileImage } from '@/lib/images/cloudinary.service';

interface RegisterUserData {
 email: string;
 password: string;
 name?: string;
 imageFile?: string; // Base64 string de la imagen
}

export async function registerUser({
 email,
 password,
 name,
 imageFile
}: RegisterUserData) {
 try {
  // Verificar si el usuario ya existe
  const existingUser = await prismaService.prisma.user.findUnique({
   where: { email }
  });

  if (existingUser) {
   throw new Error('El usuario ya existe');
  }

  // Hashear la contraseña
  const hashedPassword = await hash(password, 12);

  // Crear el usuario primero sin imagen
  const user = await prismaService.prisma.user.create({
   data: {
    email,
    password: hashedPassword,
    name: name || email.split('@')[0],
    provider: 'credentials',
    isActive: false,
    role: 'USER',
   },
   select: {
    id: true,
    email: true,
    name: true,
    isActive: true,
    createdAt: true,
   }
  });

  // Si hay imagen, subirla a Cloudinary y actualizar usuario
  let imageUrl = null;
  let cloudinaryImageId = null;

  if (imageFile) {
   try {
    const uploadResult = await uploadProfileImage(imageFile, user.id);
    imageUrl = uploadResult.secure_url;
    cloudinaryImageId = uploadResult.public_id;

    // Actualizar usuario con la imagen
    await prismaService.prisma.user.update({
     where: { id: user.id },
     data: {
      image: imageUrl,
      cloudinaryImageId
     }
    });

    console.log('✅ Imagen de perfil subida:', cloudinaryImageId);
   } catch (imageError) {
    console.error('Error subiendo imagen de perfil:', imageError);
    // No fallar el registro por un error de imagen
   }
  }

  // Enviar email de verificación
  try {
   await sendVerificationEmail(user.email, user.name || 'Usuario');
  } catch (emailError) {
   console.error('Error enviando email:', emailError);

   if (process.env.NODE_ENV === 'development') {
    console.log('⚠️ Email falló en desarrollo, continuando...');
   } else {
    throw new Error('Error enviando email de verificación');
   }
  }

  return {
   ...user,
   image: imageUrl,
   cloudinaryImageId
  };
 } catch (error) {
  console.error('Error en registerUser:', error);
  throw error;
 }
}