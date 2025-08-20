import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, updateUserName } from '@/lib/actions/user.actions';

export async function PUT(request: NextRequest) {
 try {
  // Verificar autenticación
  const user = await getCurrentUser();
  if (!user) {
   return NextResponse.json(
    { success: false, message: 'Usuario no autenticado' },
    { status: 401 }
   );
  }

  const { userId, newName } = await request.json();

  // Validar que el usuario solo pueda cambiar su propio nombre
  if (user.id !== userId) {
   return NextResponse.json(
    { success: false, message: 'No autorizado para cambiar este nombre' },
    { status: 403 }
   );
  }

  // Validar que se proporcione un nombre
  if (!newName || typeof newName !== 'string') {
   return NextResponse.json(
    { success: false, message: 'Nombre requerido' },
    { status: 400 }
   );
  }

  // Validar longitud del nombre
  const trimmedName = newName.trim();
  if (trimmedName.length < 2 || trimmedName.length > 50) {
   return NextResponse.json(
    { success: false, message: 'El nombre debe tener entre 2 y 50 caracteres' },
    { status: 400 }
   );
  }

  // Validar que el nombre no sea solo espacios
  if (!trimmedName) {
   return NextResponse.json(
    { success: false, message: 'El nombre no puede estar vacío' },
    { status: 400 }
   );
  }

  // Actualizar el nombre en la base de datos
  const updatedUser = await updateUserName(userId, trimmedName);

  return NextResponse.json({
   success: true,
   message: 'Nombre actualizado correctamente',
   newName: updatedUser.name
  });

 } catch (error) {
  console.error('Error updating user name:', error);
  return NextResponse.json(
   {
    success: false,
    message: error instanceof Error ? error.message : 'Error interno del servidor'
   },
   { status: 500 }
  );
 }
}