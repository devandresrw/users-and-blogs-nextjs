"use client";
import { useState } from "react";
import { uploadAllBlogs } from "@/hooks/blogs/UploadAll";

export default function FormUploadAll({ onResult }: { onResult: (msg: string) => void }) {
 const [jsonData, setJsonData] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
   // Validar y parsear JSON
   const parsed = JSON.parse(jsonData);
   const res = await uploadAllBlogs({ blogsData: parsed });
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

 const exampleJson = JSON.stringify({
  blogs: [
   {
    slug: "discover-the-scandinavian-city-home-to-iconic-painting-the-scream",
    titleNews: "Are you an expert traveller? Test your knowledge with this week's quiz.",
    titlePunch: "Discover the Scandinavian City Home to Iconic Painting 'The Scream'",
    textRefined: "Are you an expert traveller? Test your knowledge with this week's quiz about travel destinations and iconic landmarks.",
    category: "Australia",
    author: "John Doe",
    descriptionSeo: "Test your travel knowledge with our weekly quiz featuring famous landmarks and destinations.",
    postImages: "",
    createdAt: "2025-08-21T23:12:57.508Z"
   }
  ]
 }, null, 2);

 return (
  <form onSubmit={handleSubmit}>
   <div className="mb-4">
    <label className="block text-sm font-medium mb-2">
     Datos JSON de blogs
    </label>
    <textarea
     className="w-full h-64 p-3 border rounded mb-2 font-mono text-xs"
     placeholder={exampleJson}
     value={jsonData}
     onChange={e => setJsonData(e.target.value)}
     required
    />
    <p className="text-xs text-gray-500 mt-1">
     Formato esperado: {"{ blogs: [{ slug, titleNews, titlePunch, textRefined, category, author, descriptionSeo, postImages, createdAt }] }"}
    </p>
   </div>
   {error && <div className="text-red-600 mb-2 p-2 bg-red-50 rounded">{error}</div>}
   <button
    type="submit"
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
    disabled={loading}
   >
    {loading ? "Importando..." : "Importar JSON"}
   </button>
  </form>
 );
}