"use client";
import { useState } from "react";
import { uploadAllBlogs } from "@/hooks/blogs/UploadAll";

export default function FormUploadAll({ onResult }: { onResult: (msg: string) => void }) {
 const [json, setJson] = useState("");
 const [loading, setLoading] = useState(false);
 const [error, setError] = useState<string | null>(null);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setLoading(true);
  try {
   const parsed = JSON.parse(json);
   const res = await uploadAllBlogs(parsed);
   onResult(JSON.stringify(res, null, 2));
  } catch (err: any) {
   setError("JSON inválido o error en la importación.");
   onResult("");
  } finally {
   setLoading(false);
  }
 };

 return (
  <form onSubmit={handleSubmit}>
   <textarea
    className="w-full h-48 p-2 border rounded mb-2 font-mono"
    placeholder='Pega aquí tu JSON de blogs'
    value={json}
    onChange={e => setJson(e.target.value)}
    required
   />
   {error && <div className="text-red-600 mb-2">{error}</div>}
   <button
    type="submit"
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    disabled={loading}
   >
    {loading ? "Importando..." : "Importar"}
   </button>
  </form>
 );
}