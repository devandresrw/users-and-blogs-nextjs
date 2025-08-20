interface ChangeNameResponse {
 success: boolean;
 message?: string;
 newName?: string;
}

export const changeUserName = async (userId: string, newName: string): Promise<ChangeNameResponse> => {
 try {
  const response = await fetch('/api/profile/change-name', {
   method: 'PUT',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    userId,
    newName: newName.trim()
   }),
  });

  if (!response.ok) {
   throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
 } catch (error) {
  console.error('Error changing user name:', error);
  return {
   success: false,
   message: error instanceof Error ? error.message : 'Error desconocido al cambiar el nombre'
  };
 }
};