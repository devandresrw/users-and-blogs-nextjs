export default function TermsOfServicePage() {
 return (
  <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto">
    <div className="bg-white shadow rounded-lg p-8">
     <h1 className="text-3xl font-bold text-gray-900 mb-6">
      Términos de Servicio
     </h1>

     <div className="prose prose-gray max-w-none">
      <p className="text-sm text-gray-600 mb-6">
       Última actualización: {new Date().toLocaleDateString('es-ES')}
      </p>

      <h2 className="text-xl font-semibold mb-4">1. Aceptación de los Términos</h2>
      <p className="mb-6">
       Al acceder y usar The Side News, aceptas estar sujeto a estos Términos de Servicio
       y a nuestra Política de Privacidad. Si no estás de acuerdo con estos términos,
       no debes usar nuestro servicio.
      </p>

      <h2 className="text-xl font-semibold mb-4">2. Descripción del Servicio</h2>
      <p className="mb-6">
       The Side News es una plataforma digital que proporciona noticias, artículos y
       contenido informativo. Nos reservamos el derecho de modificar, suspender o
       discontinuar cualquier aspecto del servicio en cualquier momento.
      </p>

      <h2 className="text-xl font-semibold mb-4">3. Registro de Cuenta</h2>
      <p className="mb-4">Para usar ciertas funciones, debes crear una cuenta. Te comprometes a:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Proporcionar información precisa y actualizada</li>
       <li>Mantener la confidencialidad de tu contraseña</li>
       <li>Ser responsable de toda actividad en tu cuenta</li>
       <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">4. Uso Aceptable</h2>
      <p className="mb-4">Te comprometes a NO usar nuestro servicio para:</p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Violate cualquier ley o regulación aplicable</li>
       <li>Publicar contenido ofensivo, difamatorio o discriminatorio</li>
       <li>Interferir con la operación del sitio</li>
       <li>Intentar acceder sin autorización a otros sistemas</li>
       <li>Distribuir virus, malware o código malicioso</li>
       <li>Hacer spam o enviar comunicaciones no solicitadas</li>
      </ul>

      <h2 className="text-xl font-semibold mb-4">5. Contenido del Usuario</h2>
      <p className="mb-4">
       Al enviar contenido a nuestro sitio (comentarios, etc.), garantizas que:
      </p>
      <ul className="list-disc list-inside mb-6 space-y-2">
       <li>Tienes los derechos necesarios sobre el contenido</li>
       <li>El contenido no viola derechos de terceros</li>
       <li>El contenido cumple con estos términos</li>
      </ul>
      <p className="mb-6">
       Nos otorgas una licencia no exclusiva para usar, modificar y mostrar tu contenido
       en relación con nuestro servicio.
      </p>

      <h2 className="text-xl font-semibold mb-4">6. Propiedad Intelectual</h2>
      <p className="mb-6">
       Todo el contenido de The Side News, incluyendo textos, gráficos, logos, iconos,
       imágenes, clips de audio, descargas digitales y software, es propiedad de
       The Side News o sus proveedores de contenido y está protegido por leyes de
       derechos de autor.
      </p>

      <h2 className="text-xl font-semibold mb-4">7. Privacidad</h2>
      <p className="mb-6">
       Tu privacidad es importante para nosotros. Revisa nuestra{" "}
       <a href="/privacy-policy" className="text-blue-600 underline">
        Política de Privacidad
       </a>{" "}
       para entender cómo recopilamos, usamos y protegemos tu información.
      </p>

      <h2 className="text-xl font-semibold mb-4">8. Descargo de Responsabilidad</h2>
      <p className="mb-6">
       El servicio se proporciona "tal como está" sin garantías de ningún tipo.
       No garantizamos que el servicio será ininterrumpido, libre de errores o
       completamente seguro.
      </p>

      <h2 className="text-xl font-semibold mb-4">9. Limitación de Responsabilidad</h2>
      <p className="mb-6">
       En ningún caso The Side News será responsable por daños indirectos,
       incidentales, especiales, consecuenciales o punitivos, incluyendo pero
       no limitado a pérdida de beneficios, datos o uso.
      </p>

      <h2 className="text-xl font-semibold mb-4">10. Terminación</h2>
      <p className="mb-6">
       Podemos terminar o suspender tu cuenta inmediatamente, sin previo aviso o
       responsabilidad, por cualquier motivo, incluyendo si violas estos Términos
       de Servicio.
      </p>

      <h2 className="text-xl font-semibold mb-4">11. Ley Aplicable</h2>
      <p className="mb-6">
       Estos términos se regirán e interpretarán de acuerdo con las leyes aplicables,
       sin consideración a sus disposiciones sobre conflictos de leyes.
      </p>

      <h2 className="text-xl font-semibold mb-4">12. Cambios a los Términos</h2>
      <p className="mb-6">
       Nos reservamos el derecho de modificar estos términos en cualquier momento.
       Los cambios entrarán en vigor inmediatamente después de su publicación en
       esta página.
      </p>

      <h2 className="text-xl font-semibold mb-4">13. Contacto</h2>
      <p className="mb-4">
       Si tienes preguntas sobre estos Términos de Servicio, contáctanos:
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