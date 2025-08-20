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