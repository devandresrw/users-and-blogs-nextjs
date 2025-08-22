import { Metadata } from 'next';
import { getBlogsSEOData } from '@/utils/seo/blogs';
import dynamic from 'next/dynamic';

// Cargar el componente dinámicamente para evitar problemas de hidratación
const WrapperAllBlogs = dynamic(() => import('@/components/blogs/WrapperAllBlogs'), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse space-y-8">
        <div className="text-center space-y-4">
          <div className="h-10 bg-gray-200 rounded w-64 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-96 mx-auto"></div>
        </div>
        <div className="flex gap-4">
          <div className="h-10 bg-gray-200 rounded flex-1 max-w-md"></div>
          <div className="h-10 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="aspect-video bg-gray-200 rounded"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});

interface PageProps {
  params: {
    lang: 'en' | 'es';
  };
}

// Generar metadata dinámico
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = params;

  try {
    const seoData = await getBlogsSEOData(lang);
    const siteName = process.env.NEXT_PUBLIC_SITE_NAME || 'Tu Sitio Web';
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

    return {
      title: seoData.title,
      description: seoData.description,
      keywords: [
        ...(lang === 'es'
          ? ['blogs', 'tecnología', 'desarrollo web', 'programación', 'tutoriales', 'guías']
          : ['blogs', 'technology', 'web development', 'programming', 'tutorials', 'guides']
        ),
        ...seoData.categories,
      ],
      openGraph: {
        title: seoData.title,
        description: seoData.description,
        url: `${siteUrl}/${lang}/blogs`,
        siteName,
        locale: lang === 'es' ? 'es_ES' : 'en_US',
        type: 'website',
        images: [
          {
            url: `${siteUrl}/og-blogs.jpg`,
            width: 1200,
            height: 630,
            alt: seoData.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: seoData.title,
        description: seoData.description,
        images: [`${siteUrl}/og-blogs.jpg`],
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `${siteUrl}/${lang}/blogs`,
        languages: {
          'es': `${siteUrl}/es/blogs`,
          'en': `${siteUrl}/en/blogs`,
        },
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);

    // Metadata de fallback
    const fallbackTitle = lang === 'es' ? 'Blogs de Tecnología' : 'Technology Blogs';
    const fallbackDescription = lang === 'es'
      ? 'Descubre artículos interesantes sobre tecnología, desarrollo web y programación.'
      : 'Discover interesting articles about technology, web development and programming.';

    return {
      title: fallbackTitle,
      description: fallbackDescription,
    };
  }
}

export default function BlogsPage({ params }: PageProps) {
  const { lang } = params;

  return (
    <>
      {/* SEO Schema solo en servidor */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: lang === 'es' ? 'Blogs de Tecnología' : 'Technology Blogs',
            description: lang === 'es'
              ? 'Descubre artículos sobre tecnología, desarrollo web y programación.'
              : 'Discover articles about technology, web development and programming.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/blogs`,
            publisher: {
              '@type': 'Organization',
              name: process.env.NEXT_PUBLIC_SITE_NAME || 'Tu Sitio Web',
              url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            },
            inLanguage: lang === 'es' ? 'es-ES' : 'en-US',
          })
        }}
      />

      {/* Componente con carga diferida */}
      <WrapperAllBlogs />
    </>
  );
}

// Generar rutas estáticas
export function generateStaticParams() {
  return [
    { lang: 'es' },
    { lang: 'en' },
  ];
}