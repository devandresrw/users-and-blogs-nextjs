'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function VerifyAccountPage() {
 const searchParams = useSearchParams();
 const token = searchParams.get('token');
 const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
 const [message, setMessage] = useState('');

 useEffect(() => {
  if (token) {
   verifyAccount(token);
  } else {
   setStatus('error');
   setMessage('Token no encontrado');
  }
 }, [token]);

 const verifyAccount = async (token: string) => {
  try {
   const response = await fetch('/api/verify-account', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token }),
   });

   if (response.ok) {
    setStatus('success');
    setMessage('Cuenta verificada exitosamente');
   } else {
    const error = await response.json();
    setStatus('error');
    setMessage(error.message || 'Error al verificar cuenta');
   }
  } catch (error) {
   setStatus('error');
   setMessage('Error de conexión');
  }
 };

 return (
  <div className="min-h-screen flex items-center justify-center">
   <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
    {status === 'loading' && (
     <div className="text-center">
      <h2 className="text-xl font-semibold mb-4">Verificando cuenta...</h2>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
     </div>
    )}

    {status === 'success' && (
     <div className="text-center">
      <h2 className="text-xl font-semibold text-green-600 mb-4">¡Cuenta verificada!</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <a href="/es/in" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
       Iniciar sesión
      </a>
     </div>
    )}

    {status === 'error' && (
     <div className="text-center">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Error</h2>
      <p className="text-gray-600 mb-4">{message}</p>
      <a href="/es/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
       Registrarse nuevamente
      </a>
     </div>
    )}
   </div>
  </div>
 );
}