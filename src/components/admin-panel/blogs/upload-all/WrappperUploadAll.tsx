"use client";
import { useState } from "react";
import FormUploadAll from "./FormUploadAll";

export default function WrappperUploadAll() {
 const [result, setResult] = useState<string | null>(null);

 return (
  <div className="max-w-2xl mx-auto py-8">
   <h2 className="text-xl font-bold mb-4">Importar Blogs y NewsItems</h2>
   <FormUploadAll onResult={setResult} />
   {result && (
    <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded">
     <pre className="whitespace-pre-wrap text-sm">{result}</pre>
    </div>
   )}
  </div>
 );
}