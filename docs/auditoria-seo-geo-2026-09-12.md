# Auditoría SEO / GEO / accesibilidad — livvaadmin.com

**Fecha**: 2026-09-12 · **Alcance**: `livva-web` (sitio público) · **Agente**: `seo`

**Carril**: metadatos, indexabilidad, datos estructurados, Open Graph, WCAG, señales de rendimiento, visibilidad en buscadores generativos. No opino de estética — hay un pase de `ui-ux` en paralelo sobre este mismo sitio.

> **Este reporte no cambió una sola línea de código.** Todo lo de abajo es hallazgo y recomendación.

---

## Método: qué está medido y qué está inferido

Todo lo marcado **medido** se verificó contra **producción**, no leyendo el JSX:

| Instrumento | Qué se corrió |
|---|---|
| `curl` | `robots.txt`, `sitemap.xml`, `<head>` renderizado y JSON-LD de las 4 páginas; paridad de contenido servido a 5 crawlers |
| Lighthouse 12 (standalone, nunca dependencia del repo) | móvil y escritorio contra `https://livvaadmin.com/`, más una corrida **contrafactual** con la analítica bloqueada |
| axe-core 4 vía Playwright | 4 páginas × 2 viewports (390×844 y 1440×900), tags `wcag2a/2aa/21a/21aa/22aa` |
| Playwright | cookies e inventario de peticiones de terceros en una primera visita limpia |
| DNS sobre HTTPS | registros TXT del dominio |

Lo marcado **inferido** es una conclusión razonada que **no** pude verificar desde acá; cada una dice cómo comprobarla en menos de un minuto.

Cada recomendación cierra con **"me equivoco si…"**, porque varias dependen de cosas que vos sabés y yo no.

---

## Lo que ya está bien (para que nadie lo vuelva a tocar)

Medido, no asumido. El pase del 2026-09-10 cerró de verdad lo que dijo que cerró:

- **Rastreo e indexación, correctos.** `robots.txt` sirve `Allow: /` con `Sitemap:` apuntando al dominio canónico; el `sitemap.xml` lista las 4 URLs reales. Ninguna de las dos sigue devolviendo el viejo `*.vercel.app`.
- **`www` y `http` redirigen 308 al canónico.** Un solo host indexable de verdad.
- **Metadatos por página, reales.** Las tres páginas de contenido tienen `title`, `description`, `canonical` y bloque OG propios y distintos. Ninguna comparte el bloque del layout.
- **Open Graph y Twitter Card completos**, con `og:image` de 1200×630 y `summary_large_image` inferido correctamente por Next.
- **Paridad total de contenido para crawlers.** GPTBot, ClaudeBot, PerplexityBot, Googlebot y bingbot reciben **HTTP 200 y exactamente 1 656 palabras**, idéntico a un navegador. Nada del contenido que importa depende de JS, no hay cloaking y ningún bot de IA está bloqueado. Esta es la base sobre la que descansa todo lo demás y está sólida.
- **Lighthouse escritorio: rendimiento 96, accesibilidad 100, SEO 100, mejores prácticas 100.** LCP 1,3 s, CLS 0, TBT 0 ms.
- **La falla de contraste del pase anterior está corregida y verificada.** `--text-muted` pasó de `#6c7869` a `#63705f`: **4,55:1** contra `--surface-muted` (antes 4,04:1). Pasa AA. Cero violaciones de contraste en axe sobre las 8 combinaciones página/viewport.
- **El arranque del texto sí responde la consulta.** En las primeras ~60 palabras visibles aparece *"La plataforma de administración de condominios en Costa Rica. Cuotas, anuncios, reservas y mensajería en un solo lugar."* Eso es exactamente lo que un extractor generativo necesita leer temprano. El hueco de keywords del 2026-09-10 está cerrado.

---

# A. SEO clásico

## A1 · No hay evidencia de que Search Console esté conectado — ALTA

**Inferido, con tres negativos independientes.** No hay `<meta name="google-site-verification">` en el `<head>` de producción; no existe `metadata.verification` en todo `src/`; y **el dominio no tiene ningún registro TXT** (consultado por DoH: `(sin TXT)`).

Ninguno de los tres es prueba — GSC también se verifica vía la propiedad de Google Analytics, y GA4 se acaba de agregar hoy con la misma cuenta de Google, así que ese camino quedó abierto justo ahora.

**Por qué encabeza la lista igual.** El cuello de botella del negocio es la distribución, y sin Search Console no tenés ninguna de las cuatro cosas que dicen si la distribución está funcionando: **qué consultas te traen gente**, **qué páginas están realmente indexadas**, **datos de campo reales de Core Web Vitals** (CrUX, que es la señal de ranking; Lighthouse es solo una estimación de laboratorio), y la posibilidad de **pedir indexación** de `/como-empezar`, que se publicó hoy. Es la única herramienta de esta lista que no se puede recuperar hacia atrás: los datos empiezan el día que la conectás, no el día que se publicó la página.

- **Cómo comprobarlo en 30 segundos**: abrí `search.google.com/search-console` y mirá si `livvaadmin.com` aparece como propiedad.
- **Si no está**: verificá por la propiedad de GA4 (es un clic, ya existe) o por TXT en DNS, y enviá el sitemap.
- **Me equivoco si**: ya está conectado por el método de Google Analytics o por archivo HTML. En ese caso no hay nada que hacer más que mirar el informe de cobertura.

## A2 · `AggregateOffer` publica ₡1 600–1 700 sin decir que es *por unidad* — ALTA

**Medido.** El JSON-LD en vivo dice, literal:

```json
"offers": { "@type": "AggregateOffer", "priceCurrency": "CRC",
            "lowPrice": 1600, "highPrice": 1700, "offerCount": 3 }
```

`src/app/layout.tsx:66-72`. En schema.org eso significa **"este producto cuesta entre ₡1 600 y ₡1 700"**, sin unidad y sin periodicidad. Un condominio de 45 filiales paga del orden de **₡74 000 al mes**. La página lo dice bien (*"₡1 700 / unidad / mes"*, más el `rateExplainer` que existe justamente porque el modelo graduado se malinterpreta); los datos estructurados no.

El comentario del archivo argumenta que es honesto porque son las tarifas publicadas reales. Es honesto **para un humano que lee la tarjeta**. Un rich result o un asistente que cite este bloque va a responder *"Livva cuesta ₡1 700 al mes"*, que es un error de ~40× — y ese es exactamente el tipo de cifra que después alguien te reclama en una llamada.

Hay un tipo para esto y no hace falta inventar nada: `UnitPriceSpecification` con `referenceQuantity` (`unitText: "unidad habitacional"`) y `billingIncrement`/`unitCode: "MON"`. Deja el número igual y agrega lo que le falta: *por qué cosa* y *cada cuánto*.

- **Me equivoco si**: preferís deliberadamente el ancla baja en los resultados enriquecidos. Es una decisión comercial defendible, pero conviene tomarla a propósito y no por omisión del esquema — y tiene un costo real si un asistente repite la cifra fuera de contexto.

## A3 · El `.vercel.app` sigue devolviendo 200 e indexable — BAJA

**Medido.** `https://livva-web.vercel.app/` responde **200**, sin `X-Robots-Tag`, y su `robots.txt` dice `Allow: /`. Lo que salva la situación es que **su `<link rel="canonical">` apunta correctamente a `https://livvaadmin.com`**, medido en vivo.

Un canonical entre dominios es una *pista*, no una directiva: Google casi siempre la respeta, pero puede ignorarla. Con un solo host real y cero backlinks al `.vercel.app`, el riesgo es chico.

- **Arreglo, si se quiere cerrar del todo**: en `src/proxy.ts` (ya existe, hoy solo maneja mantenimiento) un redirect 308 cuando `host` no es el canónico.
- **Me equivoco si**: usás el `.vercel.app` para compartir el sitio, o si algún flujo depende de ese host. También hay que respetar los hosts de preview, que sí necesitan seguir sirviendo.

## A4 · `/como-empezar` tiene un solo enlace interno en todo el sitio — MEDIA

**Medido**, contando anchors en el HTML servido de las 4 páginas:

| Página destino | Enlaces entrantes desde una subpágina |
|---|---|
| `/preguntas-frecuentes` | 2 (nav + pie) |
| `/livva-vs-excel-whatsapp` | 2 (nav + pie) |
| `/como-empezar` | **1 (solo nav)** |

El `Footer.tsx:18-21` trae un comentario que dice, textual, que los enlaces están ahí *"so both are always crawlable/discoverable regardless of entry point"* — y `/como-empezar`, publicada hoy, no se sumó. Es una línea.

**El hallazgo más grande está debajo de ese**: ninguna de las tres páginas de contenido enlaza en su cuerpo a ninguna otra. Cero. Son un clúster temático — la comparativa termina de convencer, "cómo empezar" desarma la objeción de adopción, el FAQ cierra las dudas sueltas — y hoy están aisladas entre sí, conectadas nada más por la barra de navegación, que es el enlace con menos peso semántico que existe. Quien termina de leer la comparativa está en el punto exacto de máxima intención y no tiene a dónde ir.

- **Me equivoco si**: preferís que la única salida de esas páginas sea el CTA de demo. Es defendible para conversión, pero se pueden tener las dos cosas: un enlace contextual al final no compite con un CTA que está en el medio.

## A5 · Todo el sitio comparte una sola imagen OG — BAJA

**Medido.** Las tres subpáginas sirven el mismo `og:image` que el home. Un enlace a la comparativa compartido por WhatsApp — que es *el* canal donde esto se comparte en Costa Rica — se ve idéntico a un enlace al home. La convención de archivo de Next hace esto trivial: un `opengraph-image.png` dentro de la carpeta de la ruta y listo.

- **Me equivoco si**: el tráfico compartido es marginal frente al orgánico. Dado que la distribución hoy pasa por LinkedIn y WhatsApp, apuesto a que no lo es.

---

# B. GEO / visibilidad en buscadores generativos

Separado a propósito del bloque anterior: una página puede ser impecable para Google y aun así no ser la que un asistente cita, y al revés.

## B1 · `Organization` no tiene `sameAs`, y ya existen perfiles que conectar — ALTA

**Medido**: el bloque `Organization` (`src/app/layout.tsx:49-55`) tiene `name`, `url` y `logo`, y **nada más**. Sin `sameAs`, sin `areaServed`, sin `description`, sin datos de contacto.

**Medido también**: en `C:\livva-social-presence\content\calendario.md` consta que desde el 2026-09-10 existen **cuenta profesional de Instagram y página de Facebook conectadas**, y que **el canal principal es LinkedIn**. Ninguno de los tres aparece en `sameAs` — y tampoco en el pie del sitio.

Por qué esto pesa más de lo que parece: la investigación actual sitúa alrededor del **85% de las menciones de marca dentro de respuestas generadas por IA en páginas de terceros**, no en el sitio propio. Acabás de empezar a producir exactamente esas páginas de terceros. `sameAs` es el mecanismo estándar por el que un motor reconcilia "este sitio, esta página de LinkedIn y este perfil de Instagram son la misma organización". Sin él, cada pieza que publiques en LinkedIn construye autoridad para una entidad que los sistemas no conectan con livvaadmin.com. **Es el cambio de mejor relación esfuerzo/impacto de todo este reporte**: son cuatro líneas, y su valor crece con cada post que publiques, no al revés.

Junto con eso, y en el mismo bloque: `areaServed: {"@type":"Country","name":"Costa Rica"}` e `inLanguage: "es-CR"` son ciertos, verificables y son justamente el tipo de afirmación estructurada que decide si un asistente te incluye al responder *"¿qué app hay para administrar un condominio en Costa Rica?"*.

- **Me equivoco si**: los perfiles todavía están vacíos o a medio armar. Un `sameAs` que apunta a un perfil sin publicaciones no ayuda y puede restar — en ese caso, agregá solo los que ya tienen contenido, y el resto cuando lo tengan.

## B2 · El producto creció y los datos estructurados siguen describiendo el de hace dos semanas — ALTA

`SoftwareApplication` no tiene **`featureList`**. Es el campo hecho justamente para esto: la lista legible por máquina de lo que el producto hace. Hoy lo único que un extractor tiene para saber qué es Livva es la `description` de una línea, que nombra cuatro módulos de los diez que existen.

**Medido sobre el HTML en producción de las 4 páginas**, buscando lo que mencionaste que el producto ganó:

| Término | Apariciones |
|---|---|
| `caseta` | 14 |
| `asamblea` | 26 |
| `condominio` | 142 |
| `Costa Rica` | 44 |
| **`coeficiente`** | **0** |
| **`proporcional`** | **0** |
| **`prorrate…`** | **0** |
| **`desglose`** | **0** |
| **`propiedad horizontal`** | **0** |
| **`ley 7933`** | **0** |
| **`morosidad`** | **0** |
| **`quórum`** | **0** |
| `varios condominios` | 2 |

El pase de contenido del 2026-09-11 sí metió caseta, asamblea, rondas y visitantes — eso funcionó. **Lo que quedó afuera es lo que me señalaste hoy, y es lo más valioso de los dos.**

### B2a · El reparto proporcional al peso por unidad no existe en el sitio

Cero menciones de `coeficiente`, `proporcional` o `desglose`, y cero de `propiedad horizontal` o `ley 7933`.

Esto no es una función más. Es **un requisito legal** — en Costa Rica la cuota se reparte según el coeficiente o porcentaje de cada filial, no en partes iguales, y lo mismo rige en Colombia y en Chile. Tiene tres consecuencias que se acumulan:

1. **Es una consulta de altísima intención con vocabulario propio.** Alguien que escribe *"cómo se calcula la cuota de condominio"* o *"coeficiente de copropiedad"* está exactamente en el problema que Livva resuelve. Hoy el sitio no puede aparecer ahí: no contiene las palabras.
2. **Es la pregunta que decide una compra, no la que la acompaña.** Una junta directiva que reparte por coeficiente y evalúa una herramienta que reparte en partes iguales, descarta. Que el sitio no lo diga significa que se pierden compradores calificados en silencio, sin formulario y sin señal.
3. **Es la mejor materia prima de GEO que tiene el producto.** Una explicación de cómo se calcula una cuota, con el desglose línea por línea, es exactamente la forma de contenido que un motor generativo cita: pregunta concreta, respuesta verificable, con anclaje legal.

Y hay un cuarto motivo, más estratégico: el mismo requisito existe en **Colombia y Chile**. Una página sobre el cálculo proporcional es el único contenido de este sitio que rankea fuera de Costa Rica sin reescribirse.

### B2b · "Varios condominios" es una viñeta y una nota al pie

Aparece 2 veces: un ítem en `Pricing.tsx:23` y una línea bajo la grilla (`Pricing.tsx:101`). Pero es **otro comprador** — una administradora con varios edificios, más unidades, más presupuesto y un ciclo de decisión distinto del de una junta directiva. La página de precios ya lo invita por su nombre (*"¿Administrás varios condominios?"*) sin tener nada que mostrarle. `software para administrar varios condominios` es una consulta propia y no hay nada en el sitio que la responda.

- **Me equivoco en todo B2 si**: el piloto del lunes y los próximos clientes salen de referidos y de LinkedIn, y el orgánico no es el canal de los próximos meses. Entonces esto es inversión a 3–6 meses y no compite con nada del lunes. Lo pongo en ALTA por valor, no por urgencia — y lo separo en el cierre.

## B3 · El carrusel duplica el 19% del texto del home — MEDIA

**Medido.** `Features.tsx:26` duplica el arreglo (`LOOP = [...FEATURES, ...FEATURES]`) para que el desplazamiento infinito empalme, y `Features.tsx:124` renderiza las 20 tarjetas **sin `aria-hidden` en la segunda mitad**. Verificado sobre el HTML servido: las 10 copias aparecen **2 veces cada una**, ~320 de 1 656 palabras.

Dos efectos, uno por carril:

- **GEO**: un extractor que resume el home ve cada función dos veces. No es penalización — los buscadores deduplican — pero diluye la densidad de la página y le quita señal a lo que sí es único.
- **Accesibilidad**: un lector de pantalla anuncia las diez funciones, completas, dos veces seguidas. Esto axe no lo detecta (la duplicación no es automáticamente detectable) y por eso no aparece en el bloque D.

El arreglo no toca el comportamiento visual: `aria-hidden="true"` en la segunda mitad. La técnica del carrusel es correcta y no hay que cambiarla.

- **Me equivoco si**: `ui-ux` propone rehacer el carrusel por otros motivos. En ese caso esto se resuelve de paso y no vale la pena tocarlo dos veces — coordinen antes.

---

# C. La analítica que se agregó hoy

Tres preguntas concretas. Las tres tienen respuesta medida.

## C1 · Rendimiento: GA4 cuesta el 61% del tiempo de bloqueo — ALTA

**Medido**, Lighthouse móvil contra producción, con una corrida contrafactual bloqueando `googletagmanager.com` y `cloudflareinsights.com`:

| Métrica (móvil) | Con analítica | Bloqueada | Δ |
|---|---|---|---|
| Rendimiento | **84** | **93** | +9 |
| **TBT** | **510 ms** | **200 ms** | **−310 ms (−61%)** |
| Tiempo hasta interactivo | 4,6 s | 2,6 s | −2,0 s |
| Trabajo en hilo principal | 3,4 s | 2,5 s | −0,9 s |
| Arranque de JS | 1,7 s | 0,9 s | −0,8 s |
| LCP | 2,5 s | 2,6 s | igual (ruido) |
| CLS | 0 | 0 | igual |

Y la atribución, del mismo informe:

```
bootup-time:  gtag/js                475 ms total / 411 ms scripting
              beacon.min.js (CF)     101 ms total /  88 ms scripting
long-tasks:   gtag/js                271 ms   <- 2.a tarea larga de la pagina
              gtag/js                181 ms   <- 4.a
              beacon.min.js           67 ms
```

**GA4 genera dos de las cuatro tareas largas de la página, 452 ms entre las dos.** Cloudflare aporta 67 ms — un sexto.

Lo importante de por qué esto vale la pena resolver: **TBT es el proxy de laboratorio de INP**, y el umbral de INP es **200 ms en el percentil 75 de usuarios reales**. Una tarea larga de 271 ms bloquea el hilo principal durante ese tiempo; si alguien toca "Iniciar demo" dentro de esa ventana, el toque espera. En una página de marketing la interacción principal ocurre justo en los primeros segundos, que es exactamente cuando `afterInteractive` está ejecutando.

**Lo que NO pasó, y conviene decirlo**: LCP y CLS no se movieron. `strategy="afterInteractive"` está bien elegida para eso. El problema es de *respuesta*, no de pintado.

- **Arreglo**: bajar GA4 a `strategy="lazyOnload"` (`src/app/layout.tsx:112`), que lo corre después del evento `load`, cuando el hilo ya está libre. Alternativa más limpia: `@next/third-parties/google`, que es el componente oficial y ya trae esa decisión tomada.
- **Me equivoco si**: te importa medir rebotes muy cortos. Con `lazyOnload`, quien abre y cierra antes del `load` no se cuenta — GA4 subestimaría las sesiones más breves. Es un intercambio real: medición completa contra capacidad de respuesta. Yo elegiría respuesta en una landing cuyo trabajo es que aprieten un botón, pero es tu llamada. **Lo que sí es medible es el costo actual: 310 ms.**
- **Caveat honesto**: una corrida de Lighthouse por escenario, con estrangulamiento simulado. La varianza de TBT entre corridas es real (±20–30%). Una brecha de 310 ms queda muy afuera de ese ruido, y la atribución por tarea larga la confirma por un camino independiente.

## C2 · Consentimiento: dos cookies persistentes, cero menciones en el sitio — ALTA

**Medido** con Playwright, primera visita limpia, sin interactuar con nada:

```
cookies:  _ga             .livvaadmin.com   expira 2027-10-17
          _ga_FC8FCL580Q  .livvaadmin.com   expira 2027-10-17
terceros: googletagmanager.com, google-analytics.com,
          static.cloudflareinsights.com
```

**Medido también**: `grep` por `cookie|analytic|google|rastreo|seguimiento` en todo `src/` devuelve **únicamente comentarios de código**. Cero texto visible para el usuario. Ni en `LegalModal.tsx`, ni en `Security.tsx`, ni en ningún lado.

Contra eso, el sitio afirma hoy, en dos lugares:

> *"No compartimos ni vendemos tu información personal a terceros con fines publicitarios"* — `Security.tsx:10` y `LegalModal.tsx:140`
>
> *"Conforme a la **Ley 8968** de Costa Rica, podés acceder, rectificar, cancelar y oponerte al uso de tus datos personales"* — `Security.tsx`

**Una buena noticia, medida**: no observé **ninguna** petición a `doubleclick.net` ni a `googleadservices.com`. O sea, Google Signals / personalización de anuncios aparenta estar **apagado** en la propiedad. Eso sostiene la afirmación de "con fines publicitarios" tal como está hoy.

Con eso dicho, quedan dos cosas:

1. **Esa configuración vive en el panel de GA4, no en este repo.** Alguien la puede encender con un clic, sin tocar código, sin PR, sin que nadie lo note — y en ese momento la frase de la página deja de ser cierta. Vale la pena dejarlo anotado donde se vea (en el `CLAUDE.md`, no solo acá) y verificar que efectivamente esté apagado en la propiedad.
2. **No hay ninguna divulgación.** Se establecen dos cookies persistentes a 13 meses y se envía la visita a Google, y el sitio no lo menciona en ninguna parte. Si un cookie banner es *estrictamente* exigible en Costa Rica es genuinamente discutible — la PRODHAB no ha construido un régimen de banners como el europeo, y **no voy a afirmar que estás incumpliendo, porque no lo sé y no es mi campo**. Pero hay una asimetría que sí es evidente sin abogados: **este sitio hace de la protección de datos un argumento de venta** — tiene una sección entera, seis tarjetas y un modal legal — y omite lo único que hace con los datos de quien lo está leyendo en ese momento. Eso es una inconsistencia del propio sitio consigo mismo, antes que un tema regulatorio.

- **Arreglo mínimo y proporcionado**: un párrafo en el modal de Seguridad diciendo qué se mide, con qué, que las cookies son de medición y no de publicidad, y cómo optar por no participar. Sin banner. Es honesto, es barato y es coherente con el tono que el sitio ya tiene. **Y no cuesta nada de rendimiento.**
- **Me equivoco si**: tu contador o un abogado dice que 8968 sí exige consentimiento previo para analítica de terceros, en cuyo caso hace falta un mecanismo de consentimiento real y no un párrafo. Vale preguntarlo, igual que se preguntó lo del IVA.
- **Fuera de mi carril, una línea**: el dominio no tiene **ningún** registro TXT, así que tampoco tiene SPF ni DMARC. Los correos salen de `livvaadmin.info`, así que probablemente no importa — pero un dominio sin DMARC es suplantable. Se lo paso a `security`, no lo analizo acá.

## C3 · Duplicación de medición: no hay doble conteo, hay dos números que nunca van a coincidir — MEDIA

**Medido**: GA4 y Cloudflare son sistemas independientes. Ningún evento se dispara dos veces dentro de ninguno de los dos. **No existe el problema de doble conteo.**

El problema real es otro y es de reconciliación:

- **GA4 está limitado a producción** (`layout.tsx:110`, `process.env.VERCEL_ENV === "production"`). Correcto y bien argumentado en el comentario.
- **El beacon de Cloudflare no tiene esa guarda** — corre en toda deployment, previews incluidas. El comentario del archivo lo reconoce ("Cloudflare's beacon predates this guard and still has that problem"), lo cual es honesto, pero sigue sin arreglarse.

Consecuencia concreta y **cruzada de repo**: el tab "Sitio web" del panel maestro en `Condo-Admin-Tool` lee Cloudflare por `siteTag`, **sin filtro de hostname** (`src/lib/analytics/cloudflareWebAnalytics.ts`). Así que las visitas que ese panel muestra incluyen tráfico de previews y del alias `.vercel.app` — es decir, incluyen **las pruebas de ustedes mismos**. Para un negocio cuyo cuello de botella es la distribución, ese es precisamente el número que no puede estar inflado: es el que dice si algo funcionó.

- **Arreglo**: misma guarda de entorno para el beacon de Cloudflare, o un filtro por hostname en la consulta GraphQL del lado del panel maestro. La segunda opción es mejor: arregla también los datos históricos ya recogidos, en vez de solo los futuros.
- **Me equivoco si**: ya filtrás por hostname en el panel de Cloudflare al mirarlo a mano. Eso sirve para mirar, pero no para el tab del panel maestro, que consulta la API.
- **Aparte**: los dos van a diferir igual por diseño (Cloudflare es sin cookies y cuenta visitas; GA4 usa cookies y las pierde con bloqueadores, típicamente 10–30% menos). **Eso es esperado, no un bug.** Elegí uno como número oficial — sugiero Cloudflare para volumen, GA4 para comportamiento y atribución, que es exactamente la división que el comentario del layout ya plantea.

---

# D. Accesibilidad (WCAG)

**Medido**: axe-core, 4 páginas × 2 viewports, reglas `wcag2a/2aa/21a/21aa/22aa`.

| Página | Móvil (390) | Escritorio (1440) |
|---|---|---|
| `/` | **1** | **1** |
| `/preguntas-frecuentes` | 0 | 0 |
| `/livva-vs-excel-whatsapp` | 0 | 0 |
| `/como-empezar` | 0 | 0 |

Lighthouse reporta accesibilidad **100** en ambos factores de forma. Es un resultado muy bueno; las tres páginas de contenido están limpias.

## D1 · El carrusel de funciones no es alcanzable por teclado — MEDIA (serio)

**Medido**, la única violación del sitio, en ambos viewports:

```
[serious] scrollable-region-focusable  ->  .cursor-grab
          "Element should have focusable content"
```

`Features.tsx:116`. El track es `overflow-x-auto` sin `tabindex` y sin contenido enfocable adentro (las tarjetas no tienen enlaces). Incumple **WCAG 2.1.1 (Teclado, nivel A)**: una región desplazable que no se puede desplazar con teclado.

Lo que lo empeora, y no lo dice axe: las flechas de navegación existen solo desde `tablet:` (1000px) **hacia arriba**. Por debajo de eso no hay flechas *ni* teclado — el único acceso es el gesto táctil. Quien navega con teclado en una pantalla angosta no tiene ninguna vía.

Atenúa el impacto que el contenido **sí está en el DOM y no está `aria-hidden`**, así que un lector de pantalla lo lee entero en orden (dos veces, ver B3). O sea: se puede *leer*, no se puede *manejar*.

- **Arreglo**: `tabIndex={0}` y un `role="region"` con `aria-label` en el track. Es la corrección que la propia regla de axe sugiere y no cambia nada visual.
- **Me equivoco si**: `ui-ux` va a rehacer el carrusel. Mismo caso que B3 — coordinen para no tocarlo dos veces.

---

# E. Antes del lunes, y lo que puede esperar

El lunes le mostrás la app a un administrador real. **Nada de este reporte bloquea esa reunión** — el sitio está técnicamente sano y ninguno de los hallazgos rompe nada visible. Lo de abajo está ordenado por lo que compra distribución, que es lo que pediste.

## Antes del lunes — vale la pena, y todo suma menos de una hora

| # | Qué | Por qué ahora |
|---|---|---|
| **A1** | Comprobar si Search Console está conectado; si no, conectarlo y enviar el sitemap | **Lo único que no se recupera hacia atrás.** Los datos empiezan el día que lo conectás. `/como-empezar` se publicó hoy y podés pedir su indexación. Si ya está, son 30 segundos y seguís. |
| **B1** | `sameAs` con LinkedIn / Facebook / Instagram, más `areaServed` e `inLanguage`, en `Organization` | Cuatro líneas. LinkedIn es tu canal principal y **hoy construye autoridad para una entidad que nadie conecta con este sitio**. Cuanto antes se conecte, más piezas quedan del lado correcto. |
| **C1** | GA4 a `lazyOnload` | **310 ms de TBT medidos, el 61% del total.** Un cambio de una palabra. Leé el intercambio en C1 antes: perdés los rebotes más cortos. |
| **C2** | Un párrafo sobre medición en el modal de Seguridad | El sitio vende protección de datos y no dice lo único que hace con los del visitante. Cero costo de rendimiento, y cierra una incoherencia que un comprador puntilloso puede notar. |
| **A4** | `/como-empezar` en el pie | Una línea, y el comentario que ya está en el archivo dice que debería estar. |

## Puede esperar — semanas, y vale más a mediano plazo

| # | Qué | Nota |
|---|---|---|
| **A2** | `UnitPriceSpecification` en el `AggregateOffer` | Arregla una cifra que hoy se puede citar mal por ~40×. No es urgente porque hace falta que alguien la cite primero. |
| **B2a** | **Contenido sobre el cálculo proporcional de la cuota** (coeficiente, desglose línea por línea, anclaje en propiedad horizontal) | **La mayor oportunidad de contenido del sitio, y no es código: es una decisión tuya de qué publicar.** Consulta de alta intención, vocabulario legal que hoy aparece 0 veces, y el único contenido que rankea también en Colombia y Chile sin reescribirse. |
| **B2b** | Algo real para "varios condominios" | Otro comprador, más grande. La página de precios ya lo invita por su nombre y no tiene nada que mostrarle. |
| **B2** | `featureList` en `SoftwareApplication` | Barato, pero conviene hacerlo *después* de decidir B2a/B2b para que la lista describa el producto completo de una sola vez. |
| **D1 + B3** | `tabIndex` y `aria-hidden` en el carrusel | Dos líneas. **Esperar a que `ui-ux` decida si el carrusel se queda** — si lo rehacen, se resuelve de paso. |
| **A5** | Imagen OG por página | Se comparte mucho por WhatsApp; hoy los tres enlaces se ven iguales. |
| **A3** | Redirigir el `.vercel.app` | Riesgo bajo: el canonical entre dominios ya lo cubre casi siempre. |
| **C3** | Guarda de entorno al beacon de Cloudflare, o filtro por hostname en el panel maestro | Toca `Condo-Admin-Tool`. **El número que el panel maestro muestra hoy incluye sus propias pruebas.** |

## Lo que no puedo hacer yo, y es lo que más mueve la aguja

Fuera de este repo, y por eso lo reporto en vez de implementarlo:

- **Perfil de Empresa en Google**, completo, con categoría y área de servicio Costa Rica. Barato, alto impacto en búsqueda local, y hoy no puedo verificar si existe.
- **Presencia en directorios de terceros** (cámaras, directorios de proveedores para condominios, listados de software). Alrededor del **85% de las menciones de marca dentro de respuestas de IA salen de páginas de terceros, no del sitio propio.** Optimizar solo las páginas propias deja la mayor parte de ese canal sin tocar. Es trabajo de distribución, no de código — y encaja exacto con la conclusión del benchmark.
- **Consistencia de nombre y contacto** entre el Perfil de Empresa, el pie del sitio y cualquier directorio.

---

## Índice de hallazgos

| # | Hallazgo | Carril | Severidad | Evidencia | Archivo |
|---|---|---|---|---|---|
| A1 | Sin evidencia de Search Console | Clásico | Alta | Inferido (3 negativos) | — |
| A2 | `AggregateOffer` sin unidad ni periodicidad | Clásico | Alta | Medido | `layout.tsx:66-72` |
| A3 | `.vercel.app` indexable (canonical lo cubre) | Clásico | Baja | Medido | `proxy.ts` |
| A4 | `/como-empezar` con 1 enlace; clúster sin enlaces internos | Clásico | Media | Medido | `Footer.tsx:18-21` |
| A5 | Una sola imagen OG para todo el sitio | Clásico | Baja | Medido | `app/*/` |
| B1 | `Organization` sin `sameAs`, con perfiles ya creados | GEO | Alta | Medido | `layout.tsx:49-55` |
| B2 | Sin `featureList`; cuota proporcional y multi-condominio ausentes | GEO | Alta | Medido | `layout.tsx:56-73` |
| B3 | 19% del texto del home duplicado, sin `aria-hidden` | GEO + a11y | Media | Medido | `Features.tsx:26,124` |
| C1 | GA4 = 310 ms de TBT (61%) | Rendimiento | Alta | Medido + contrafactual | `layout.tsx:112` |
| C2 | Dos cookies a 13 meses, sin divulgación alguna | Cumplimiento | Alta | Medido | `LegalModal.tsx:138` |
| C3 | Beacon de Cloudflare sin guarda de entorno | Medición | Media | Medido | `layout.tsx:91` |
| D1 | Carrusel inalcanzable por teclado (WCAG 2.1.1) | WCAG | Media | Medido (axe) | `Features.tsx:116` |

**Cerrado desde el pase anterior**: contraste de `--text-muted` (4,04 → **4,55:1**, pasa AA) y LCP móvil (3,6 s → **2,5 s**, gracias a la migración a `next/image`).
