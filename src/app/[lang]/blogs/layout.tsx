import { ReactNode } from 'react';

interface BlogsLayoutProps {
  children: ReactNode;
  params: {
    lang: 'en' | 'es';
  };
}

export default function BlogsLayout({ children, params }: BlogsLayoutProps) {
  const { lang } = params;

  return (
    <div className="min-h-screen bg-background">
      {/* Opcional: Breadcrumb visible para UX */}
      <div className="border-b bg-muted/40">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
            <a 
              href={`/${lang}`} 
              className="hover:text-foreground transition-colors"
            >
              {lang === 'es' ? 'Inicio' : 'Home'}
            </a>
            <span>/</span>
            <span className="text-foreground font-medium">
              {lang === 'es' ? 'Blogs' : 'Blogs'}
            </span>
          </nav>
        </div>
      </div>

      {/* Contenido principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* Opcional: Footer específico de blogs */}
      <footer className="border-t bg-muted/20 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Enlaces rápidos */}
            <div>
              <h3 className="font-semibold mb-4">
                {lang === 'es' ? 'Explorar' : 'Explore'}
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a 
                    href={`/${lang}/blogs/categories`}
                    className="hover:text-foreground transition-colors"
                  >
                    {lang === 'es' ? 'Categorías' : 'Categories'}
                  </a>
                </li>
                <li>
                  <a 
                    href={`/${lang}/blogs/tags`}
                    className="hover:text-foreground transition-colors"
                  >
                    {lang === 'es' ? 'Etiquetas' : 'Tags'}
                  </a>
                </li>
              </ul>
            </div>

            {/* Información */}
            <div>
              <h3 className="font-semibold mb-4">
                {lang === 'es' ? 'Acerca de' : 'About'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lang === 'es' 
                  ? 'Descubre artículos sobre tecnología, desarrollo web y programación.'
                  : 'Discover articles about technology, web development and programming.'
                }
              </p>
            </div>

            {/* Redes sociales o newsletter */}
            <div>
              <h3 className="font-semibold mb-4">
                {lang === 'es' ? 'Síguenos' : 'Follow Us'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {lang === 'es' 
                  ? 'Mantente actualizado con nuestros últimos artículos.'
                  : 'Stay updated with our latest articles.'
                }
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}