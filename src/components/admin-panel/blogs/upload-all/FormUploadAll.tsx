"use client";
import { useState } from "react";
import { uploadAllBlogs } from "@/hooks/blogs/UploadAll";

const LANGUAGES = [
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
];

export default function FormUploadAll({ onResult }: { onResult: (msg: string) => void }) {
  const [jsonData, setJsonData] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('es');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validar JSON
      const parsed = JSON.parse(jsonData);

      // Filtrar elementos válidos (que tengan los campos obligatorios)
      const validBlogs = parsed.filter((blog: any) =>
        blog &&
        typeof blog === 'object' &&
        blog.slug &&
        blog.titleNews &&
        blog.textRefined
      );

      if (validBlogs.length === 0) {
        throw new Error("No se encontraron blogs válidos en el JSON");
      }

      const res = await uploadAllBlogs({
        blogsData: validBlogs, // Solo enviar elementos válidos
        language: selectedLanguage
      });

      onResult(JSON.stringify(res, null, 2));
    } catch (err: any) {
      if (err.name === 'SyntaxError') {
        setError("JSON inválido: " + err.message);
      } else {
        setError("Error en la importación: " + err.message);
      }
      onResult("");
    } finally {
      setLoading(false);
    }
  };

  const exampleJson = JSON.stringify([
    {
      slug: "discover-the-scandinavian-city-home-to-iconic-painting-the-scream",
      titleNews: "Are you an expert traveller? Test your knowledge with this week's quiz.",
      titlePunch: "Discover the Scandinavian City Home to Iconic Painting 'The Scream'",
      textRefined: "Are you an expert traveller? Test your knowledge with this week's quiz about travel destinations and iconic landmarks.",
      category: "Australia",
      author: "John Doe",
      descriptionSeo: "Test your travel knowledge with our weekly quiz featuring famous landmarks and destinations.",
      postImages: [],
      createdAt: "2025-08-21T23:12:57.508Z"
    }
  ], null, 2);

  return (
    <form onSubmit={handleSubmit}>
      {/* Selector de idioma */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Idioma del contenido
        </label>
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 border rounded mb-2"
          required
        >
          {LANGUAGES.map(lang => (
            <option key={lang.code} value={lang.code}>
              {lang.flag} {lang.name} ({lang.code.toUpperCase()})
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500">
          ✅ Los blogs se crearán directamente en <strong>{LANGUAGES.find(l => l.code === selectedLanguage)?.name}</strong>.
        </p>
        <p className="text-xs text-blue-600">
          💡 <strong>Tip:</strong> Las traducciones a otros idiomas las puedes gestionar después internamente.
        </p>
      </div>

      {/* Campo de JSON */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Array JSON de blogs ({LANGUAGES.find(l => l.code === selectedLanguage)?.name})
        </label>
        <textarea
          className="w-full h-64 p-3 border rounded mb-2 font-mono text-xs"
          placeholder={exampleJson}
          value={jsonData}
          onChange={e => setJsonData(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Formato: Array de objetos con slug, titleNews, textRefined como campos obligatorios
        </p>
      </div>

      {error && <div className="text-red-600 mb-2 p-2 bg-red-50 rounded">{error}</div>}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
        disabled={loading}
      >
        {loading ? "Importando..." : `Crear blogs en ${LANGUAGES.find(l => l.code === selectedLanguage)?.name}`}
      </button>
    </form>
  );
}