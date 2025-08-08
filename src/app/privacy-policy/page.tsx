export default function PrivacyPolicyPage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto">
    <div className="bg-white shadow rounded-lg p-8">
     <h1 className="text-3xl font-bold text-gray-900 mb-6">
      Política de Privacidad
     </h1>

     <div className="prose prose-gray max-w-none">
      <p className="text-sm text-gray-600 mb-6">
       Última actualización: {new Date().toLocaleDateString('es-ES')}
      </p>

      <h2 className="text-xl font-semibold mb-4">1. Información que Recopilamos</h2>
      <p className="mb-4">
       En The Side News, recopilamos información para brindar mejores servicios a nuestros usuarios:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li><strong>Información de cuenta:</strong> Cuando te registras, recopilamos tu nombre, dirección de email y contraseña.</li>
       <li><strong>Información de OAuth:</strong> Si usas Google o Facebook para iniciar sesión, recibimos tu nombre, email y foto de perfil.</li>
       <li><strong>Información de uso:</strong> Registramos cómo interactúas con nuestro sitio, incluyendo páginas visitadas y tiempo de navegación.</li>
       <li><strong>Información técnica:</strong> Dirección IP, tipo de navegador, sistema operativo y datos de dispositivo.</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">2. Cómo Usamos tu Información</h2>
      <p className="mb-4">Utilizamos la información recopilada para:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Proporcionar y mantener nuestros servicios</li>
       <li>Personalizar tu experiencia de usuario</li>
       <li>Enviar comunicaciones importantes sobre el servicio</li>
       <li>Mejorar la seguridad y prevenir fraudes</li>
       <li>Analizar el uso del sitio para mejoras futuras</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">3. Compartir Información</h2>
      <p className="mb-4">
       No vendemos, intercambiamos ni transferimos tu información personal a terceros, excepto:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Cuando sea requerido por ley</li>
       <li>Para proteger nuestros derechos legales</li>
       <li>Con proveedores de servicios de confianza que nos ayudan a operar nuestro sitio</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">4. Cookies y Tecnologías Similares</h2>
      <p className="mb-4">
       Utilizamos cookies y tecnologías similares para:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Mantener tu sesión iniciada</li>
       <li>Recordar tus preferencias</li>
       <li>Analizar el tráfico del sitio</li>
       <li>Mejorar la funcionalidad del sitio</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">5. Seguridad de los Datos</h2>
      <p className="mb-6">
       Implementamos medidas de seguridad técnicas y organizativas apropiadas para proteger
       tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.
      </p>

      <h2 className="text-xl font-semibold mb-4">6. Tus Derechos</h2>
      <p className="mb-4">Tienes derecho a:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Acceder a tu información personal</li>
       <li>Corregir información inexacta</li>
       <li>Solicitar la eliminación de tus datos</li>
       <li>Oponerte al procesamiento de tus datos</li>
       <li>Portabilidad de datos</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">7. Retención de Datos</h2>
      <p className="mb-6">
       Mantenemos tu información personal solo mientras sea necesario para los propósitos
       descritos en esta política, a menos que la ley requiera un período de retención más largo.
      </p>

      <h2 className="text-xl font-semibold mb-4">8. Menores de Edad</h2>
      <p className="mb-6">
       Nuestros servicios están dirigidos a personas mayores de 13 años. No recopilamos
       intencionalmente información personal de menores de 13 años.
      </p>

      <h2 className="text-xl font-semibold mb-4">9. Cambios a esta Política</h2>
      <p className="mb-6">
       Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos
       sobre cambios significativos publicando la nueva política en esta página.
      </p>

      <h2 className="text-xl font-semibold mb-4">10. Contacto</h2>
      <p className="mb-4">
       Si tienes preguntas sobre esta política de privacidad, contáctanos en:
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
       <p><strong>Email:</strong> <a href="mailto:contact@andresrw.com" className="text-blue-600 underline">contact@andresrw.com</a></p>
       <p><strong>Sitio web:</strong> <a href="https://theside.news" className="text-blue-600 underline">https://theside.news</a></p>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
}