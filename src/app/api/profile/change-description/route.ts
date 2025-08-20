import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, updateUserDescription } from '@/lib/actions/user.actions';

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

  const { userId, description } = await request.json();

  // Validar que el usuario solo pueda cambiar su propia descripción
  if (user.id !== userId) {
   return NextResponse.json(
    { success: false, message: 'No autorizado para cambiar esta descripción' },
    { status: 403 }
   );
  }

  // Validar que se proporcione una descripción (puede ser vacía)
  if (typeof description !== 'string') {
   return NextResponse.json(
    { success: false, message: 'Descripción inválida' },
    { status: 400 }
   );
  }

  // Validar longitud de la descripción
  const trimmedDescription = description.trim();
  if (trimmedDescription.length > 500) {
   return NextResponse.json(
    { success: false, message: 'La descripción no puede exceder 500 caracteres' },
    { status: 400 }
   );
  }

  // Actualizar la descripción en la base de datos
  const updatedUser = await updateUserDescription(userId, trimmedDescription);

  return NextResponse.json({
   success: true,
   message: 'Descripción actualizada correctamente',
   description: updatedUser.description
  });

 } catch (error) {
  console.error('Error updating user description:', error);
  return NextResponse.json(
   {
    success: false,
    message: error instanceof Error ? error.message : 'Error interno del servidor'
   },
   { status: 500 }
  );
 }
}