import prismaService from '@/lib/config/prisma.service'
import { slugify } from '@/utils/generate-slug.util'

export async function importBlogsAndNews(data: { blogsData: any }) {
  if (!data.blogsData || !data.blogsData.blogs || !Array.isArray(data.blogsData.blogs)) {
    throw new Error("Formato inválido: se esperaba { blogs: [...] }");
  }

  const results = [];
  const skipped = [];

  for (let i = 0; i < data.blogsData.blogs.length; i++) {
    const blogData = data.blogsData.blogs[i];

    // Validar campos obligatorios
    if (!blogData.slug || !blogData.titleNews || !blogData.textRefined) {
      skipped.push({
        index: i + 1,
        slug: blogData.slug || 'N/A',
        reason: 'Campos obligatorios vacíos (slug, titleNews, textRefined)'
      });
      continue;
    }

    // Verificar si el blog ya existe por slug
    const existingBlog = await prismaService.prisma.blog.findUnique({
      where: { slug: blogData.slug }
    });

    if (existingBlog) {
      skipped.push({
        index: i + 1,
        slug: blogData.slug,
        reason: 'Ya existe'
      });
      continue;
    }

    try {
      // Buscar o crear categoría (si existe)
      let category = null;
      if (blogData.category?.trim()) {
        const categorySlug = slugify(blogData.category.trim());
        category = await prismaService.prisma.category.upsert({
          where: { slug: categorySlug },
          update: {},
          create: {
            name: blogData.category.trim(),
            slug: categorySlug
          },
        });
      }

      // Buscar o crear autor (si existe)
      let author = null;
      if (blogData.author?.trim()) {
        author = await prismaService.prisma.author.upsert({
          where: { name: blogData.author.trim() },
          update: {},
          create: { name: blogData.author.trim() },
        });
      }

      // Parsear fecha con validación
      let createdAt = new Date();
      if (blogData.createdAt) {
        const parsedDate = new Date(blogData.createdAt);
        if (!isNaN(parsedDate.getTime())) {
          createdAt = parsedDate;
        } else {
          console.warn(`Fecha inválida en blog ${i + 1}: ${blogData.createdAt}. Usando fecha actual.`);
        }
      }

      // Crear NewsItem
      const newsItem = await prismaService.prisma.newsItem.create({
        data: {
          title: blogData.titleNews,
          content: blogData.textRefined,
          createdAt: createdAt,
        },
      });

      // Crear Blog
      const createdBlog = await prismaService.prisma.blog.create({
        data: {
          slug: blogData.slug,
          title: blogData.titleNews,
          content: blogData.textRefined,
          titlePunch: blogData.titlePunch || null,
          seoDescription: blogData.descriptionSeo || null,
          dateNews: createdAt,
          dateCreated: createdAt,
          newsItemId: newsItem.id,
          categoryId: category?.id || null,
          blogAuthors: author ? {
            create: [{ authorId: author.id }]
          } : undefined,
        },
      });

      results.push({
        blog: createdBlog,
        newsItem,
        category: category?.name,
        author: author?.name
      });

    } catch (error: any) {
      console.error(`Error procesando blog ${i + 1}:`, error.message);
      skipped.push({
        index: i + 1,
        slug: blogData.slug,
        reason: `Error: ${error.message}`
      });
    }
  }

  return {
    imported: results.length,
    skipped: skipped.length,
    results,
    skippedItems: skipped
  };
}