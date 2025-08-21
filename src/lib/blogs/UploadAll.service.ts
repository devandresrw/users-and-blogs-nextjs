import { importBlogsAndNews } from "../actions/blogs.actions";

export async function uploadAllBlogsService(data: any) {
 // Aquí puedes validar el JSON si lo deseas
 return await importBlogsAndNews(data);
}