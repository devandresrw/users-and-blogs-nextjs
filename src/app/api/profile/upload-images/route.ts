import { NextRequest, NextResponse } from 'next/server';
import { uploadProfileImage, deleteImage } from '@/lib/images/cloudinary.service';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { getCurrentUser } from '@/lib/actions/user.actions';
import { updateUserProfileImage } from '@/lib/actions/user.actions'; // Asume que tienes esta función

export async function POST(request: NextRequest) {
 try {
  // Verificar autenticación
  const user = await getCurrentUser();
  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Usuario no autenticado' },
    { status: 401 }
   );
  }

  const formData = await request.formData();
  const file = formData.get('image') as File;
  const userId = formData.get('userId') as string;

  // Validar que el usuario solo pueda cambiar su propia imagen
  if (user.id !== userId) {
   return NextResponse.json(
    { success: false, message: 'No autorizado para cambiar esta imagen' },
    { status: 403 }
   );
  }

  if (!file) {
   return NextResponse.json(
    { success: false, message: 'No se encontró ningún archivo' },
    { status: 400 }
   );
  }

  // Validar tipo de archivo
  if (!file.type.startsWith('image/')) {
   return NextResponse.json(
    { success: false, message: 'El archivo debe ser una imagen' },
    { status: 400 }
   );
  }

  // Validar tamaño (ej: máximo 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
   return NextResponse.json(
    { success: false, message: 'La imagen es demasiado grande (máximo 5MB)' },
    { status: 400 }
   );
  }

  // Crear directorio temporal si no existe
  const tempDir = join(process.cwd(), 'tmp');
  if (!existsSync(tempDir)) {
   mkdirSync(tempDir, { recursive: true });
  }

  // Guardar archivo temporalmente
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const tempFilePath = join(tempDir, `temp_${userId}_${Date.now()}.${file.name.split('.').pop()}`);

  await writeFile(tempFilePath, buffer);

  try {
   // Subir a Cloudinary
   const cloudinaryResult = await uploadProfileImage(tempFilePath, userId);

   // Actualizar URL en la base de datos
   await updateUserProfileImage(userId, cloudinaryResult.secure_url);

   // Limpiar archivo temporal
   await unlink(tempFilePath);

   return NextResponse.json({
    success: true,
    imageUrl: cloudinaryResult.secure_url,
    message: 'Imagen de perfil actualizada correctamente'
   });

  } catch (uploadError) {
   // Limpiar archivo temporal en caso de error
   try {
    await unlink(tempFilePath);
   } catch (cleanupError) {
    console.error('Error cleaning up temp file:', cleanupError);
   }

   throw uploadError;
  }

 } catch (error) {
  console.error('Error uploading profile image:', error);
  return NextResponse.json(
   {
    success: false,
    message: error instanceof Error ? error.message : 'Error interno del servidor'
   },
   { status: 500 }
  );
 }
}

export async function DELETE(request: NextRequest) {
 try {
  // Verificar autenticación
  const user = await getCurrentUser();
  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Usuario no autenticado' },
    { status: 401 }
   );
  }

  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!userId) {
   return NextResponse.json(
    { success: false, message: 'ID de usuario requerido' },
    { status: 400 }
   );
  }

  // Validar que el usuario solo pueda eliminar su propia imagen
  if (user.id !== userId) {
   return NextResponse.json(
    { success: false, message: 'No autorizado para eliminar esta imagen' },
    { status: 403 }
   );
  }

  // Eliminar de Cloudinary
  const publicId = `profile_${userId}`;
  await deleteImage(publicId);

  // Actualizar base de datos (establecer imagen como null o imagen por defecto)
  await updateUserProfileImage(userId, null);

  return NextResponse.json({
   success: true,
   message: 'Imagen de perfil eliminada correctamente'
  });

 } catch (error) {
  console.error('Error deleting profile image:', error);
  return NextResponse.json(
   {
    success: false,
    message: error instanceof Error ? error.message : 'Error interno del servidor'
   },
   { status: 500 }
  );
 }
}