import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser, updateUserSocialMedia } from '@/lib/actions/user.actions';

export async function PUT(request: NextRequest) {
 try {
  console.log('🔍 Starting social media update request');

  // Verificar autenticación
  const user = await getCurrentUser();
  if (!user) {
   console.log('❌ User not authenticated');
   return NextResponse.json(
    { success: false, message: 'Usuario no autenticado' },
    { status: 401 }
   );
  }

  console.log('✅ User authenticated:', user.id);

  const body = await request.json();
  console.log('📦 Request body:', JSON.stringify(body, null, 2));

  const { userId, socialMedia } = body;

  // Validar que el usuario solo pueda cambiar sus propias redes sociales
  if (user.id !== userId) {
   console.log('❌ User not authorized:', { userIdFromToken: user.id, userIdFromRequest: userId });
   return NextResponse.json(
    { success: false, message: 'No autorizado para cambiar estas redes sociales' },
    { status: 403 }
   );
  }

  // Validar formato de redes sociales
  if (!Array.isArray(socialMedia)) {
   console.log('❌ socialMedia is not an array:', typeof socialMedia, socialMedia);
   return NextResponse.json(
    { success: false, message: 'Formato de redes sociales inválido' },
    { status: 400 }
   );
  }

  console.log('📋 Social media array:', socialMedia);

  // Validar cada red social
  for (let i = 0; i < socialMedia.length; i++) {
   const social = socialMedia[i];
   console.log(`🔍 Validating social media ${i}:`, social);

   if (!social.platform || !social.url || typeof social.platform !== 'string' || typeof social.url !== 'string') {
    console.log('❌ Invalid social media format:', {
     platform: social.platform,
     url: social.url,
     platformType: typeof social.platform,
     urlType: typeof social.url
    });
    return NextResponse.json(
     { success: false, message: `Red social ${i + 1}: Cada red social debe tener plataforma y URL válidas` },
     { status: 400 }
    );
   }

   // Validar que la URL no esté vacía después de trim
   if (!social.url.trim()) {
    console.log('❌ Empty URL after trim for platform:', social.platform);
    return NextResponse.json(
     { success: false, message: `URL vacía para ${social.platform}` },
     { status: 400 }
    );
   }

   // Validar URL básica
   try {
    new URL(social.url.trim());
    console.log('✅ Valid URL for', social.platform, ':', social.url.trim());
   } catch (urlError) {
    console.log('❌ Invalid URL for', social.platform, ':', social.url, 'Error:', urlError);
    return NextResponse.json(
     { success: false, message: `URL inválida para ${social.platform}: ${social.url}` },
     { status: 400 }
    );
   }

   // Validar que no haya plataformas duplicadas
   const duplicatePlatforms = socialMedia.filter(s =>
    s.platform.toLowerCase().trim() === social.platform.toLowerCase().trim()
   );
   if (duplicatePlatforms.length > 1) {
    console.log('❌ Duplicate platform found:', social.platform);
    return NextResponse.json(
     { success: false, message: `Solo puedes tener una cuenta por plataforma (${social.platform})` },
     { status: 400 }
    );
   }
  }

  console.log('✅ All validations passed, updating social media');

  // Actualizar redes sociales en la base de datos
  const updatedUser = await updateUserSocialMedia(userId, socialMedia);

  console.log('✅ Social media updated successfully');

  return NextResponse.json({
   success: true,
   message: 'Redes sociales actualizadas correctamente',
   socialMedia: updatedUser?.socialMedia || []
  });

 } catch (error) {
  console.error('💥 Error updating social media:', error);
  return NextResponse.json(
   {
    success: false,
    message: error instanceof Error ? error.message : 'Error interno del servidor'
   },
   { status: 500 }
  );
 }
}