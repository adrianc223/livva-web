/**
 * The /como-empezar objections, in a plain module rather than inside the page component.
 *
 * **A `"use client"` module's exports are client references on the server**, so importing this
 * array from the component and reading it at module scope to build JSON-LD fails the build with
 * "Failed to collect configuration". Same reason `faqs.ts` exists as its own file: the schema and
 * the visible content have to come from one array, and that array has to be readable from both
 * sides of the boundary.
 */
export type Objecion = { q: string; a: string };

export const GETTING_STARTED_FAQS: Objecion[] = [
  {
    q: "¿Tengo que capacitar a los residentes?",
    a: "No. La primera vez que alguien abre una pantalla, Livva le explica esa pantalla — y le explica distinto según sea administración, dueño, inquilino o guarda de la caseta. Puede volver a verlo cuando quiera desde el botón que queda junto al título de cada sección.",
  },
  {
    q: "Mis vecinos son mayores y no son de aplicaciones. ¿Va a funcionar?",
    a: "Para un residente la app tiene tres cosas en la barra de abajo, y la primera vez que entra le mostramos qué hace cada una. La guía es por rol, así que a un vecino no le explicamos nada de administrar el condominio: solo lo que él usa. Y si alguien prefiere no verla, se apaga desde su propia configuración.",
  },
  {
    q: "No tengo los correos de todos. ¿Igual puedo empezar?",
    a: "Sí, y es el caso más común. Generás un link para residentes y lo compartís una vez por WhatsApp; cada quien pone sus propios datos. No necesitás ni un correo para arrancar.",
  },
  {
    q: "¿Cuánto tarda tener el condominio andando?",
    a: "Crear el condominio toma menos de un minuto y quedás adentro al instante. Cuánto tardan en entrar los vecinos depende de ellos, no de un proceso nuestro: el link queda activo y van entrando cuando puedan.",
  },
  {
    q: "¿Tengo que instalar algo?",
    a: "No. Livva funciona en el navegador, y desde el teléfono se puede agregar a la pantalla de inicio para que quede como una app más. La primera vez que alguien entra desde el celular le mostramos cómo.",
  },
  {
    q: "¿Y si me arrepiento o cambia la junta?",
    a: "La demo no pide tarjeta y no se cobra sola. Y si cambia quien administra, la persona saliente transfiere la administración desde su propia configuración, sin que nosotros tengamos que intervenir.",
  },
];
