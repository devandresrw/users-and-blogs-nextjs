export default function DataDeletionPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-3xl mx-auto">
    <div className="bg-white shadow rounded-lg p-8">
     <h1 className="text-3xl font-bold text-gray-900 mb-6">
      Eliminación de Datos de Usuario
     </h1>

     <div className="prose prose-gray max-w-none">
      <h2 className="text-xl font-semibold mb-4">
       Cómo eliminar tus datos de The Side News
      </h2>

      <p className="mb-4">
       Si deseas eliminar todos los datos asociados con tu cuenta de The Side News
       que fueron obtenidos a través de Facebook Login, puedes seguir estos pasos:
      </p>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
       <h3 className="font-semibold text-blue-900 mb-2">Opción 1: Desde tu cuenta</h3>
       <ol className="list-decimal list-inside space-y-2 text-blue-800">
        <li>Inicia sesión en tu cuenta de The Side News</li>
        <li>Ve a Configuración de la cuenta</li>
        <li>Selecciona "Eliminar cuenta y datos"</li>
        <li>Confirma la eliminación</li>
       </ol>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
       <h3 className="font-semibold text-red-900 mb-2">Opción 2: Contacto directo</h3>
       <p className="text-red-800">
        Envía un email a{" "}
        <a
         href="mailto:contact@andresrw.com"
         className="font-semibold underline"
        >
         contact@andresrw.com
        </a>{" "}
        con el asunto "Eliminación de datos" e incluye:
       </p>
       <ul className="list-disc list-inside mt-2 space-y-1 text-red-800">
        <li>Tu dirección de email registrada</li>
        <li>Tu nombre completo</li>
        <li>Confirmación de que deseas eliminar todos tus datos</li>
       </ul>
      </div>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
       <h3 className="font-semibold text-gray-900 mb-2">¿Qué datos eliminamos?</h3>
       <ul className="list-disc list-inside space-y-1 text-gray-700">
        <li>Información del perfil (nombre, email, foto)</li>
        <li>Preferencias de usuario</li>
        <li>Historial de actividad en el sitio</li>
        <li>Comentarios y interacciones</li>
        <li>Cualquier otro dato personal almacenado</li>
       </ul>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
       <h3 className="font-semibold text-yellow-900 mb-2">Tiempo de procesamiento</h3>
       <p className="text-yellow-800">
        Las solicitudes de eliminación de datos se procesan dentro de 30 días.
        Recibirás una confirmación por email cuando el proceso esté completo.
       </p>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
       <p className="text-sm text-gray-600">
        Esta página cumple con los requisitos de eliminación de datos de Facebook Platform Policy.
        Última actualización: {new Date().toLocaleDateString('es-ES')}
       </p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}