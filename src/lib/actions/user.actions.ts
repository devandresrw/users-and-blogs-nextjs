'use server'
import { auth } from "@/auth";
import prismaService from "@/lib/config/prisma.service";

export async function getCurrentUser() {
 try {
  const session = await auth();

  if (!session?.user?.email) {
   return null;
  }

  // Obtener datos actualizados de la base de datos
  const user = await prismaService.prisma.user.findUnique({
   where: { email: session.user.email },
   select: {
    id: true,
    name: true,
    email: true,
    image: true,
    description: true,
    interests: true,
    cloudinaryImageId: true,
    emailVerified: true,
    role: true,
    isActive: true,
    socialMedia: {
     where: { isActive: true },
     orderBy: { createdAt: 'asc' }
    }
   }
  });

  return user;
 } catch (error) {
  console.error('Error getting current user:', error);
  return null;
 }
}

export async function updateUserProfileImage(userId: string, imageUrl: string | null) {
 try {
  const updatedUser = await prismaService.prisma.user.update({
   where: { id: userId },
   data: { image: imageUrl },
  });

  return updatedUser;
 } catch (error) {
  console.error('Error updating user profile image:', error);
  throw new Error('Failed to update profile image');
 }
}

export async function updateUserName(userId: string, newName: string) {
 try {
  const updatedUser = await prismaService.prisma.user.update({
   where: { id: userId },
   data: { name: newName },
   select: {
    id: true,
    name: true,
    email: true,
    image: true,
   }
  });

  return updatedUser;
 } catch (error) {
  console.error('Error updating user name:', error);
  throw new Error('Failed to update user name');
 }
}

export async function updateUserDescription(userId: string, description: string) {
 try {
  const updatedUser = await prismaService.prisma.user.update({
   where: { id: userId },
   data: { description: description || null },
   select: {
    id: true,
    name: true,
    email: true,
    description: true,
   }
  });

  return updatedUser;
 } catch (error) {
  console.error('Error updating user description:', error);
  throw new Error('Failed to update user description');
 }
}

export async function updateUserSocialMedia(userId: string, socialMediaData: any[]) {
 try {
  console.log('🔧 Action: Updating social media for user:', userId, socialMediaData);

  // Eliminar todas las redes sociales existentes del usuario
  const deleteResult = await prismaService.prisma.socialMedia.deleteMany({
   where: { userId }
  });

  console.log('🗑️ Action: Deleted existing social media:', deleteResult.count);

  // Crear las nuevas redes sociales si hay datos
  if (socialMediaData.length > 0) {
   const createData = socialMediaData.map(social => ({
    platform: social.platform.trim(),
    url: social.url.trim(),
    username: social.username?.trim() || null,
    userId: userId
   }));

   console.log('📝 Action: Creating new social media:', createData);

   await prismaService.prisma.socialMedia.createMany({
    data: createData
   });
  }

  // Obtener el usuario actualizado con sus redes sociales
  const updatedUser = await prismaService.prisma.user.findUnique({
   where: { id: userId },
   select: {
    id: true,
    name: true,
    email: true,
    socialMedia: {
     where: { isActive: true },
     orderBy: { createdAt: 'asc' }
    }
   }
  });

  console.log('✅ Action: User updated successfully:', updatedUser?.socialMedia);

  return updatedUser;
 } catch (error) {
  console.error('💥 Action: Error updating user social media:', error);
  throw new Error('Failed to update user social media');
 }
}
