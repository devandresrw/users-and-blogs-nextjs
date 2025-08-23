import cloudinary from "@/lib/config/cloudinary.config";

const CLOUDINARY_FOLDER = process.env.CLOUDINARY_FOLDER;

export const uploadImage = async (filePath: string, options: Record<string, any> = {}) => {
 return cloudinary.uploader.upload(filePath, {
  folder: CLOUDINARY_FOLDER,
  ...options,
 });
};

export const uploadProfileImage = async (filePath: string, userId: string, options: Record<string, any> = {}) => {
 return cloudinary.uploader.upload(filePath, {
  folder: `${CLOUDINARY_FOLDER}/profiles`,
  public_id: `profile_${userId}`,
  overwrite: true, // Sobrescribir si existe
  transformation: [
   { width: 400, height: 400, crop: 'fill', gravity: 'face' },
   { quality: 'auto', fetch_format: 'auto' }
  ],
  ...options,
 });
};

// Nueva función para subir imágenes de autores
export const uploadAuthorImage = async (filePath: string, authorName: string, options: Record<string, any> = {}) => {
 // Crear un public_id limpio basado en el nombre del autor
 const cleanAuthorName = authorName
  .toLowerCase()
  .replace(/[^a-z0-9]/g, '_')
  .replace(/_+/g, '_')
  .replace(/^_|_$/g, '');

 const timestamp = Date.now();
 const publicId = `author_${cleanAuthorName}_${timestamp}`;

 return cloudinary.uploader.upload(filePath, {
  folder: `${CLOUDINARY_FOLDER}/authors`,
  public_id: publicId,
  overwrite: true,
  transformation: [
   { width: 400, height: 400, crop: 'fill', gravity: 'face' },
   { quality: 'auto', fetch_format: 'auto' }
  ],
  ...options,
 });
};

// Función para actualizar imagen de autor
export const updateAuthorImage = async (
 filePath: string,
 authorName: string,
 oldPublicId?: string,
 options: Record<string, any> = {}
) => {
 // Si existe una imagen anterior, eliminarla
 if (oldPublicId) {
  try {
   await deleteImage(oldPublicId);
  } catch (error) {
   console.warn('Error deleting old author image:', error);
  }
 }

 // Subir la nueva imagen
 return uploadAuthorImage(filePath, authorName, options);
};

export const deleteImage = async (publicId: string) => {
 return cloudinary.uploader.destroy(publicId);
};

export const updateImage = async (publicId: string, filePath: string, options: Record<string, any> = {}) => {
 // Eliminar la imagen anterior
 await deleteImage(publicId);
 // Subir la nueva imagen
 return uploadImage(filePath, options);
};

export const getImageUrl = (publicId: string, options: Record<string, any> = {}) => {
 return cloudinary.url(publicId, {
  secure: true,
  ...options,
 });
};

// Función para obtener la URL optimizada de imagen de autor
export const getAuthorImageUrl = (publicId: string, options: Record<string, any> = {}) => {
 return cloudinary.url(publicId, {
  secure: true,
  transformation: [
   { width: 400, height: 400, crop: 'fill', gravity: 'face' },
   { quality: 'auto', fetch_format: 'auto' }
  ],
  ...options,
 });
};