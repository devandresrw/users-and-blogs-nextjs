import prismaService from "../config/prisma.service"; '@/lib/config/prisma.service'
export async function importBlogsAndNews(data: any) {
 if (!data.blogs || !Array.isArray(data.blogs)) {
  throw new Error("Formato inválido: falta 'blogs'");
 }
 const results = [];
 for (const blog of data.blogs) {
  // Busca o crea el autor
  let author = null;
  if (blog.author) {
   author = await prismaService.prisma.author.upsert({
    where: { name: blog.author },
    update: {},
    create: { name: blog.author },
   });
  }
  // Crea el NewsItem
  const newsItem = await prismaService.prisma.newsItem.create({
   data: {
    title: blog.title,
    content: blog.content,
   },
  });
  // Crea el Blog
  const createdBlog = await prismaService.prisma.blog.create({
   data: {
    title: blog.title,
    content: blog.content,
    newsItem: { connect: { id: newsItem.id } },
    blogAuthors: author
     ? { create: [{ authorId: author.id }] }
     : undefined,
   },
  });
  results.push({ blog: createdBlog, newsItem });
 }
 return { imported: results.length, results };
}