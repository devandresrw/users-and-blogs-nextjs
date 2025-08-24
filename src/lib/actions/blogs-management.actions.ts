'use server'
import prismaService from '@/lib/config/prisma.service'

// Función auxiliar para obtener traducciones
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

// Función para obtener idiomas disponibles de traducciones de un blog
async function getBlogTranslationLanguages(blogId: string) {
 const translations = await prismaService.prisma.translation.findMany({
  where: {
   entityType: 'blog',
   entityId: blogId
  },
  select: {
   language: true
  },
  distinct: ['language']
 });

 return translations.map(t => t.language);
}

// Tipos para la respuesta
export type BlogManagementItem = {
 id: string;
 title: string;
 slug: string;
 content: string;
 titlePunch: string | null;
 seoDescription: string | null;
 baseLanguage: string;
 dateCreated: string;
 dateNews: string | null;
 views: number;
 readTime: number | null;

 author: {
  id: string;
  name: string;
  profilePicture: string | null;
 } | null;

 category: {
  id: string;
  name: string;
  slug: string;
 } | null;

 tags: Array<{
  id: string;
  name: string;
  slug: string;
 }>;

 images: {
  seo: {
   id: string;
   url: string;
   alt: string | null;
  } | null;
  card: {
   id: string;
   url: string;
   alt: string | null;
  } | null;
 };

 translations: {
  availableLanguages: string[];
  totalLanguages: number;
  hasTargetTranslation: boolean;
  translationStatus: 'translated' | 'untranslated' | 'unknown';
  targetLanguage?: string;
 };
};

export type BlogManagementData = {
 blogs: BlogManagementItem[];
 pagination: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
 };
 filters: {
  lang: string;
  status: 'translated' | 'untranslated' | 'all';
  targetLanguage?: string;
 };
 stats: {
  total: number;
  translated: number;
  untranslated: number;
  languages: string[];
  byLanguage: Record<string, number>;
 };
};

export type BlogManagementResponse = {
 success: true;
 data: BlogManagementData;
} | {
 success: false;
 error: string;
};

export async function getBlogsForManagement(params: {
 lang?: string;
 page?: number;
 limit?: number;
 status?: 'translated' | 'untranslated' | 'all';
 targetLanguage?: string;
}): Promise<BlogManagementResponse> {
 const {
  lang = 'es',
  page = 1,
  limit = 10,
  status = 'all',
  targetLanguage
 } = params;

 try {
  // Calcular offset para paginación
  const skip = (page - 1) * limit;

  // Query base para obtener blogs
  const baseWhere = {
   baseLanguage: lang
  };

  // Obtener blogs con toda la información necesaria
  const blogs = await prismaService.prisma.blog.findMany({
   where: baseWhere,
   include: {
    blogAuthors: {
     include: {
      author: {
       select: {
        id: true,
        name: true,
        profilePicture: true
       }
      }
     }
    },
    Category: {
     select: {
      id: true,
      name: true,
      slug: true
     }
    },
    tags: {
     include: {
      tag: {
       select: {
        id: true,
        name: true,
        slug: true
       }
      }
     }
    },
    imagenSeo: {
     select: {
      id: true,
      url: true,
      alt: true
     }
    },
    imagenCard: {
     select: {
      id: true,
      url: true,
      alt: true
     }
    }
   },
   orderBy: {
    dateCreated: 'desc'
   }
  });

  // Procesar cada blog para obtener información de traducciones
  const processedBlogs: BlogManagementItem[] = await Promise.all(
   blogs.map(async (blog) => {
    // Obtener todos los idiomas disponibles para este blog
    const availableLanguages = await getBlogTranslationLanguages(blog.id);

    // Agregar el idioma base si no está en la lista
    if (!availableLanguages.includes(blog.baseLanguage)) {
     availableLanguages.unshift(blog.baseLanguage);
    }

    // Si hay un targetLanguage específico, verificar si existe traducción
    let translationStatus: 'translated' | 'untranslated' | 'unknown' = 'unknown';
    let hasTargetTranslation = false;

    if (targetLanguage && targetLanguage !== blog.baseLanguage) {
     hasTargetTranslation = availableLanguages.includes(targetLanguage);
     translationStatus = hasTargetTranslation ? 'translated' : 'untranslated';
    } else {
     // Si no hay targetLanguage, determinar status general
     translationStatus = availableLanguages.length > 1 ? 'translated' : 'untranslated';
    }

    // Obtener traducciones para el idioma de consulta si es diferente al base
    let translatedContent = null;
    if (lang !== blog.baseLanguage) {
     translatedContent = await getTranslations('blog', blog.id, lang);
    }

    return {
     id: blog.id,
     title: translatedContent?.title || blog.title,
     slug: blog.slug,
     content: translatedContent?.content || blog.content,
     titlePunch: translatedContent?.titlePunch || blog.titlePunch,
     seoDescription: translatedContent?.seoDescription || blog.seoDescription,
     baseLanguage: blog.baseLanguage,
     dateCreated: blog.dateCreated.toISOString(),
     dateNews: blog.dateNews?.toISOString() || null,
     views: blog.views || 0,
     readTime: blog.readTime || null,

     // Información del autor
     author: blog.blogAuthors[0] ? {
      id: blog.blogAuthors[0].author.id,
      name: blog.blogAuthors[0].author.name,
      profilePicture: blog.blogAuthors[0].author.profilePicture
     } : null,

     // Información de categoría
     category: blog.Category ? {
      id: blog.Category.id,
      name: blog.Category.name,
      slug: blog.Category.slug
     } : null,

     // Tags
     tags: blog.tags.map(bt => ({
      id: bt.tag.id,
      name: bt.tag.name,
      slug: bt.tag.slug
     })),

     // Imágenes
     images: {
      seo: blog.imagenSeo ? {
       id: blog.imagenSeo.id,
       url: blog.imagenSeo.url,
       alt: blog.imagenSeo.alt
      } : null,
      card: blog.imagenCard ? {
       id: blog.imagenCard.id,
       url: blog.imagenCard.url,
       alt: blog.imagenCard.alt
      } : null
     },

     // Información de traducciones
     translations: {
      availableLanguages,
      totalLanguages: availableLanguages.length,
      hasTargetTranslation,
      translationStatus,
      targetLanguage
     }
    };
   })
  );

  // Filtrar por status si es necesario
  let filteredBlogs = processedBlogs;
  if (status !== 'all') {
   filteredBlogs = processedBlogs.filter(blog =>
    blog.translations.translationStatus === status
   );
  }

  // Aplicar paginación después del filtrado
  const paginatedBlogs = filteredBlogs.slice(skip, skip + limit);

  // Calcular totales
  const totalBlogs = filteredBlogs.length;
  const totalPages = Math.ceil(totalBlogs / limit);

  // Obtener estadísticas generales
  const stats = {
   total: processedBlogs.length,
   translated: processedBlogs.filter(b => b.translations.translationStatus === 'translated').length,
   untranslated: processedBlogs.filter(b => b.translations.translationStatus === 'untranslated').length,
   languages: Array.from(new Set(processedBlogs.flatMap(b => b.translations.availableLanguages))),
   byLanguage: {} as Record<string, number>
  };

  // Contar blogs por idioma
  stats.languages.forEach(language => {
   stats.byLanguage[language] = processedBlogs.filter(b =>
    b.translations.availableLanguages.includes(language)
   ).length;
  });

  return {
   success: true,
   data: {
    blogs: paginatedBlogs,
    pagination: {
     currentPage: page,
     totalPages,
     totalItems: totalBlogs,
     itemsPerPage: limit,
     hasNextPage: page < totalPages,
     hasPreviousPage: page > 1
    },
    filters: {
     lang,
     status,
     targetLanguage
    },
    stats
   }
  };

 } catch (error) {
  console.error('Error fetching blogs for management:', error);
  return {
   success: false,
   error: 'Error al obtener los blogs para gestión'
  };
 }
}