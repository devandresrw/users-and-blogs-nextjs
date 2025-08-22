import type { Metadata } from "next";

// Función para generar metadata dinámicamente basada en el idioma
export async function generateMetadata({ 
  params: { lang } 
}: { 
  params: { lang: string } 
}): Promise<Metadata> {
  return {
    title: lang === 'es' ? "Tu App en Español" : "Your App in English",
    description: lang === 'es' ? "Descripción en español" : "Description in English",
  };
}

export default function LanguageLayout({
  children,
  params: { lang }
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <div data-lang={lang}>
      {children}
    </div>
  );
}

// Generar rutas estáticas para SEO
export async function generateStaticParams() {
  return [
    { lang: 'es' },
    { lang: 'en' },
    // Agrega más idiomas según necesites
  ];
}