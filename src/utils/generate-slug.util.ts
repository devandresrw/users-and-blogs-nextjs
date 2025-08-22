// utils/slugify.ts

export function slugify(text: string): string {
 return text
  .toString()
  .normalize("NFD") // separa acentos de las letras
  .replace(/[\u0300-\u036f]/g, "") // elimina los acentos
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9\s-]/g, "") // elimina caracteres no válidos
  .replace(/\s+/g, "-") // reemplaza espacios por guiones
  .replace(/-+/g, "-"); // elimina guiones múltiples
}
