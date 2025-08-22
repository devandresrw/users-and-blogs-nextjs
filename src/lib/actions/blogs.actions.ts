import prismaService from '@/lib/config/prisma.service'
import { slugify } from '@/utils/generate-slug.util'

// Función para crear traducciones
async function createTranslations(entityType: string, entityId: string, language: string, translations: any) {
  for (const [field, value] of Object.entries(translations)) {
    if (value && typeof value === 'string' && value.trim()) {
      await prismaService.prisma.translation.upsert({
        where: {
          entityType_entityId_language_field: {
            entityType,
            entityId,
            language,
            field
          }
        },
        update: { value: value.trim() },
        create: {
          entityType,
          entityId,
          language,
          field,
          value: value.trim()
        }
      });
    }
  }
}

// Función para obtener traducciones
async function getTranslations(entityType: string, entityId: string, language: string) {
  const translations = await prismaService.prisma.translation.findMany({
    where: {
      entityType,
      entityId,
      language
    }
  });

  const translationsMap: Record<string, string> = {};
  translations.forEach(t => {
    translationsMap[t.field] = t.value;
  });

  return translationsMap;
}

// Nueva función para obtener blogs por categorías
export async function getBlogsByCategories(params: {
  lang: string;
  page?: number;
  limit?: number;
  categorySlug?: string;
}) {
  const { lang, page = 1, limit = 10, categorySlug } = params;

  try {
    // Filtro base para categorías
    const categoryFilter = categorySlug ? { slug: categorySlug } : {};

    // Obtener categorías con sus blogs (usando el nombre correcto de la relación)
    const categories = await prismaService.prisma.category.findMany({
      where: {
        ...categoryFilter,
        Blog: {  // Cambio de 'blogs' a 'Blog' según el esquema
          some: {} // Solo categorías que tienen blogs
        }
      },
      include: {
        Blog: {  // Cambio de 'blogs' a 'Blog'
          where: {
            // Filtrar blogs por idioma base
            baseLanguage: lang
          },
          include: {
            blogAuthors: {
              include: {
                author: true
              }
            },
            tags: {  // Cambio de 'blogTags' a 'tags' según el esquema
              include: {
                tag: true
              }
            },
            Category: true,
            imagenSeo: true,
            imagenCard: true
          },
          orderBy: {
            dateCreated: 'desc'
          },
          skip: categorySlug ? (page - 1) * limit : 0,
          take: categorySlug ? limit : undefined
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Obtener totales
    const totalBlogsCount = await prismaService.prisma.blog.count({
      where: {
        ...(categorySlug && { Category: { slug: categorySlug } }),
        baseLanguage: lang
      }
    });

    const totalCategoriesCount = await prismaService.prisma.category.count({
      where: {
        ...categoryFilter,
        Blog: {
          some: {
            baseLanguage: lang
          }
        }
      }
    });

    // Transformar datos para incluir traducciones y calcular tiempo de lectura
    const transformedCategories = await Promise.all(
      categories.map(async (category) => {
        // Obtener traducciones de la categoría
        const categoryTranslations = await getTranslations('category', category.id, lang);

        const transformedBlogs = await Promise.all(
          category.Blog.map(async (blog) => {  // Cambio de 'blogs' a 'Blog'
            // Obtener traducciones del blog
            const blogTranslations = await getTranslations('blog', blog.id, lang);

            // Usar traducción si existe, sino usar el valor base
            const title = blogTranslations.title || blog.title;
            const content = blogTranslations.content || blog.content;
            const titlePunch = blogTranslations.titlePunch || blog.titlePunch;
            const seoDescription = blogTranslations.seoDescription || blog.seoDescription;

            // Calcular tiempo de lectura (aproximadamente 200 palabras por minuto)
            const wordCount = content.split(/\s+/).length;
            const readTime = Math.max(1, Math.ceil(wordCount / 200));

            // Crear excerpt del contenido
            const excerpt = seoDescription || content.substring(0, 150) + '...';

            return {
              id: blog.id,
              title,
              slug: blog.slug,
              excerpt,
              image: blog.imagenCard?.url || blog.imagenSeo?.url || null,
              createdAt: blog.dateCreated.toISOString(),
              author: {
                name: blog.blogAuthors[0]?.author.name || 'Autor Desconocido',
                image: blog.blogAuthors[0]?.author.profilePicture || null
              },
              tags: blog.tags.map(bt => ({  // Actualizado según el esquema
                id: bt.tag.id,
                name: bt.tag.name,
                slug: bt.tag.slug
              })),
              readTime
            };
          })
        );

        return {
          id: category.id,
          name: categoryTranslations.name || category.name,
          slug: category.slug,
          description: categoryTranslations.description || null,
          blogs: transformedBlogs
        };
      })
    );

    return {
      categories: transformedCategories,
      totalBlogs: totalBlogsCount,
      totalCategories: totalCategoriesCount,
      currentPage: page,
      totalPages: Math.ceil(totalBlogsCount / limit)
    };

  } catch (error) {
    console.error('Error fetching blogs by categories:', error);
    throw new Error('Error al obtener los blogs por categorías');
  }
}

export async function importBlogsAndNews(data: { blogsData: any; language?: string }) {
  const language = data.language || 'es'; // Idioma por defecto español

  // Validar que sea un array
  if (!data.blogsData || !Array.isArray(data.blogsData)) {
    throw new Error("Formato inválido: se esperaba un array de blogs");
  }

  const results = [];
  const skipped = [];

  for (let i = 0; i < data.blogsData.length; i++) {
    const blogData = data.blogsData[i];

    // **VALIDACIÓN MEJORADA**: Verificar que el elemento tenga los campos mínimos
    if (!blogData || typeof blogData !== 'object') {
      skipped.push({
        index: i + 1,
        slug: 'N/A',
        reason: 'Elemento inválido o vacío'
      });
      continue;
    }

    // **VALIDACIÓN DE CAMPOS OBLIGATORIOS**
    if (!blogData.slug || !blogData.titleNews || !blogData.textRefined) {
      skipped.push({
        index: i + 1,
        slug: blogData.slug || 'N/A',
        reason: 'Campos obligatorios vacíos (slug, titleNews, textRefined)'
      });
      continue;
    }

    try {
      // **CREAR BLOG EN EL IDIOMA SELECCIONADO** (sin importar cuál sea)

      // Verificar si el blog ya existe por slug
      const existingBlog = await prismaService.prisma.blog.findUnique({
        where: { slug: blogData.slug }
      });

      if (existingBlog) {
        skipped.push({
          index: i + 1,
          slug: blogData.slug,
          reason: 'Ya existe un blog con este slug'
        });
        continue;
      }

      // Buscar o crear categoría (solo si existe y no está vacía)
      let category = null;
      if (blogData.category && blogData.category.trim()) {
        const categorySlug = slugify(blogData.category.trim());
        category = await prismaService.prisma.category.upsert({
          where: { slug: categorySlug },
          update: {},
          create: {
            name: blogData.category.trim(),
            slug: categorySlug,
            baseLanguage: language // Usar el idioma seleccionado
          },
        });
      }

      // Buscar o crear autor (solo si existe y no está vacía)
      let author = null;
      if (blogData.author && blogData.author.trim()) {
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

      // Crear NewsItem en el idioma seleccionado
      const newsItem = await prismaService.prisma.newsItem.create({
        data: {
          title: blogData.titleNews,
          content: blogData.textRefined,
          createdAt: createdAt,
          baseLanguage: language, // Usar el idioma seleccionado
        },
      });

      // Crear Blog en el idioma seleccionado
      const createdBlog = await prismaService.prisma.blog.create({
        data: {
          slug: blogData.slug,
          title: blogData.titleNews,
          content: blogData.textRefined,
          titlePunch: blogData.titlePunch || null,
          seoDescription: blogData.descriptionSeo || null,
          baseLanguage: language, // Usar el idioma seleccionado
          dateNews: createdAt,
          dateCreated: createdAt,
          newsItemId: newsItem.id,
          categoryId: category?.id,
          blogAuthors: author ? {
            create: [{ authorId: author.id }]
          } : undefined,
        },
      });

      results.push({
        blog: createdBlog,
        newsItem,
        category: category?.name,
        author: author?.name,
        language
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
    skippedItems: skipped,
    language: language,
    message: `Blogs importados en idioma ${language.toUpperCase()}`
  };
}