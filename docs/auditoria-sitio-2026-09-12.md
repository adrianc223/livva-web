# Auditoría del sitio: qué sobra, qué falta y qué imagen está mintiendo

**Fecha:** 2026-09-12 · **Autor:** agente `ui-ux` · **Alcance:** `livvaadmin.com` (las 4 páginas)
**Estado:** auditoría, no ejecutada. No se cambió una línea de código.

**Contexto que ordena las prioridades:** el lunes se le enseña la aplicación a un administrador
real que va a ser el piloto. El sitio es lo que ve alguien a quien le recomiendan Livva, y hoy no
hay ni un cliente que mostrar. Todo lo que sigue está ordenado por esa pregunta: *¿qué haría
dudar, o qué desperdiciaría el argumento más fuerte, a alguien que llega recomendado?*

---

## 0. El veredicto en un párrafo

**El sitio no está viejo — está desincronizado en el único lugar donde más duele.** Las funciones
nuevas de hace dos semanas (visitantes, caseta, rondas, asambleas, documentos, mantenimiento) ya
están puestas, con capturas reales y afirmaciones concretas: ese trabajo del 2026-09-11 quedó
bien. Lo que pasó después es que el producto ganó, en 24 horas, **la ventaja que el propio
benchmark había marcado como la única que la competencia no puede copiar sin reescribir su
núcleo** — la cuota que se explica sola, más el reparto proporcional — y el sitio no la menciona
ni una vez. Al mismo tiempo, **el sitio sigue contando, en tres lugares, la versión del flujo de
pagos que el producto reemplazó a propósito**, y en un cuarto lugar cuenta la versión nueva. O
sea: la página discute consigo misma sobre el tema que decide la compra. Y una captura muestra
tres iconos de "imagen rota".

---

## 1. Método y calidad de la evidencia

Se manejó el sitio de verdad, en `localhost:3001` sobre la rama `main` sin cambios locales.

- **Anchos:** 375, 820 y 1440 px — los dos breakpoints reales del proyecto (`mobile` 720,
  `tablet` 1000) y una banda a cada lado.
- **Temas:** claro y oscuro (`colorScheme`), en el home. El sitio no tiene interruptor manual;
  hereda `prefers-color-scheme`.
- **Páginas:** `/`, `/livva-vs-excel-whatsapp`, `/como-empezar`, `/preguntas-frecuentes`.
- **Conteos de términos** hechos sobre el **texto renderizado** (`innerText` del `body`), no sobre
  el código fuente, para no contar comentarios ni props.
- Playwright 1.63 instalado en el scratchpad de la sesión, nunca como dependencia del proyecto.
- También se manejó la aplicación real (`localhost:3000`, condominio showcase, cuenta
  `+demo-res2`) para ver con qué se vería exactamente una captura nueva, en vez de proponerla a
  ciegas.

| Nivel | Qué significa |
|---|---|
| **MEDIDO** | Lo ejecuté y tengo el número o la captura |
| **INFERIDO** | Derivación mía a partir de lo anterior, marcada como tal |

**Lo que no hice, y por lo tanto no afirmo:** no medí Core Web Vitals de campo (eso es del agente
`seo`), no declaro cumplimiento WCAG de contraste, y no hablé con ningún comprador. Todo juicio
sobre *qué convence* es inferencia apoyada en el benchmark del 2026-09-12 y en las heurísticas de
Nielsen, no en observación de usuarios.

---

## 2. Lo que está bien y no hay que tocar

Conviene decirlo primero, porque la lista de abajo es larga y no debe leerse como que el sitio
está mal.

- **El carrusel de funciones (10 tarjetas) está al día y es bueno.** Visitantes, bitácora,
  asambleas, documentos y mantenimiento están con captura real y con afirmaciones verificables
  ("la cédula y la placa se borran solas a los 90 días", "un voto por filial", "el conteo no se ve
  hasta que la votación cierra"). Eso es exactamente lo que un motor generativo cita.
- **`desktop-cuotas.png` es la mejor captura del sitio y está vigente.** MEDIDO: muestra
  `LV-RZHQE-2609 SINPE` junto a un pago por revisar, con Confirmar / Rechazar — que es
  literalmente lo que dice la tarjeta de Cuotas. Imagen y texto se respaldan.
- **Precios.** La calculadora, el IVA incluido, el `rateExplainer` del tramo graduado y la banda
  "Todas las funciones, en todos los planes" están correctos y ya nombran Portafolio, Visitantes,
  Asambleas, Documentos y Mantenimiento.
- **"Cómo empezar" antes de "Funciones"** sigue siendo el orden correcto y la fusión con
  `DemoPromo` se sostiene.
- **Cero desbordes horizontales.** MEDIDO en 375 / 820 / 1440, en las cuatro páginas:
  `scrollWidth === innerWidth` en todos los casos.
- **Objetivos táctiles.** MEDIDO: los CTA del hero y del header miden 44–48 px de alto en 375.
- **El modo oscuro del sitio funciona y es coherente.** MEDIDO a 1440 y 375.
- **El encabezado pegajoso no tapa el eyebrow del hero.** MEDIDO a 375: el header termina en
  y=77 y el `h1` arranca en y=177. (Lo menciono porque en una captura recortada por sección
  *parece* que lo tapa, y es un artefacto del recorte, no un defecto.)

---

## 3. Imágenes: lo que miente y lo que quedó viejo

Las 19 capturas de `public/screenshots/` se tomaron **todas el 2026-09-11** (MEDIDO con
`git log` por archivo). Tres cosas del producto cambiaron el 2026-09-12, después de esa captura.

### 3.1 — `desktop-marketplace.png` muestra tres iconos de imagen rota · ROMPE LA PRIMERA IMPRESIÓN

**Archivo:** `public/screenshots/desktop-marketplace.png` → usado en
`src/components/landing/Features.tsx:20`.

**MEDIDO abriendo el PNG:** la captura contiene **tres marcos de producto con el icono de
"imagen ausente"** (`Clase individual 1 hora`, `Canasta familiar grande`, `Canasta semanal`) y
**cero fotos reales**. Es exactamente el defecto que el benchmark registró el mismo día (§3.5b:
"1 imagen real contra 10 placeholders") y que la aplicación **ya corrigió** — commit `824d0c8`,
*"El Marketplace del showcase deja de ser una pared de placeholders"*, del 2026-09-12. La captura
se tomó un día antes del arreglo.

**Por qué esto es lo más caro de la lista y no un detalle:**

1. El Marketplace es **lo único que el hero pone en negrita** ("más un **marketplace interno**
   entre vecinos que no vas a encontrar en otra parte"). La única afirmación diferenciadora
   resaltada del hero está ilustrada, 3 200 px más abajo, por el símbolo universal de *fallo al
   cargar*.
2. Un visitante que no lee el pie de la tarjeta no lee "el condominio todavía no subió fotos":
   lee **"a este sitio se le rompieron las imágenes"**. Y el pie de la sección dice, en grande,
   *"Capturas reales de la aplicación — no maquetas"*, lo que confirma la lectura equivocada.
3. Es gratis de arreglar. `scripts/capture-screenshots.mjs` ya existe y el showcase ya tiene
   fotos reales desde ayer.

**Arreglo:** recorrer `scripts/capture-screenshots.mjs` de nuevo. No hay decisión de diseño acá.

**Estaría equivocado si:** el commit `824d0c8` solo hubiera sembrado fotos en algunos comercios y
la pantalla de Marketplace siguiera mostrando placeholders. **Verificable en 30 segundos** abriendo
`/?page=Marketplace` en el showcase antes de recapturar.

### 3.2 — Ninguna captura muestra el desglose de la cuota · ROMPE LA PRIMERA IMPRESIÓN (por omisión)

No es una imagen que mienta: es **la imagen que falta**, y es la del argumento más fuerte que
tiene el producto.

MEDIDO manejando la aplicación como `adrian.chaves.bermudez+demo-res2` (Torre A 102, en mora):
la tarjeta de **Agosto 2026** despliega, bajo *"¿De dónde sale este monto?"*:

```
Cuota de Agosto 2026                                    ₡ 52 000
Recargo por atraso (10%)                                 ₡ 5 200
  Se aplica desde el día 5 de cada mes, contando el día
  de pago como el primero de los 5 días de gracia
──────────────────────────────────────────────────────────────
Total                                                   ₡ 57 200
```

Eso es, textualmente, la respuesta a la queja mejor documentada contra el líder regional
(ComunidadFeliz, mayo 2025, 9 votos de útil: *"el sistema te pone como moroso… el sistema es
así"*). Y no existe en ninguna parte del sitio.

**Captura propuesta:** `public/screenshots/desktop-cuota-desglose.png` — vista de residente, mes
en Atraso, desglose abierto. Se reproduce con la cuenta de arriba. Ojo: el desglose está
**colapsado por defecto** (decisión correcta del producto), así que el script de captura tiene que
hacer clic en `¿De dónde sale este monto?` antes de disparar.

### 3.3 — Las 19 capturas están en modo claro; el modo oscuro no aparece ni se menciona · PULIDO MENOR, pero barato

**MEDIDO:** las 19 capturas son modo claro. **MEDIDO:** la palabra "oscuro" aparece **0 veces**
en el texto renderizado de las cuatro páginas.

El benchmark del 2026-09-12 midió el modo oscuro como la **única** dimensión visual donde Livva
está arriba **y sola** entre los seis competidores: *"Ninguno de los seis sitios lo ofrece;
ninguno lo menciona."* Tener la única ventaja visual exclusiva del grupo y no enseñarla es
desperdicio puro.

**Propuesta:** una sola captura en oscuro (el Resumen sirve) y una línea. No merece una sección.

### 3.4 — Tres capturas existen y no se usan · PULIDO MENOR

MEDIDO cruzando `public/screenshots/` contra `grep -rl` en `src/`:

| Archivo | Estado |
|---|---|
| `desktop-comercios.png` | sin usar |
| `mobile-asamblea.png` | sin usar |
| `mobile-visitantes.png` | sin usar |

`mobile-visitantes.png` no es peso muerto: es **exactamente el cuarto teléfono que le falta a
`MobileShowcase`** (ver §5.3).

---

## 4. El copy que contradice al producto — y a sí mismo

### 4.1 — El sitio cuenta, en tres lugares, el flujo de pagos que el producto reemplazó a propósito · ROMPE LA PRIMERA IMPRESIÓN

Esta es la más grave de todo el informe, porque cae sobre el dinero.

El 2026-09-11 el producto cambió deliberadamente de modelo. El `CLAUDE.md` de la aplicación lo
dice sin rodeos:

> *"A payer uploaded a screenshot of their own transfer and the reviewer approved it by looking at
> the picture. **That proves only that someone produced an image.**"*

Y sin embargo, MEDIDO hoy en el sitio:

| Dónde | Qué dice |
|---|---|
| `src/components/landing/ValueProps.tsx:6` | "Los residentes **suben su comprobante** y el administrador **confirma el pago en segundos**" |
| `src/components/landing/ComparisonPageContent.tsx:16` | "Cada residente **sube su comprobante** directo en la app; el administrador **confirma en segundos**" |
| `src/lib/faqs.ts:33` | "Cada residente sube **una foto o captura** de su comprobante… y el administrador lo **confirma en segundos**" |
| `src/components/landing/Features.tsx:12` | "El residente reporta su pago con **un código único** que vos buscás en tu estado de cuenta — **no una foto que solo prueba que alguien hizo una captura**" |

**Las tres primeras describen el producto viejo. La cuarta lo desmiente por nombre.** Y están en
la misma página: `ValueProps` está a y=1 138 y `Features` a y=3 279 en 375 px — dos pantallazos y
medio de distancia.

Esto rompe la heurística #4 de Nielsen (consistencia) de la peor manera posible: no son dos
estilos distintos, son **dos promesas incompatibles sobre cómo se cobra la plata**. Y la que un
lector encuentra primero — y la que queda en el FAQ, que es donde uno va a verificar — es la
peor de las dos.

Hay un daño extra, menos obvio: el argumento del código de conciliación es **fuerte** ("no una
foto que solo prueba que alguien hizo una captura"). Al ponerlo junto a tres párrafos que venden
justamente la foto, el sitio se contradice en el único terreno donde tenía una respuesta superior.

**Estaría equivocado si:** el "subir el comprobante" siguiera siendo el camino principal y el
código fuera opcional. **No lo es**: el adjunto sobrevive como *anexo opcional* dentro del mismo
modal, y el `CLAUDE.md` es explícito en que **la tabla es la cola** y el código es por lo que se
concilia. El copy viejo no es falso — es **la parte menos importante contada como si fuera toda
la historia**.

### 4.2 — La cuota que se explica sola no se menciona una sola vez · ROMPE LA PRIMERA IMPRESIÓN (por omisión)

**MEDIDO sobre el texto renderizado de las 4 páginas:**

| Término | Apariciones |
|---|---|
| `desglose` | **0** |
| `de dónde sale` | **0** |
| `línea por línea` | **0** |
| `se explica` | **0** |
| `recargo` | **0** |

Ese último es el que más sorprende. **El sitio nunca dice que la aplicación calcula el recargo por
atraso** — la cifra más discutida de cualquier condominio del país. Lo más cerca es "Cálculo
automático de cuotas y moras" en una tarjeta del carrusel ("mora" aparece 2 veces en todo el
sitio).

El benchmark del 2026-09-12 ranqueó esto **#1 de cuatro propuestas**, con esta justificación:

> *"Un número derivado puede explicarse a sí mismo; uno almacenado no. Esto no es una ventaja de
> esfuerzo, es una ventaja de arquitectura, y es la única de la lista que la competencia no puede
> copiar sin reescribir su núcleo."*

Se construyó (commits `dad5560` y `0d98612`), incluido el PDF que se le entrega al residente. Y no
se comunica en ningún lado.

### 4.3 — El reparto proporcional tampoco, y eso además abre un flanco legal · ROMPE LA PRIMERA IMPRESIÓN (por omisión)

**MEDIDO:** `proporcional` 0, `coeficiente` 0, `reparto` 0, `por área` 0, `presupuesto` 0.

`DuesMode.SHARE` existe desde ayer (commit `0934735`), con `Unit.duesShare`, `shares.ts`,
`shareTotals.ts` y pruebas. El comentario del propio esquema dice para qué es: *"SHARE is what
Costa Rica's Ley 7933, Colombia's… require"*.

**Por qué esto pesa más que una función sin anunciar:** una junta directiva cuyo reglamento fija
la cuota por área o por valor no lee la ausencia como "le falta una función". Lee **"esta
herramienta no puede hacer lo que mi reglamento exige"**, y se va. El sitio hoy solo habla de
cuota pareja, implícitamente, en todas partes.

**Estaría equivocado si:** la mayoría de los condominios ticos pequeños cobrara cuota pareja de
hecho, aunque la ley diga otra cosa — en cuyo caso esto es una casilla que tranquiliza y no un
argumento de venta. **Se falsea con el administrador del lunes, preguntándole cómo reparte él su
cuota.** Es, de hecho, la pregunta más barata de toda esta auditoría.

### 4.4 — "Transparencia total" describe el producto de antes de ayer · SE VE VIEJO PERO USABLE

`ValueProps.tsx:8`: *"Cada residente ve el estado real de su cuota, sus reservas y la actividad de
su comunidad."* Era cierto y ahora se queda corto: el residente ya no solo **ve** el estado, puede
**interrogarlo** y descargarlo en PDF. La tarjeta que se llama "Transparencia total" es
precisamente la que dejó de decir lo más transparente que hace el producto.

### 4.5 — Las cinco diferencias no incluyen la que no se puede copiar · SE VE VIEJO PERO USABLE

`Differentiation.tsx` — puesta justo antes de `Pricing`, lo cual es correcto — dice "las cinco
cosas que hacemos distinto". Son: un solo precio · entrás hoy · precio en colones · los residentes
no son espectadores · el vecino que emprende tiene dónde vender.

Dos observaciones:

- **Falta la cuota explicada**, que según el benchmark es la única de la lista que un competidor
  no puede copiar barato. Las otras cinco sí: un competidor puede publicar precio y abrir un
  self-serve en un trimestre.
- **Una de las cinco casillas se la lleva el Marketplace**, que el mismo benchmark clasifica como
  *"No, por sí solo. Encanta en demo y no aparece en un pliego de requisitos. Es diferenciación de
  marca, no de compra."* No digo quitarlo — digo que es candidato a ceder el lugar si se quiere
  mantener el número en cinco.

### 4.6 — El portafolio aparece como pie de página de Precios · PULIDO MENOR

MEDIDO: `portafolio` 2, `varios condominios` 2 — y la mención principal es la línea bajo las
tarjetas: *"¿Administrás varios condominios o un portafolio más grande? Hablemos."*, que **manda a
contacto**. Pero el producto ya lo resuelve solo: una cuenta, varias membresías, una página de
Portafolio con la cola ordenada. Un administrador con seis condominios es exactamente el comprador
al que el sitio le está diciendo "escribinos" cuando podría decirle "entrá".

---

## 5. Secciones: lo que sobra y lo que falta

### 5.1 — Seguridad ocupa más del doble que Funciones en un celular · SE VE VIEJO PERO USABLE

**MEDIDO, alturas de sección en 375 px sobre una página de 10 953 px:**

| Sección | Altura | % de la página |
|---|---|---|
| `planes` | 1 983 px | 18,1 % |
| **`seguridad`** | **1 592 px** | **14,5 %** |
| `diferencia` | 1 305 px | 11,9 % |
| `contacto` | 1 039 px | 9,5 % |
| **`funciones`** | **734 px** | **6,7 %** |

**La sección que enseña el producto mide menos de la mitad que la sección de seguridad** — y la de
seguridad son seis tarjetas apiladas a ancho completo cuyo contenido es, íntegramente, requisitos
mínimos: aislamiento, hash de contraseñas, HTTPS, respaldos, no vendemos datos, Ley 8968. Ningún
competidor perdería una venta por no tener eso, y ninguno la gana por tenerlo.

A 1440 px la misma sección es el 9,7 % (738 px), así que **este es un problema específico del
celular**, causado por seis tarjetas en una sola columna.

Lo irónico es que Livva **sí tiene** afirmaciones de privacidad que ningún competidor menciona —
la cédula del visitante que se borra sola a los 90 días, la bitácora que no se puede editar, que
el guarda no ve el correo del vecino, el registro auditado de exportaciones para una orden
judicial. Hoy, la única de esas que aparece en el sitio está **en el carrusel de funciones**, no
en la sección que se llama Seguridad.

**Propuesta:** no borrar la sección — la transparencia sobre datos sí mueve confianza en este
mercado — sino **cambiar dos de las seis tarjetas genéricas ("Conexión siempre cifrada",
"Infraestructura confiable") por dos concretas**, y considerar dos columnas a partir de 375 px
para bajar la altura. Gana en contenido y baja de tamaño a la vez.

**Estaría equivocado si:** el comprador fuera un comité de TI corporativo que revisa una lista de
controles. No lo es — es una junta de vecinos.

### 5.2 — El FAQ no pregunta cómo se calcula la cuota · SE VE VIEJO PERO USABLE

Las 9 preguntas cubren qué es, factura electrónica, precio, instalación, comprobantes, datos,
prueba, tamaño y cancelación. **Ninguna pregunta cómo se calcula la cuota de cada unidad**, que es
lo primero que pregunta una junta, y ninguna pregunta por varios condominios.

Es además la página con mejor retorno para extracción por IA: ya tiene `FAQPage` JSON-LD sacado de
`src/lib/faqs.ts`, así que una pregunta nueva ahí entra al esquema sola.

### 5.3 — `MobileShowcase` enseña el producto de hace dos semanas · PULIDO MENOR

Tres teléfonos: Anuncios, Cuotas y pagos, Mensajes. Correcto para el producto del 2026-09-08. Hoy
falta el módulo que el propio sitio argumenta que es el segundo en importancia — *"después de la
cuota, ¿quién viene hoy? es lo que más le preguntan a una administración costarricense"* — y
**`mobile-visitantes.png` ya existe, sin usar** (§3.4). Es agregar un cuarto teléfono con un
archivo que ya está en el repo.

### 5.4 — Nada sobra de verdad

Se revisó sección por sección buscando qué borrar. La respuesta honesta es: **casi nada sobra; lo
que pasa es que lo que hay está mal balanceado.** La única candidata real a recorte es Seguridad
(§5.1), y aun así el recorte correcto es sustituir contenido, no eliminar la sección. La fusión de
`DemoPromo` en `HowItWorks` del 2026-09-11 ya se comió la duplicación que sí sobraba.

---

## 6. Propuestas concretas: dónde va y qué diría

### P1 · Nueva sección en el home: "De dónde sale tu cuota"

**Dónde:** entre `<Features />` y `<MobileShowcase />` en `LandingPage.tsx`. Razón del lugar:
`ValueProps` y `HowItWorks` resuelven la objeción de adopción, `Features` establece la amplitud, y
**este es el momento de profundidad** — el lector ya vio que hay diez módulos y ahora recibe el
único argumento que ningún competidor puede igualar, antes de que la página gire a celular,
seguridad y precio.

**Qué diría** (borrador, no definitivo):

> **DE DÓNDE SALE TU CUOTA**
> ### El número no es un misterio, y no hay que creernos
>
> Cuando un vecino pregunta por qué debe ₡57 200, la respuesta no es "así lo dice el sistema".
> Toca el monto y ve de dónde sale: la cuota del mes, el recargo, la regla que lo aplicó y el día
> en que se aplicó. El mismo desglose viaja al estado de cuenta en PDF que le entregás.
>
> Esto es posible porque Livva **no guarda un saldo: lo calcula** contra las reglas de tu
> condominio cada vez que alguien lo abre. Un número guardado no puede contar cómo se llegó a él.
>
> Y si tu reglamento reparte la cuota por área o por coeficiente —como pide la Ley 7933— el
> desglose también dice cuánto pesa tu filial dentro del presupuesto del condominio.

**Con la captura de §3.2 al lado.** La sección vive o muere con esa imagen: el argumento es
"mirá el detalle", y contarlo sin enseñarlo es pedir el mismo acto de fe que critica.

### P2 · Alinear las tres menciones del flujo de pago (§4.1)

- `ValueProps.tsx:6` — reescribir "Pagos sin fricción" alrededor del código de conciliación:
  *"El residente reporta su pago con un código único que aparece en tu estado de cuenta. Vos
  confirmás contra el banco, no contra una captura de pantalla."*
- `ComparisonPageContent.tsx:16` — mismo cambio, es la fila de Cuotas y pagos.
- `faqs.ts:33` — cambiar la pregunta de *"¿Cómo suben los residentes sus comprobantes de pago?"* a
  *"¿Cómo confirmo que un pago de verdad entró?"*, que es la pregunta que un administrador se
  hace, y responder con el código. El adjunto opcional se puede mencionar en una cláusula final
  sin volver a ser el titular.

### P3 · Dos entradas nuevas al FAQ (§5.2)

> **¿Cómo se calcula la cuota de cada unidad?**
> De las dos formas que usan los condominios en Costa Rica. Podés cobrar una cuota igual para
> todas las unidades, o repartir el presupuesto mensual en proporción al peso de cada filial
> —área, valor o el coeficiente que fije tu reglamento—, como corresponde bajo la Ley 7933. En
> los dos casos cada vecino puede abrir su cuota y ver de dónde sale el monto.

> **¿Puedo administrar más de un condominio con la misma cuenta?**
> Sí. Con un solo correo administrás todos los que quieras y cambiás entre ellos desde la barra
> lateral, sin volver a entrar. La página de Portafolio te muestra los tres pendientes: quién está
> bloqueado, quién tiene algo esperando y cuánto se debe en cada uno.

### P4 · Una línea en la banda `INCLUDED_EVERYWHERE` de Precios

Hoy lista 13 ítems y ninguno nombra el reparto. Agregar: **"Cuota pareja o repartida por
coeficiente"**. Costo: una línea.

### P5 · Sustituir dos tarjetas de Seguridad (§5.1)

Fuera "Conexión siempre cifrada" e "Infraestructura confiable". Dentro:

> **Los datos de un visitante no se quedan para siempre**
> La cédula y la placa que anota la caseta se borran solas a los 90 días. El registro de quién
> entró se queda; el documento de una persona que no es usuaria de Livva, no.

> **La bitácora no se puede maquillar**
> La hora de cada ronda la pone el servidor, no el teléfono del guarda, y el registro no se puede
> editar ni borrar después — ni por la administración.

### P6 · El cuarto teléfono de `MobileShowcase`: Visitantes (§5.3)

El archivo ya está en el repo. Y una línea de copy que hoy vale la pena revisar: *"sin descargarla
de ninguna tienda de aplicaciones"* se presenta como ventaja, y el benchmark advierte que **para
un comprador puede leerse como ausencia** (§4.3 de ese documento). Sugerencia: decir para qué
sirve, no de qué carece — *"se instala desde el navegador en dos toques; cuando cambiás de
teléfono, no hay nada que reinstalar"*.

### P7 · Preparar el hueco de la prueba social, y pedirla el lunes

Es la brecha visual más cara del sitio y **no se arregla con diseño**: los cinco competidores
lideran con números (Munily 190 K residentes, Edifito +6 000 condominios, Neivor +40 000
viviendas) y Livva no tiene ninguno. Inventarlo o insinuarlo sería lo único descalificante.

Lo que sí se puede hacer esta semana: **dejar lista la sección vacía** y pedirle al administrador
del lunes, si la demo sale bien, una frase y el nombre del condominio. Un caso real con nombre
vale más que cualquier número redondo, y el precedente ya existe en este repo: la insignia del
plan destacado decía *"Rango más común entre nuestros clientes"* sin haber un solo cliente, y se
corrigió. **Cualquier afirmación de tracción tiene que verificarse contra la base antes de
publicarse.**

---

## 7. Bajo qué condición estaría equivocado

| Afirmación | Estaría equivocado si… |
|---|---|
| **"La captura del Marketplace es el defecto más caro"** | Nadie llegue a scrollear hasta el carrusel. A 375 px `funciones` arranca en y=3 279 — tres pantallazos. **No medí cuánta gente llega**; con GA4 ya instalado (commit `5610c16`) esto es comprobable de verdad y dejaría de ser inferencia |
| **"La cuota explicada es el argumento más fuerte"** | Los residentes no interroguen su saldo, y entonces es una función para un reclamo que nadie hace. El benchmark ya dijo cómo falsearlo: **tres conversaciones**. El lunes hay una |
| **"El reparto proporcional abre un flanco legal"** | Los condominios ticos chicos cobren cuota pareja en la práctica pese a la ley. **Preguntable el lunes en diez segundos** |
| **"Seguridad sobra en tamaño"** | El comprador sea alguien que revisa una lista de controles antes de firmar. Para una junta de vecinos no lo es; para una administradora profesional con torres, quizá sí — y ese es justamente el comprador que el benchmark dice que Livva **no** está persiguiendo |
| **"Las tres menciones del comprobante son copy viejo"** | El adjunto fuera todavía el camino principal. Verifiqué en el `CLAUDE.md` de la aplicación que no lo es, pero **no manejé el modal de pago del residente**: lo leí en la documentación y en el código, no en pantalla |
| **"El modo oscuro es una ventaja desaprovechada"** | A un administrador de condominio le dé exactamente igual el modo oscuro — lo cual es perfectamente posible. Es la recomendación de la lista sobre la que tengo menos convicción, y por eso es también la más barata |
| **Todo juicio sobre qué convence** | No hablé con un comprador. Ninguna de estas recomendaciones está validada con usuarios; están apoyadas en heurísticas y en el benchmark del 2026-09-12, que a su vez no pudo entrar a ningún producto de la competencia |

---

## 8. Antes del lunes, y lo que puede esperar

### Antes del lunes — porque alguien recomendado va a abrir esto

| # | Qué | Por qué ahora | Esfuerzo |
|---|---|---|---|
| **1** | **Recapturar `desktop-marketplace.png`** (§3.1) | Es la única cosa del sitio que se lee como *roto*, ilustra la única frase en negrita del hero, y el arreglo ya está en la aplicación | **Minutos** — recorrer un script que ya existe |
| **2** | **Alinear las tres menciones del comprobante** (§4.1, P2) | El sitio se contradice sobre cómo se cobra la plata, y la versión que gana en el FAQ es la peor. Es texto, no diseño | **Bajo** — 3 párrafos |
| **3** | **Captura del desglose + sección "De dónde sale tu cuota"** (§3.2, P1) | Es el argumento que el benchmark ranquea #1 y hoy no existe en el sitio. Si el lunes el administrador pregunta "¿y qué les digo a los vecinos que reclaman?", conviene poder mandarle un enlace | **Medio** — una captura y una sección |
| **4** | **Las dos preguntas del FAQ** (P3) y **la línea de Precios** (P4) | La del reparto proporcional cierra un flanco legal en tres países, y el FAQ ya alimenta su propio JSON-LD | **Bajo** |

Los cuatro juntos son **una tarde**, y el #1 solo es de minutos.

### Puede esperar

| # | Qué | Por qué puede esperar |
|---|---|---|
| 5 | Sustituir dos tarjetas de Seguridad y pasarla a dos columnas en celular (§5.1, P5) | Nadie pierde una venta por esto hoy; mejora la página y no la desbloquea |
| 6 | Cuarto teléfono en `MobileShowcase` + recopy de "ninguna tienda" (§5.3, P6) | El asset ya existe, así que es barato, pero no cambia ninguna decisión |
| 7 | Revisar las cinco tarjetas de `Differentiation` (§4.5) | Vale la pena hacerlo **después** de que exista la sección de la cuota, para no decir lo mismo dos veces |
| 8 | Modo oscuro: una captura y una línea (§3.3) | Ventaja única pero de bajo peso en la decisión; es la que menos convicción tengo |
| 9 | Limpiar las dos capturas restantes sin usar (§3.4) | Higiene del repo |
| 10 | **Prueba social** (P7) | **No depende de ingeniería sino del lunes.** Es la brecha más cara del sitio y la única que no se puede cerrar escribiendo código |

**Lo único que no haría antes del lunes:** tocar el orden de las secciones o el diseño de Precios.
Los dos están bien, tienen razones documentadas detrás, y el problema de esta semana es de
contenido desincronizado, no de estructura.

---

## Fuentes

- **Sitio manejado** el 2026-09-12 en `localhost:3001` (rama `main`, sin cambios locales), anchos
  375 / 820 / 1440, temas claro y oscuro, las 4 páginas. Playwright 1.63 en el scratchpad.
- **Aplicación manejada** el 2026-09-12 en `localhost:3000`, condominio showcase, cuentas
  `+demo-res1` y `+demo-res2` (Torre A 102, en mora), para ver el desglose real.
- **Repositorio** — `git log` por archivo en `public/screenshots/`, `Features.tsx`,
  `ValueProps.tsx`, `Security.tsx`, `ComparisonPageContent.tsx`, `src/lib/faqs.ts`,
  `src/lib/pricing.ts`; y en `Condo-Admin-Tool`: `prisma/schema.prisma`,
  `src/components/dashboard/DuesBreakdown.tsx`, `src/lib/dues/shareTotals.ts`, `CLAUDE.md`.
- **Documentos internos** — `Condo-Admin-Tool/docs/benchmark-ux-competencia-2026-09.md`,
  `Condo-Admin-Tool/docs/expansion-panama-2026-09.md`, `livva-web/CLAUDE.md`.
- **Heurísticas** — Nielsen Norman Group, *10 Usability Heuristics*, vía la skill `ui-ux-audit`.
