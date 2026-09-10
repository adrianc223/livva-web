// Single source of truth for /preguntas-frecuentes' Q&A content — shared between the page
// content itself (FaqPageContent.tsx) and the FAQPage JSON-LD built in page.tsx, so the two can
// never drift apart (schema data that doesn't match the visible page is exactly the kind of
// fabrication the seo-audit skill warns against).
export const FAQS = [
  {
    q: "¿Qué es Livva?",
    a: "Livva es la plataforma que une a los administradores de condominios con sus residentes en Costa Rica: cuotas, pagos, anuncios, reservas de áreas comunes, mensajería directa y un mini-marketplace entre vecinos, todo en un solo lugar.",
  },
  {
    q: "¿Cuánto cuesta administrar mi condominio con Livva?",
    a: "El precio se calcula según la cantidad de unidades de tu condominio, no por un plan fijo — mientras más unidades, mejor la tarifa por unidad. Podés ver el cálculo exacto en la sección de Planes, o probarlo gratis con una demo antes de decidir.",
  },
  {
    q: "¿Mis residentes necesitan instalar algo?",
    a: "No. Livva funciona directo desde el navegador del celular o la computadora, y también se puede agregar a la pantalla de inicio como una app — sin pasar por ninguna tienda de aplicaciones.",
  },
  {
    q: "¿Cómo suben los residentes sus comprobantes de pago?",
    a: "Cada residente sube una foto o captura de su comprobante directamente en la app, y el administrador lo confirma en segundos — con el historial completo siempre a la vista para ambos.",
  },
  {
    q: "¿Qué pasa con los datos de mis residentes?",
    a: "Cada condominio está completamente aislado dentro de la plataforma — nadie de otro condominio puede ver esa información, y Livva nunca vende ni comparte datos de residentes con terceros. Podés ver el detalle completo en la sección de Seguridad.",
  },
  {
    q: "¿Puedo probar Livva antes de decidir?",
    a: "Sí — podés crear un condominio de demostración gratis en menos de un minuto, sin tarjeta y sin instalar nada, desde el botón \"Iniciar demo\".",
  },
  {
    q: "¿Sirve para condominios pequeños, o solo para torres grandes?",
    a: "Sirve para cualquier tamaño, desde un condominio de pocas casas hasta una torre de más de cien unidades — el precio se ajusta automáticamente a la cantidad real de unidades.",
  },
  {
    q: "¿Puedo cancelar cuando quiera?",
    a: "Sí, no hay contrato de permanencia obligatorio.",
  },
];
