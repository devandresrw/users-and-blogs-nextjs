interface SocialMedia {
 platform: string;
 url: string;
 username?: string;
}

interface ChangeSocialResponse {
 success: boolean;
 message?: string;
 socialMedia?: any[];
}

export const updateUserSocialMedia = async (userId: string, socialMedia: SocialMedia[]): Promise<ChangeSocialResponse> => {
 try {
  console.log('🚀 Service: Sending social media update request', { userId, socialMedia });

  const response = await fetch('/api/profile/change-or-add-social', {
   method: 'PUT',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    userId,
    socialMedia
   }),
  });

  console.log('📡 Service: Response status:', response.status);

  if (!response.ok) {
   const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
   console.error('❌ Service: HTTP error:', response.status, errorData);
   throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
  }

  const data = await response.json();
  console.log('✅ Service: Success response:', data);
  return data;
 } catch (error) {
  console.error('💥 Service: Error updating social media:', error);
  return {
   success: false,
   message: error instanceof Error ? error.message : 'Error desconocido al actualizar redes sociales'
  };
 }
};