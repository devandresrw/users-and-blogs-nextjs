interface ChangeDescriptionResponse {
 success: boolean;
 message?: string;
 description?: string;
}

export const changeUserDescription = async (userId: string, description: string): Promise<ChangeDescriptionResponse> => {
 try {
  const response = await fetch('/api/profile/change-description', {
   method: 'PUT',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    userId,
    description: description.trim()
   }),
  });

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 } catch (error) {
  console.error('Error changing user description:', error);
  return {
   success: false,
   message: error instanceof Error ? error.message : 'Error desconocido al cambiar la descripción'
  };
 }
};