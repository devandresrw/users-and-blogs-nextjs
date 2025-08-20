interface UploadProfileImageResponse {
 success: boolean;
 imageUrl?: string;
 message?: string;
}

export const deleteProfileImage = async (userId: string): Promise<{ success: boolean; message?: string }> => {
 try {
  const response = await fetch(`/api/profile/upload-images?userId=${userId}`, {
   method: 'DELETE',
  });

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 } catch (error) {
  console.error('Error deleting profile image:', error);
  return {
   success: false,
   message: error instanceof Error ? error.message : 'Error desconocido al eliminar la imagen'
  };
 }
};

export const uploadProfileImage = async (file: File, userId: string): Promise<UploadProfileImageResponse> => {
 try {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('userId', userId);

  const response = await fetch('/api/profile/upload-images', {
   method: 'POST',
   body: formData,
  });

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 } catch (error) {
  console.error('Error uploading profile image:', error);
  return {
   success: false,
   message: error instanceof Error ? error.message : 'Error desconocido al subir la imagen'
  };
 }
};