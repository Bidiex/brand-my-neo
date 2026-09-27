# Brand My Neo — Landing de recaudación de fondos para MacBook Neo rosa

> **Cómo usar este documento**: esto es un brief técnico y de producto para que Claude Code construya el proyecto. No es el copy final del sitio — es la especificación. Las secciones marcadas `⚠️ DECISIÓN PENDIENTE` necesitan que Vosstra defina algo concreto (texto, nombre, imagen) antes o durante el desarrollo. Todo lo demás ya está decidido y puede implementarse directamente.

---

## 1. Resumen del proyecto

Landing page personal, estilo Apple, que recauda fondos vendiendo "espacios de sticker" sobre una MacBook Neo Blush (rosa) — el dinero recaudado se destina a comprarle esa laptop a Silenia Camargo, novia de Vosstra ([Instagram](https://www.instagram.com/sileniacamargom_)). Los compradores obtienen un sticker físico con su logo/marca pegado en la laptop real, más un spot con enlace en la página.

**Inspiración directa**: [brandmymac.com](https://brandmymac.com), proyecto de Vincent (@vynsedev), quien financió su MacBook Pro vendiendo 20 spots de sticker (tapa, interior, accesorios) por puja, alcanzando ~7.955 € (315% de su meta). El mecanismo de "vender publicidad física en tu propia laptop a cambio de financiarla" es la idea central a replicar; el resto (subasta, pagos con tarjeta, stack Next.js/Supabase) se adapta a las necesidades de este proyecto, mucho más simple.

**Diferencia clave a tener en mente**: Brand My Mac funciona porque Vincent ya tenía audiencia (indie hacker con tracción en X) — sus auspiciadores compraban exposición ante esa audiencia. Este proyecto no parte de esa base, así que el copy debe apoyarse en la historia personal y el gesto (financiar el primer Mac de tu pareja) más que en prometer alcance/impresiones.

---

## 2. Stack técnico

- **Astro** (framework principal, output estático)
- **Vite** (bundler, viene integrado con Astro)
- **Node.js** (entorno de desarrollo/build)
- **Vanilla JS** (sin React/Vue/Svelte — el mapa interactivo de spots se construye con JS plano manipulando SVG/DOM)
- **CSS plano** (confirmado — sin Tailwind, consistente con el stack habitual de Vosstra)
- **Sin backend propio.** Sin base de datos. Sin pasarela de pago.
- **Formulario de contacto/compra**: **Web3Forms** (confirmado) — envía los datos + archivos adjuntos al email de Vosstra, sin backend propio.
- **Hosting**: GitHub Pages (mismo patrón que otros proyectos de Vosstra, ej. `bidiex.github.io/...`).
- **Datos de los spots**: un único archivo `spots.json` (o `.ts` tipado) en el repo, que Vosstra edita manualmente para marcar un spot como vendido, actualizar el total recaudado, o cambiar el logo/link del auspiciador. Astro lo lee en build time (no hace falta que sea dinámico en runtime).

### Por qué no se necesita backend
Confirmado con Vosstra: no hay pasarela de pago (se usa transferencia manual por Bre-B), no hay subasta en vivo (precio fijo), y el estado de los spots se actualiza manualmente por Vosstra editando el JSON y volviendo a hacer deploy (o editando directo en GitHub y dejando que el deploy automático de GH Pages lo publique). Esto significa que **todo el sitio puede ser 100% estático**.

---

## 3. Datos confirmados del proyecto

- **Nombre del proyecto**: Brand My Neo
- **Meta de recaudación**: $4.500.000 COP (coincide exactamente con la suma de los 10 spots — ver 3.1)
- **Dato de pago**: llave Bre-B **3008836295** (el celular de Silenia; antes era el número de Nequi, ver sección 7.0)
- **Número de spots**: 10 (más el logo de Apple, que queda como zona protegida sin vender, igual que en el original)

### 3.1 Layout y precios de los spots (definido por Vosstra)

Grid de 3 filas sobre la tapa, con el logo de Apple en el centro de la fila media (zona no vendible):

| Fila | Posición | Precio | Cantidad |
|---|---|---|---|
| Superior | 3 spots grandes (izq, centro, der) | $630.000 c/u | 3 |
| Media | 2 spots a la izquierda del logo + 2 a la derecha | $300.000 c/u | 4 |
| Inferior | 3 spots grandes (izq, centro, der) | $470.000 c/u | 3 |

**Total: 3×630.000 + 4×300.000 + 3×470.000 = $4.500.000 COP** ✅ cuadra exacto con la meta.

Nota para Claude Code: este layout es más simple que el mapa "orgánico" del original (que tenía zonas irregulares tipo banner/franja/cuadrado siguiendo el contorno de la tapa). Aquí es un grid de 3 filas, más parecido a una cuadrícula regular que a formas libres — lo cual simplifica bastante la calibración del overlay descrita en la sección 6.2: se puede pensar como una tabla de 3 filas con 3, 4 (2+hueco central+2) y 3 columnas respectivamente, no como polígonos irregulares.

### 3.2 La historia (copy de referencia, primera persona)

Esto es el corazón emocional del sitio — es lo que reemplaza la "audiencia ya construida" que tenía Vincent en el original. El texto está escrito en primera persona (voz de Vosstra), estilo Apple: frases cortas, directas, sin exceso de adjetivos. Claude Code puede usarlo casi tal cual en el hero/sección "por qué esto", o Vosstra puede ajustarlo antes de publicar.

**Draft del hero / historia:**

> Ella quiere empezar a estudiar.
>
> Silenia está por comenzar su carrera, y hoy no tiene un computador para hacerlo bien. Lleva tiempo mirando la MacBook Neo en Blush — ese rosa específico — y yo quiero ser quien se la regale.
>
> No la tengo. Pero se me ocurrió una forma de conseguirla: cada espacio de esta tapa se vende como un spot de marca. Tu logo viaja con ella a cada clase, cada sesión de estudio, cada foto que suba. A cambio, financias una parte real de su primer Mac.
>
> Diez espacios. Un objetivo: $4.500.000 COP. Cuando se complete, Silenia tiene su MacBook Neo — y tu marca queda ahí, en la tapa, contándole a todo el que la vea cómo empezó.

**Variante corta (para meta description / redes):**

> Le estoy comprando a Silenia su primera MacBook vendiendo espacios de sticker en la tapa. Consigue el tuyo.

**Datos para usar en el copy / footer / sección de contacto:**
- Nombre: Silenia Camargo
- Instagram: [@sileniacamargom_](https://www.instagram.com/sileniacamargom_)
- Motivo: va a empezar a estudiar y actualmente no tiene ordenador
- Modelo específico que le gusta: MacBook Neo, color Blush (rosa)

Claude Code no debe inventar más detalles biográficos de Silenia más allá de estos — si el copy final necesita más color (ej. qué va a estudiar), eso lo añade Vosstra directamente, no se debe suponer.

---

## 4. Estructura de páginas

Réplica simplificada de brandmymac.com — una sola página larga (single-page) con anclas, no rutas separadas:

1. **Header** — logo/nombre del proyecto ("Brand My Neo"), nav con anclas (`#spots`, `#como-funciona`, `#la-maquina`, `#faq`), CTA "Consigue un spot"
2. **Hero** — titular "Ella quiere empezar a estudiar." (ver draft completo en sección 3.2), contador de recaudado vs. meta ($4.500.000 COP)
3. **Grid interactivo de spots** — imagen real de la tapa de la MacBook Neo rosa con overlay de 10 zonas clickeables en 3 filas, logo de Apple protegido en el centro (ver sección 3.1 para precios exactos y sección 6.2 para implementación). A diferencia del original, no hay toggle Tapa/Interior salvo que se decida vender spots de interior/accesorios también (ver checklist, sección 9)
4. **Grid de auspiciadores** — logos de quienes ya compraron spot, con su precio pagado y link a su sitio (mismo patrón que el original)
5. **Cómo funciona** — 3 pasos (elige spot → paga por Bre-B y sube comprobante → tu sticker se pone en la laptop), adaptado del original
6. **La máquina** — specs reales de la MacBook Neo (ver sección 5), con link a Apple
7. **Preguntas frecuentes** — adaptadas del original (¿es real?, ¿por qué esta laptop?, ¿qué recibo?, ¿cómo pago?, ¿puedo hacer esto con mi propia laptop? — esta última se puede omitir, es un plug de otro producto de Vincent)
8. **Footer** — links, aviso legal de que no está afiliado con Apple (importante, ver sección 8)

No hay páginas de "Leaderboard" o "Replay" separadas como el original — se pueden omitir o fusionar en la sección de auspiciadores, salvo que Vosstra quiera añadirlas después.

---

## 5. El producto: MacBook Neo (investigación verificada)

Confirmado con fuentes oficiales de Apple (Newsroom, marzo 2026) — **el MacBook Neo es un producto real**, no ficticio, lanzado el 4 de marzo de 2026 y disponible desde el 11 de marzo de 2026:

- **Nombre oficial**: MacBook Neo
- **Colores**: Plata, **Rosa rubor / "blush"** (el que nos interesa), Índigo, Amarillo cítrico
- **Precio base internacional**: US$599 (256GB) / US$499 versión educativa. La meta de recaudación ya fue fijada por Vosstra en $4.500.000 COP (sección 3), consistente con el rango de precio del MacBook Neo en tiendas colombianas.
- **Pantalla**: Liquid Retina 13", 2408×1506, 500 nits, recubrimiento antirreflejo
- **Chip**: Apple A18 Pro (CPU 6 núcleos, GPU 5 núcleos, Neural Engine 16 núcleos) — mismo chip que algunos iPhone, primera Mac en usarlo
- **Memoria/almacenamiento**: 8GB unificada, 256GB o 512GB SSD (512GB incluye Touch ID)
- **Batería**: hasta 16 horas
- **Teclado**: Magic Keyboard a juego con el color del equipo
- **Peso/dimensiones**: 1.23 kg, 1.27 × 29.75 × 20.64 cm
- **Conectividad**: 2x USB-C (uno USB3 con salida a monitor externo, otro USB2), jack de audífonos, Wi-Fi 6E, Bluetooth 6
- **Sin ventilador** (fanless, silencioso)

**Fuente oficial para specs y copy**: https://www.apple.com/mx/newsroom/2026/03/say-hello-to-macbook-neo/ (o la versión .co si existe) y https://www.apple.com/mx/macbook-neo/

---

## 6. Assets visuales: la parte más delicada

### 6.1 Imágenes de la laptop — ya identificadas, listas para descargar

Confirmado: existen fotos oficiales de Apple del MacBook Neo en Blush (rosa) en alta resolución, tomadas del press kit del Newsroom de Apple (lanzamiento del 4 de marzo de 2026). Estas son las que se deben descargar y usar como base:

**1. Tapa cerrada (vista principal para el grid de spots)**
`https://www.apple.com/newsroom/images/2026/03/say-hello-to-macbook-neo/article/Apple-MacBook-Neo-blush-260304_big.jpg.large.jpg`
→ Foto de estudio, fondo neutro, tapa completa visible con el logo de Apple centrado. Esta es la imagen base para calibrar el grid de 10 spots (sección 6.2).

**2. Vista abierta / lineup de colores (para la sección hero o "la máquina")**
`https://www.apple.com/newsroom/images/2026/03/say-hello-to-macbook-neo/article/Apple-MacBook-Neo-color-lineup-260304_big.jpg.large.jpg`
→ Los 4 colores en abanico; se puede recortar solo el Blush si se prefiere una sola vista abierta.

**3. Vista de uso / lifestyle en Blush (para copy de "Silenia estudiando")**
`https://www.apple.com/newsroom/images/2026/03/say-hello-to-macbook-neo/article/Apple-MacBook-Neo-Apple-Intelligence-summarize-notes-and-create-presentations-260304_big.jpg.large.jpg`
→ Foto de estilo de vida de alguien usando la MacBook Neo Blush abierta, útil si se quiere una imagen "humana" en vez de solo producto.

**Paquete completo de prensa** (por si se necesita otra variante o mayor resolución): `https://www.apple.com/newsroom/images/2026/03/say-hello-to-macbook-neo/article/Media-of-Apple-MacBook-Neo-260304.zip`

**Instrucción para Claude Code / Vosstra**: descargar la imagen 1 primero — es la que se usa para el grid interactivo. Las imágenes 2 y 3 son de apoyo para otras secciones de la landing, no imprescindibles para el desarrollo inicial.

**Uso legal**: son materiales de prensa de Apple, pensados para ser usados editorialmente citando la fuente. Igual que el proyecto original aclara "Brand My Mac no está afiliado con Apple Inc.", este sitio debe llevar el mismo disclaimer (ver sección 8). No se debe presentar el sitio como oficial de Apple ni usar el logo de Apple de forma que sugiera afiliación.

### 6.2 El grid interactivo de spots

Esto es lo que hace visualmente reconocible a Brand My Mac: sobre la foto real de la laptop hay zonas clickeables que muestran el precio/estado de cada spot al pasar el mouse o tocar.

**Buena noticia respecto al original**: el layout que definió Vosstra (sección 3.1) es un **grid regular de 3 filas** — no los polígonos irregulares que sigue el contorno de la tapa en Brand My Mac. Esto simplifica bastante la implementación: no hace falta recortar formas orgánicas con `<polygon>`/`<path>` de SVG. Basta con:

1. Elegir la imagen definitiva de la tapa en alta resolución (fondo).
2. Superponer un grid de 3 filas (`position: absolute` + `top`/`left`/`width`/`height` en % sobre la imagen, o un CSS grid si la imagen y las zonas mantienen proporciones fijas):
   - Fila superior: 3 columnas iguales → spots de $630.000
   - Fila media: 2 columnas a la izquierda + hueco central protegido (logo de Apple, no clickeable) + 2 columnas a la derecha → spots de $300.000
   - Fila inferior: 3 columnas iguales → spots de $470.000
3. Ajustar las proporciones/posiciones a ojo contra la imagen real elegida hasta que el grid calce visualmente con la tapa (que el hueco central quede exactamente sobre el logo de Apple es el punto más sensible a calibrar).
4. Cada spot es un objeto en `spots.json` con: `id`, `fila` (superior/media/inferior), `posicion` (índice de columna), `precio`, `estado` (disponible/vendido), y si está vendido: `nombreAuspiciador`, `logoUrl`, `linkUrl`.

**Instrucción para Claude Code**: no es necesario un sistema de coordenadas SVG complejo para este layout — es un grid de 10 celdas con un hueco central. Sí sigue siendo necesario calibrar visualmente el tamaño/posición de cada fila contra la imagen real (los márgenes de la tapa no son simétricos ni ocupan el 100% del ancho de la foto), pero el esfuerzo es muchísimo menor que replicar zonas orgánicas irregulares.

**Alcance actual**: solo la tapa (10 spots). No hay spots de interior/palm-rest ni de accesorios (cargador) en el layout confirmado — ver checklist (sección 9) sobre si eso se agrega después.

### 6.3 Otras imágenes necesarias
- Logo del proyecto "Brand My Neo" (⚠️ pendiente, puede ser texto/wordmark simple al inicio — no se definió diseño de logo, Claude Code puede usar tipografía estilo Apple como wordmark provisional)
- Foto de Silenia para la sección "por qué esto" — Vosstra puede tomarla de su Instagram ([@sileniacamargom_](https://www.instagram.com/sileniacamargom_)) o subir una directamente; no descargar fotos de Instagram automáticamente por scraping, eso lo hace Vosstra a mano y la coloca en `/public/`

---

## 7. Flujo de compra de un spot (sin backend, sin pasarela)

Confirmado con Vosstra — flujo de 4 pasos:

### 7.0 Método de pago: Bre-B

Se paga por **Bre-B**, el sistema de pagos inmediatos del Banco de la República (reemplaza a Nequi como método de pago del sitio). Contexto:
- Permite transferir desde cualquier banco o billetera colombiana (Nequi, Daviplata, Bancolombia, etc.) hacia cualquier otra, en segundos, 24/7.
- En lugar de un número de cuenta se usa una **llave**: celular, documento, correo o un código alfanumérico. La llave del proyecto es el celular de Silenia, **3008836295** (el mismo número que tenía en Nequi).
- Antes de confirmar, la app de quien paga muestra el nombre del titular de la llave; el modal lo aprovecha para dar confianza ("verás el nombre de la titular, Silenia Camargo").
- Sigue siendo solo para cuentas colombianas: un auspiciador del extranjero no puede pagar por Bre-B.
- **Logo**: no se usa el sello Bre-B en el sitio. Según el Manual de Identidad Visual del Banco de la República, el sello está reservado para las entidades participantes del sistema y los archivos oficiales no son públicos (se piden a pagosinmediatos@banrep.gov.co). Usarlo en una página personal podría sugerir afiliación.
- Pendiente de Vosstra: confirmar que el celular esté registrado como llave Bre-B en la app del banco o billetera de Silenia.

### 7.1 En el sitio
El usuario ve un spot disponible → click → modal o sección con:
- Datos del spot (fila, precio en COP)
- Instrucciones de pago por Bre-B: **llave 3008836295** (celular), con botón para copiarla
- Un único formulario con:
  - Nombre / marca del auspiciador
  - Link de su sitio/red social
  - Adjuntar comprobante de la transferencia Bre-B (imagen)
  - Adjuntar su logo (imagen, idealmente PNG/SVG con fondo transparente)
  - Email de contacto

### 7.2 Envío del formulario
El formulario se envía a través de un servicio externo (no hay backend propio) que reenvía todo por email a Vosstra, incluyendo los archivos adjuntos.

### 7.3 Proveedor del formulario: Web3Forms (confirmado)
Servicio gratuito, sin backend, soporta adjuntos de archivos (comprobante de la transferencia + logo). Requiere una Access Key gratuita (se genera en web3forms.com con el email de Vosstra). Claude Code debe:
- Implementar el envío del formulario vía Web3Forms (endpoint `https://api.web3forms.com/submit`, método POST, incluyendo los campos + los dos archivos adjuntos).
- Dejar la Access Key como variable fácil de ubicar/reemplazar en el código (ej. constante al inicio del componente del formulario), para que Vosstra la configure con su propia key antes de publicar.
- No hardcodear una key de ejemplo que parezca real — dejar un placeholder claro tipo `"TU_ACCESS_KEY_AQUI"`.

### 7.4 Aprobación manual
Vosstra revisa el comprobante recibido por email, confirma el pago manualmente, y:
1. Sube el logo del auspiciador al repo (`/public/logos/` o similar)
2. Edita `spots.json`: marca el spot como vendido, agrega nombre/logo/link del auspiciador, actualiza el total recaudado
3. Hace commit/push → GitHub Pages redeploya automáticamente

No hay panel de administración ni login — es edición directa de archivos en el repo, como Vosstra ya maneja en sus otros proyectos.

---

## 8. Legal / disclaimers (no negociable, por seguridad del proyecto)

Igual que el original, el sitio debe dejar explícito en el footer:
> "Brand My Neo no está afiliado, respaldado ni patrocinado por Apple Inc. MacBook Neo y Mac son marcas de Apple Inc."

Además, considerar (Vosstra puede decidir el nivel de detalle):
- Una nota corta de que los pagos por Bre-B no son reembolsables automáticamente (a diferencia del depósito reembolsable del original, que aplicaba a su sistema de subasta) — al ser precio fijo, conviene ser claro sobre política de cambios/cancelaciones antes de lanzar.
- Aviso de que la aprobación de cada auspiciador es manual y a discreción de Vosstra (mismo patrón que el original: "me reservo el derecho de aprobar cada logo").

---

## 9. Decisiones pendientes — checklist antes de pasar esto a Claude Code

Ya resueltas: nombre del proyecto (Brand My Neo), meta ($4.500.000 COP), dato de pago (llave Bre-B), número y precios de los 10 spots, historia/copy de referencia (sección 3.2), proveedor de formulario (Web3Forms), CSS plano, imágenes oficiales de la laptop (sección 6.1).

Falta resolver (menor, no bloquea empezar a desarrollar):

- [ ] **Access Key de Web3Forms** — generar en web3forms.com con el email de Vosstra antes de conectar el formulario en producción
- [ ] **Logo/wordmark de "Brand My Neo"** — puede lanzarse con tipografía simple y añadirse un logo diseñado después
- [ ] **Foto de Silenia** para la sección "por qué esto" — Vosstra la sube manualmente desde su Instagram u otra fuente propia. (La foto de perfil de Instagram ya se usa en los avatares: `public/img/avatar-silenia.jpg`.)
- [ ] **Confirmar la llave Bre-B** — que el celular 3008836295 esté registrado como llave en la app del banco o billetera de Silenia
- [ ] **Copy final definitivo** del hero, FAQ y "cómo funciona" — la sección 3.2 da un draft usable; Vosstra puede ajustarlo antes de publicar
- [ ] **¿Se venden también spots de interior/accesorios (cargador) como el original, o los 10 spots del grid de la tapa son el alcance completo del proyecto?** — el grid de 3 filas de la sección 3.1 ya suma exactamente la meta, así que un interior/accesorios adicional sería dinero extra sobre la meta, no parte de ella. Definir si eso se incluye desde el lanzamiento o se deja como "fase 2" si la tapa se vende completa.

---

## 10. Lo que NO se va a construir (alcance explícitamente fuera)

Para que Claude Code no añada complejidad de más:
- ❌ Sistema de subasta / pujas en vivo
- ❌ Pasarela de pago (Stripe, PSE, etc.)
- ❌ Base de datos o backend propio
- ❌ Panel de administración con login
- ❌ Actualización en tiempo real del estado de spots entre visitantes
- ❌ Página de "Leaderboard" o "Replay" separadas (opcional para v2)
- ❌ Sistema de reembolsos automáticos (no aplica, no hay depósito reembolsable en el modelo de precio fijo)

---

## 11. Idioma y moneda (añadido después del brief)

- **Inglés**: el sitio tiene una versión en inglés en `/en/` (Astro i18n); el español sigue en `/`. Cada componente guarda sus textos en un objeto `{ es, en }` y elige con `getLang(Astro)` (`src/i18n.js`).
- **USD**: un menú "idioma y moneda" en el header permite ver todos los precios en dólares. La conversión usa la tasa del día (open.er-api.com, con caché de 12 h y una tasa de respaldo en `src/scripts/currency.ts`). Los precios se marcan con el componente `<Money>`.
- **El pago sigue siendo en COP**: con USD activo, el modal muestra el precio en COP y el equivalente aproximado en USD.
- Los correos de reserva llegan con el nombre del spot en español y un campo `idioma` con el idioma del visitante.
