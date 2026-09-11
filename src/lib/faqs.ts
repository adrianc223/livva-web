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
    // Phrased as a question with an explicit "ask your accountant", never as a claim. The
    // predominant professional reading in Costa Rica is that a condominium collecting only
    // cuotas is not obliged to issue facturas electrónicas — but the sources for that do not
    // cite the instrument that creates the exemption, they predate TRIBU-CR (October 2025), and
    // Hacienda did not respond when a national paper asked. Publishing it as fact would be
    // giving tax advice Livva cannot stand behind, and a competitor's page asserting the
    // opposite is not grounds to assert this one. It also has to be unambiguous that this is
    // about the condominium's own obligation, not about whether Livva can invoice the
    // condominium — Livva is a contribuyente and always issues one.
    q: "¿Necesito factura electrónica para cobrar las cuotas?",
    a: "Depende de tu condominio, y es una pregunta para tu contador, no para nosotros. La lectura profesional más común en Costa Rica es que un condominio que solo cobra cuotas ordinarias y extraordinarias para gastos comunes no está obligado a emitir factura electrónica, y que sí lo está si además alquila áreas comunes o parqueos, o genera cualquier otro ingreso gravable. Livva no emite facturas a nombre de tu condominio y no reemplaza a tu contador. Lo que sí hace es dejar registrado cada cobro, cada comprobante y cada pago confirmado, con historial completo — que es justo lo que tu contador te va a pedir. Aparte de eso, Livva sí te factura a vos su propio servicio, con IVA, como cualquier proveedor.",
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
