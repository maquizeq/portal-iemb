# Arquitectura Visual y Estratégica — Home Page IEMB v1.0
**Iglesia Evangélica Metodista en Bolivia**
*Diseño UX/Product — Mobile First — Sin código ni color todavía*

---

## Principios de Diseño que Guían la Home

Antes de diseñar sección por sección, estos principios no son negociables:

1. **El primer scroll debe contar una historia completa.** Un visitante que solo vea el hero y el primer bloque debe entender quiénes son y qué hacen.
2. **Institucionalidad ≠ frialdad.** El portal debe sentirse serio Y cercano al mismo tiempo.
3. **Cada sección tiene un solo trabajo.** No sobrecargar. Un objetivo, un CTA, una emoción.
4. **Radio TV no es un enlace, es un destino vivo.** Debe sentirse activa, no archivada.
5. **Mobile First real:** Diseñamos para pantalla de 390px. El escritorio es una expansión del móvil, no al revés.

---

## Jerarquía de Scroll — Curva Emocional de la Home

```
ENTRADA       → Identidad inmediata + fe viva (Hero)
ENGANCHE      → Contenido en vivo (Radio TV)
CONFIANZA     → Presencia nacional + historia
CONEXIÓN      → Acción social + noticias
PROFUNDIDAD   → Fe metodista + recursos
PERTENENCIA   → Iglesias + comunidad
ANCLAJE       → Footer institucional
```

---

## NAVBAR — Componente Global Fijo

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Orientar al usuario en todo momento. Nunca debe perderse dentro del portal. |
| **Emoción** | Claridad. Orden. Institución que sabe lo que tiene. |
| **Prioridad visual** | Permanente (sticky) |

**Contenido:**
- Logo IEMB a la izquierda (versión horizontal)
- Menú principal: Nosotros / Autoridades / Noticias / Radio TV Metodista / Recursos / Iglesias
- Dos botones destacados (CTAs diferenciados): **Radio TV Metodista** · **Recursos**
- Ícono de búsqueda global
- Menú hamburguesa en móvil (drawer lateral)

**Comportamiento Mobile First:**
- En móvil: Logo + hamburguesa. Los 2 botones CTA se colapsan dentro del menú pero mantienen su jerarquía visual.
- Al hacer scroll hacia abajo: navbar se reduce con efecto de compresión (logo más pequeño, fondo con opacidad).

**Componentes UI:**
- Sticky Header con comportamiento de scroll
- Dropdown mega-menú para Nosotros y Recursos
- Drawer lateral animado (móvil)
- Badge "EN VIVO" pulsante en el botón Radio TV cuando hay transmisión activa

---

## SECCIÓN 01 — HERO PRINCIPAL

| Campo | Detalle |
|-------|---------|
| **Nombre** | Hero Institucional |
| **Objetivo** | Comunicar identidad completa en menos de 5 segundos. Quiénes son, qué son, dónde están y por qué importan. |
| **Emoción** | Esperanza. Solidez. Fe que no es abstracta sino territorial. |
| **Prioridad visual** | 🔴 MÁXIMA — Es el único momento donde el usuario no ha decidido si se queda. |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Titular principal** (H1, grande, peso visual dominante):
  `"Más de 130 años sirviendo a Bolivia con fe, educación y acción social"`
- **Subtítulo** (una línea, institucional):
  `Iglesia Evangélica Metodista en Bolivia — Presente en 9 departamentos`
- **Imagen de fondo o visual dominante**: Fotografía real de congregación boliviana en paisaje nacional (no stock). Alternativa: mosaico dinámico de 4 imágenes (feligreses, educación, acción social, culto).
- **Indicadores de confianza** (3 cifras pequeñas bajo el subtítulo):
  - `130+ Años de historia`
  - `9 Departamentos`
  - `+200 Congregaciones`
- **Dos CTAs principales**:
  - Primario: `Conoce nuestra historia`
  - Secundario: `Encuentra tu iglesia`

**Comportamiento Mobile First:**
- Móvil: Imagen en la parte superior, texto abajo. Sin texto sobre imagen (legibilidad garantizada).
- Escritorio: Split layout — texto izquierda, imagen derecha. O imagen de fondo full-width con overlay.

**Componentes UI:**
- Hero Container (full viewport height en escritorio, 70vh en móvil)
- H1 con tipografía de impacto
- Stat Counter Strip (3 métricas en fila)
- CTA Group (botón primario sólido + botón secundario outline)
- Imagen con tratamiento de fondo (no cruda, con overlay sutil)

---

## SECCIÓN 02 — RADIO TV METODISTA EN VIVO ⭐

| Campo | Detalle |
|-------|---------|
| **Nombre** | Hub Radio TV — En Vivo Ahora |
| **Objetivo** | Convertir Radio TV Metodista en el elemento más dinámico de la home. Que el usuario sienta que llega a algo vivo, no a un catálogo. |
| **Emoción** | Presencia. Urgencia positiva. "Está pasando ahora." |
| **Prioridad visual** | 🔴 ALTA — Segunda sección. El usuario debe encontrarla en el primer scroll. |
| **CTA principal** | `Escuchar en vivo` · `Ver TV en vivo` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `📡 RADIO TV METODISTA`
- **Indicador de estado**: Badge `● EN VIVO` animado (pulsante) cuando hay transmisión / `○ PRÓXIMAMENTE` cuando no.
- **Nombre del programa actual** (si hay transmisión):
  `Ahora: "Palabra Viva" — 08:00 a 09:00 hrs`
- **Dos tabs o cards laterales**:
  - `Radio en Vivo` — Ícono de onda sonora
  - `TV en Vivo` — Ícono de pantalla
- **Próximos programas** (lista pequeña de 2–3 entradas del día):
  - Hora · Nombre del programa
- **Enlace a programación completa**: `Ver programación semanal →`

**Comportamiento Mobile First:**
- Móvil: Stack vertical. Radio primero (prioridad auditiva en móvil), TV debajo.
- Escritorio: Layout de dos columnas. Radio izquierda, TV derecha.

**Componentes UI:**
- Live Status Badge (animación CSS pulse)
- Media Player Card (audio embebido)
- Video Embed Card
- Mini Schedule List (3 ítems próximos)
- Tab Switcher (Radio / TV)

---

## SECCIÓN 03 — PRESENCIA NACIONAL

| Campo | Detalle |
|-------|---------|
| **Nombre** | Bolivia Metodista — Presencia Nacional |
| **Objetivo** | Demostrar escala institucional. Que el visitante entienda que la IEMB no es una iglesia pequeña, es una red nacional. |
| **Emoción** | Orgullo. Pertenencia nacional. "Somos bolivianos, estamos en tu ciudad." |
| **Prioridad visual** | 🔴 ALTA |
| **CTA principal** | `Encuentra tu iglesia más cercana` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `PRESENCIA NACIONAL`
- **Titular**: `"De Cobija a Potosí. La IEMB está donde Bolivia vive."`
- **Mapa estático ilustrado de Bolivia** con puntos de presencia por departamento (v1.0: estático; v2: interactivo)
- **Estadísticas en tarjetas horizontales** (scroll horizontal en móvil):
  - 9 Departamentos
  - +200 Congregaciones
  - +50 Pastores activos
  - 9 Distritos eclesiásticos
- **Acceso rápido por departamento** (grid de 9 botones/chips): La Paz · Cochabamba · Santa Cruz · Oruro · Potosí · Sucre · Tarija · Beni · Pando

**Comportamiento Mobile First:**
- Móvil: Mapa arriba (full width), estadísticas en carrusel horizontal, chips de departamentos en grid 3x3.
- Escritorio: Mapa a la izquierda (60%), estadísticas y chips a la derecha.

**Componentes UI:**
- Mapa SVG ilustrado de Bolivia (con puntos/markers)
- Stats Cards Strip (scroll horizontal móvil)
- Department Chip Grid
- CTA Button centrado

---

## SECCIÓN 04 — ÚLTIMAS NOTICIAS

| Campo | Detalle |
|-------|---------|
| **Nombre** | Noticias IEMB |
| **Objetivo** | Demostrar que la iglesia tiene voz pública, es actual y tiene algo que decir. |
| **Emoción** | Actividad. Relevancia. "Esto está pasando ahora en la iglesia." |
| **Prioridad visual** | 🟡 MEDIA-ALTA |
| **CTA principal** | `Ver todas las noticias →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `NOTICIAS`
- **Titular**: `"Al día con la IEMB"`
- **Estructura de noticias** (3 cards):
  - Card destacada (grande): Noticia principal con imagen, categoría, título y extracto.
  - 2 Cards secundarias (medianas): Imagen pequeña + categoría + título.
- **Filtros de categoría** (chips seleccionables): Institucional · Acción Social · Fe y Doctrina · Internacional
- **Fecha de publicación** visible en cada card
- **Enlace individual** en cada card

**Comportamiento Mobile First:**
- Móvil: Stack vertical, una noticia por fila. La destacada primero, luego las dos secundarias.
- Escritorio: Grid asimétrico — 1 card grande izquierda + 2 cards apiladas derecha.

**Componentes UI:**
- News Card (variante grande y variante compacta)
- Category Badge / Tag
- Category Filter Chips
- "Ver más" CTA link

---

## SECCIÓN 05 — HISTORIA Y LEGADO

| Campo | Detalle |
|-------|---------|
| **Nombre** | 130+ Años de Historia Metodista en Bolivia |
| **Objetivo** | Anclar emocionalmente la autoridad histórica de la IEMB. Diferenciación radical frente a iglesias nuevas sin raíces. |
| **Emoción** | Reverencia. Continuidad. "Esto tiene peso. Esto tiene raíces." |
| **Prioridad visual** | 🟡 MEDIA |
| **CTA principal** | `Conoce nuestra historia completa →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Tratamiento visual**: Sección con fondo diferente (textura o patrón sutil) para romper el ritmo visual de la página.
- **Eyebrow label**: `DESDE 1906 · HISTORIA METODISTA`
- **Titular**: `"Más de un siglo construyendo fe, educación y esperanza en Bolivia"`
- **Texto editorial corto** (2–3 oraciones): Resumen del impacto histórico de la IEMB.
- **3 hitos históricos** en formato de mini-timeline horizontal:
  - `1906` — Llegada del metodismo a Bolivia
  - `1969` — Autonomía de la IEMB
  - `Hoy` — Presente en los 9 departamentos
- **Fotografía histórica** (blanco y negro auténtica si existe, o ilustración sobria)

**Comportamiento Mobile First:**
- Móvil: Timeline vertical, texto arriba, imagen abajo.
- Escritorio: Imagen izquierda, texto + timeline derecha.

**Componentes UI:**
- Full-width Section con fondo alternativo
- Mini Timeline (horizontal escritorio / vertical móvil)
- Editorial Text Block
- Historical Photo Frame (con efecto de foto antigua opcional)

---

## SECCIÓN 06 — ACCIÓN SOCIAL

| Campo | Detalle |
|-------|---------|
| **Nombre** | Fe que Transforma — Acción Social |
| **Objetivo** | Demostrar que la IEMB no es solo espiritual: actúa, construye, cuida. Diferenciación frente a iglesias que solo predican. |
| **Emoción** | Admiración. Gratitud. "Esta iglesia hace algo real en Bolivia." |
| **Prioridad visual** | 🔴 ALTA |
| **CTA principal** | `Conoce nuestros proyectos →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `ACCIÓN SOCIAL`
- **Titular**: `"La fe metodista se ve. Se toca. Transforma vidas."`
- **3 o 4 pilares de acción** en formato de cards con ícono:
  - 🎓 **Educación** — Colegios y programas educativos en todo el país
  - 🏥 **Salud** — Centros de atención y programas comunitarios
  - 🤝 **Comunidades** — Trabajo con pueblos originarios y zonas rurales
  - 🌱 **Medioambiente** — Cuidado de la creación (si aplica)
- **Cifra de impacto** (si disponible): `+10,000 personas beneficiadas anualmente`
- **Fotografía real** de proyectos activos (no stock)

**Comportamiento Mobile First:**
- Móvil: Titular + texto + cards en grid 2x2.
- Escritorio: Titular izquierda, grid de cards derecha.

**Componentes UI:**
- Impact Cards con ícono + título + descripción breve
- Impact Counter (cifra grande animada al hacer scroll)
- CTA Button

---

## SECCIÓN 07 — FE METODISTA

| Campo | Detalle |
|-------|---------|
| **Nombre** | Nuestra Fe — Identidad Metodista |
| **Objetivo** | Explicar brevemente qué cree la IEMB. Diferenciarla doctrinalmente con orgullo (no defensivamente). Invitar a conocer más. |
| **Emoción** | Claridad. Identidad. "Sé exactamente en qué creen y por qué importa." |
| **Prioridad visual** | 🟡 MEDIA |
| **CTA principal** | `Conoce nuestra fe →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `NUESTRA FE`
- **Titular**: `"Metodistas. Wesleyanos. Bolivianos."`
- **Extracto editorial** (3–4 líneas): Qué significa ser metodista: gracia, santidad, acción social, comunidad.
- **3 pilares de fe** en formato de citas o tarjetas compactas:
  - "Gracia para todos" — Teología wesleyana inclusiva
  - "Fe y obras" — La fe se demuestra en la acción
  - "Santidad de corazón y vida" — El llamado metodista
- **Versículo ancla**: Cita bíblica representativa del metodismo (Ej: Miqueas 6:8)

**Comportamiento Mobile First:**
- Móvil: Cita / versículo al inicio (impacto emocional inmediato), luego los pilares.
- Escritorio: Layout centrado, elegante. Pilares en fila.

**Componentes UI:**
- Quote Block (versículo destacado con tipografía grande)
- Faith Pillars Cards (3 tarjetas compactas)
- Editorial Text
- CTA Link

---

## SECCIÓN 08 — RECURSOS ⭐

| Campo | Detalle |
|-------|---------|
| **Nombre** | Recursos para tu Fe y Ministerio |
| **Objetivo** | Mostrar que el portal es una biblioteca viva, no solo un folleto. Crear razón de retorno. Destinar especialmente a pastores y líderes. |
| **Emoción** | Utilidad. Generosidad. "Esto es para mí. Puedo volver aquí." |
| **Prioridad visual** | 🔴 ALTA |
| **CTA principal** | `Explorar todos los recursos →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `RECURSOS`
- **Titular**: `"Todo lo que necesitas para crecer en fe y liderazgo"`
- **4 categorías de recursos** en cards destacadas:
  - 📖 **Devocionales** — Lecturas diarias para tu vida espiritual
  - 🎤 **Sermones** — Predicaciones de pastores de la IEMB
  - 📚 **Escuela Dominical** — Material curicular por edades
  - 📄 **Formación Ministerial** — Para pastores y líderes en formación
- **Recurso destacado de la semana** (card especial):
  - Nombre del recurso · Categoría · Botón de descarga/acceso
- **Contador**: `+150 recursos disponibles` (si aplica)

**Comportamiento Mobile First:**
- Móvil: Cards en grid 2x2. Recurso destacado arriba del grid.
- Escritorio: Grid de 4 en fila. Recurso destacado aparte, visualmente diferenciado.

**Componentes UI:**
- Resource Category Cards (ícono + título + descripción + CTA)
- Featured Resource Card (tamaño especial, visualmente dominante)
- Resource Counter Badge
- CTA Button principal

---

## SECCIÓN 09 — REFLEXIÓN / PALABRA DEL DÍA

| Campo | Detalle |
|-------|---------|
| **Nombre** | Palabra del Día |
| **Objetivo** | Crear un momento de pausa espiritual en el scroll. Recordar que esto es una iglesia, no solo una institución. |
| **Emoción** | Paz. Conexión espiritual. "Esto me habla." |
| **Prioridad visual** | 🟡 MEDIA — Función de "respiro" visual entre secciones densas. |
| **CTA principal** | `Leer devocional completo →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Sin eyebrow label** — Esta sección no necesita categoría, habla sola.
- **Versículo o reflexión del día** (rotación programada o manual):
  - Texto del versículo — grande, centrado, con peso tipográfico
  - Referencia bíblica
- **Autor de la reflexión** (opcional): Pastor o figura de la IEMB
- **Fondo de sección**: Imagen de la naturaleza boliviana (altiplano, yungas, selva) con tratamiento visual que no compita con el texto.

**Comportamiento Mobile First:**
- Móvil: Full-width, centrado, tipografía de impacto grande. Sin elementos secundarios que distraigan.
- Escritorio: Igual, pero con más espacio en blanco (padding generoso).

**Componentes UI:**
- Full-width Quote Section
- Bible Reference Tag
- Author Attribution (opcional)
- Background Image con overlay textural

---

## SECCIÓN 10 — AGENDA / PRÓXIMOS EVENTOS

| Campo | Detalle |
|-------|---------|
| **Nombre** | Agenda IEMB |
| **Objetivo** | Mostrar que la iglesia está activa con eventos, cultos especiales, asambleas y actividades. Invitar a participar. |
| **Emoción** | Invitación. Comunidad. "Hay algo para mí pronto." |
| **Prioridad visual** | 🟡 MEDIA |
| **CTA principal** | `Ver agenda completa →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `AGENDA`
- **Titular**: `"Próximas actividades"`
- **Lista de 3–4 eventos próximos**:
  - Fecha (día + mes, grande) · Nombre del evento · Ciudad / Modalidad
- **Indicador de evento destacado** (badge: PRÓXIMO / ESPECIAL)
- **Enlace a inscripción o más info** por evento (si aplica)

**Comportamiento Mobile First:**
- Móvil: Lista vertical de eventos, cada uno como una fila card.
- Escritorio: Grid de 3 o 4 eventos en fila horizontal.

**Componentes UI:**
- Event Cards con fecha destacada (estilo "calendar card")
- Event Badge (tipo / estado)
- CTA Link

---

## SECCIÓN 11 — IGLESIAS CERCA DE TI

| Campo | Detalle |
|-------|---------|
| **Nombre** | Encuentra tu Iglesia |
| **Objetivo** | El último empujón para conectar a la persona con su comunidad local. Conversión de visitante a feligrés potencial. |
| **Emoción** | Pertenencia. Cercanía. "Hay una iglesia para mí." |
| **Prioridad visual** | 🔴 ALTA — Sección de conversión. |
| **CTA principal** | `Buscar iglesias →` |
| **Versión** | ✅ v1.0 |

**Contenido:**

- **Eyebrow label**: `IGLESIAS`
- **Titular**: `"Hay una iglesia metodista cerca de ti"`
- **Buscador simplificado inline** (campo de búsqueda por ciudad o departamento)
- **Acceso rápido por departamento** (chips / botones):
  La Paz · Cochabamba · Santa Cruz · Oruro · Potosí · Sucre · Tarija · Beni · Pando
- **Dato de apoyo**: `+200 congregaciones en todo Bolivia`
- **Imagen de apoyo**: Fachada de iglesia local (foto real, no stock)

**Comportamiento Mobile First:**
- Móvil: Buscador a pantalla completa, chips de departamento en scroll horizontal.
- Escritorio: Buscador centrado, chips en dos filas. Imagen decorativa lateral.

**Componentes UI:**
- Inline Search Bar
- Department Quick-Access Chips (scroll horizontal móvil)
- Supporting Stat
- CTA Button

---

## FOOTER — Componente Global

| Campo | Detalle |
|-------|---------|
| **Objetivo** | Cierre institucional. Toda la información crítica accesible sin navegación adicional. |
| **Emoción** | Solidez. Confianza. "Esta institución sabe quién es." |
| **Prioridad visual** | 🟡 MEDIA — Siempre presente, nunca invasivo. |

**Contenido en columnas:**

**Columna 1 — Identidad:**
- Logo IEMB (versión clara sobre fondo oscuro)
- Tagline institucional breve
- Dirección sede central
- Teléfono y correo institucional

**Columna 2 — Navegación:**
- Nosotros · Autoridades · Noticias · Radio TV · Recursos · Iglesias

**Columna 3 — Radio TV Metodista:**
- Enlace directo a Radio en Vivo
- Enlace directo a TV en Vivo
- Programación semanal

**Columna 4 — Síguenos:**
- Redes sociales (Facebook, YouTube, Instagram, WhatsApp)
- Suscripción al boletín (campo de email + botón)

**Franja inferior:**
- `© 2025 Iglesia Evangélica Metodista en Bolivia. Todos los derechos reservados.`
- Aviso de Privacidad · Términos de Uso
- Hecho en Bolivia 🇧🇴

**Componentes UI:**
- Footer Grid (4 columnas escritorio / 2 columnas móvil / 1 columna xs)
- Social Media Icon Links
- Email Subscription Inline Form
- Legal Links Strip

---

## WIREFRAME TEXTUAL COMPLETO — HOME PAGE IEMB

```
┌─────────────────────────────────────────────────────────────┐
│ NAVBAR [STICKY]                                             │
│ [LOGO IEMB]    Nosotros  Autoridades  Noticias  ...  [🔍]  │
│                          [📡 RADIO TV]    [📚 RECURSOS]     │
└─────────────────────────────────────────────────────────────┘

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 01 — HERO (100vh escritorio / 70vh móvil)          ║
║                                                             ║
║  ┌─────────────────────┐  ┌─────────────────────────────┐  ║
║  │                     │  │                             │  ║
║  │   IMAGEN REAL        │  │  "Más de 130 años           │  ║
║  │   (congregación     │  │   sirviendo a Bolivia       │  ║
║  │    boliviana)       │  │   con fe, educación         │  ║
║  │                     │  │   y acción social"          │  ║
║  │                     │  │                             │  ║
║  │                     │  │  IEMB — 9 departamentos     │  ║
║  │                     │  │                             │  ║
║  │                     │  │  [130+ Años] [9 Depts]      │  ║
║  │                     │  │  [+200 Congregaciones]      │  ║
║  │                     │  │                             │  ║
║  │                     │  │  [Conoce nuestra historia]  │  ║
║  │                     │  │  [Encuentra tu iglesia]     │  ║
║  └─────────────────────┘  └─────────────────────────────┘  ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 02 — RADIO TV METODISTA ⭐ (primer scroll)         ║
║                                                             ║
║  📡 RADIO TV METODISTA                                      ║
║  ● EN VIVO   "Palabra Viva" — 08:00 a 09:00 hrs            ║
║                                                             ║
║  ┌─────────────────────────┐  ┌────────────────────────┐   ║
║  │  🎵 RADIO EN VIVO       │  │  📺 TV EN VIVO          │   ║
║  │  ─────────────────────  │  │  ───────────────────── │   ║
║  │  ▶ ──────────────── 🔊  │  │  [  FRAME DE VIDEO  ]  │   ║
║  │                         │  │                        │   ║
║  │  [Escuchar en vivo]     │  │  [Ver en vivo]         │   ║
║  └─────────────────────────┘  └────────────────────────┘   ║
║                                                             ║
║  PRÓXIMOS PROGRAMAS HOY:                                    ║
║  09:00  Devocional Matutino                                 ║
║  11:00  Predicación Evangélica                              ║
║  18:00  Noticiero Metodista                                 ║
║                                                             ║
║  [Ver programación semanal completa →]                      ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 03 — PRESENCIA NACIONAL                             ║
║                                                             ║
║  PRESENCIA NACIONAL                                         ║
║  "De Cobija a Potosí. La IEMB está donde Bolivia vive."    ║
║                                                             ║
║  ┌─────────────────────────┐   ┌────────────────────────┐  ║
║  │                         │   │ [9 Dept.] [+200 Igles] │  ║
║  │   🗺️  MAPA DE BOLIVIA   │   │ [50 Past.] [9 Distr.]  │  ║
║  │       (SVG con puntos)  │   │                        │  ║
║  │                         │   │ La Paz · Cochabamba    │  ║
║  │   • La Paz              │   │ Santa Cruz · Oruro     │  ║
║  │   • Cochabamba          │   │ Potosí · Sucre         │  ║
║  │   • Santa Cruz ...      │   │ Tarija · Beni · Pando  │  ║
║  │                         │   │                        │  ║
║  └─────────────────────────┘   └────────────────────────┘  ║
║                                                             ║
║             [Encuentra tu iglesia más cercana]              ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 04 — NOTICIAS                                       ║
║                                                             ║
║  NOTICIAS — "Al día con la IEMB"                            ║
║  [Institucional] [Acción Social] [Fe y Doctrina] [Inter'l] ║
║                                                             ║
║  ┌───────────────────────────────────┐  ┌───────────────┐  ║
║  │  [IMAGEN GRANDE]                  │  │ [IMG PEQUEÑA] │  ║
║  │                                   │  │ CATEGORÍA     │  ║
║  │  CATEGORÍA · FECHA                │  │ Título noticia│  ║
║  │  Título Principal de la Noticia   │  │ Resumen...    │  ║
║  │  Destacada Esta Semana            │  │ [Leer más →]  │  ║
║  │  Extracto breve de la noticia...  │  ├───────────────┤  ║
║  │  [Leer noticia completa →]        │  │ [IMG PEQUEÑA] │  ║
║  │                                   │  │ CATEGORÍA     │  ║
║  │                                   │  │ Título noticia│  ║
║  │                                   │  │ [Leer más →]  │  ║
║  └───────────────────────────────────┘  └───────────────┘  ║
║                                                             ║
║                    [Ver todas las noticias →]               ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 05 — HISTORIA Y LEGADO                              ║
║ [FONDO CON TEXTURA / PATRÓN — Sección diferenciada]        ║
║                                                             ║
║  DESDE 1906 · HISTORIA METODISTA                            ║
║  "Más de un siglo construyendo fe,                          ║
║  educación y esperanza en Bolivia"                          ║
║                                                             ║
║  ┌──────────────┐    Texto editorial (2-3 párrafos)         ║
║  │              │                                           ║
║  │  FOTOGRAFÍA  │    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━   ║
║  │  HISTÓRICA   │    1906         1969         Hoy          ║
║  │  (B&W)       │    Llegada  Autonomía    9 Departamentos  ║
║  │              │                                           ║
║  └──────────────┘    [Conoce nuestra historia completa →]  ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 06 — ACCIÓN SOCIAL                                  ║
║                                                             ║
║  ACCIÓN SOCIAL                                              ║
║  "La fe metodista se ve. Se toca. Transforma vidas."       ║
║                                                             ║
║  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐ ║
║  │ 🎓        │  │ 🏥        │  │ 🤝        │  │ 🌱      │ ║
║  │ EDUCACIÓN │  │   SALUD   │  │COMUNIDADES│  │  MEDIO  │ ║
║  │           │  │           │  │           │  │AMBIENTE │ ║
║  │ Colegios  │  │ Centros   │  │ Pueblos   │  │ Cuidado │ ║
║  │ y programas│ │ de salud  │  │ originarios│ │de la    │ ║
║  │ educativos│  │ comunit.  │  │ y rurales │  │ creación│ ║
║  └───────────┘  └───────────┘  └───────────┘  └─────────┘ ║
║                                                             ║
║              +10,000 personas beneficiadas / año            ║
║                                                             ║
║                  [Conoce nuestros proyectos →]              ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 07 — FE METODISTA                                   ║
║                                                             ║
║  NUESTRA FE                                                 ║
║  "Metodistas. Wesleyanos. Bolivianos."                      ║
║                                                             ║
║  Texto editorial: qué significa ser metodista en Bolivia.  ║
║                                                             ║
║  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────┐  ║
║  │ "Gracia para    │ │ "Fe y obras"    │ │ "Santidad   │  ║
║  │  todos"         │ │                 │ │  de corazón │  ║
║  │ Teología        │ │ La fe se        │ │  y vida"    │  ║
║  │ inclusiva       │ │ demuestra       │ │ El llamado  │  ║
║  │                 │ │ en la acción    │ │ metodista   │  ║
║  └─────────────────┘ └─────────────────┘ └─────────────┘  ║
║                                                             ║
║  ❝ Actuar justamente, amar misericordia y              ❞   ║
║     caminar humildemente con tu Dios. — Miqueas 6:8        ║
║                                                             ║
║                     [Conoce nuestra fe →]                   ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 08 — RECURSOS ⭐                                    ║
║                                                             ║
║  RECURSOS                                                   ║
║  "Todo lo que necesitas para crecer en fe y liderazgo"     ║
║                                                             ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ ⭐ RECURSO DESTACADO DE LA SEMANA                    │   ║
║  │ "Guía de Escuela Dominical — Ciclo 2025"            │   ║
║  │ Material curricular · Para líderes                  │   ║
║  │ [Descargar gratis →]                                │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                             ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     ║
║  │ 📖           │  │ 🎤           │  │ 📚           │     ║
║  │ Devocionales │  │ Sermones     │  │ Esc. Domin.  │     ║
║  │ [Explorar →] │  │ [Explorar →] │  │ [Explorar →] │     ║
║  └──────────────┘  └──────────────┘  └──────────────┘     ║
║  ┌──────────────┐                                          ║
║  │ 📄           │     +150 recursos disponibles            ║
║  │ Form. Minist.│                                          ║
║  │ [Explorar →] │     [Explorar todos los recursos →]      ║
║  └──────────────┘                                          ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 09 — PALABRA DEL DÍA                               ║
║ [FONDO: IMAGEN NATURALEZA BOLIVIANA + OVERLAY]             ║
║                                                             ║
║                                                             ║
║         ❝ Porque yo sé los planes que tengo para           ║
║           ustedes, planes para prosperarlos y               ║
║           no para hacerles daño, planes que                 ║
║           les darán esperanza y un futuro.  ❞               ║
║                                                             ║
║                   — Jeremías 29:11                          ║
║                                                             ║
║               [Leer devocional completo →]                  ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 10 — AGENDA                                         ║
║                                                             ║
║  AGENDA — "Próximas actividades"                            ║
║                                                             ║
║  ┌───────┬──────────────────────────────────────────────┐  ║
║  │  15   │ Asamblea Distrital La Paz                    │  ║
║  │  JUN  │ La Paz · Presencial  [PRÓXIMO]               │  ║
║  ├───────┼──────────────────────────────────────────────┤  ║
║  │  22   │ Retiro Juvenil Nacional                      │  ║
║  │  JUN  │ Cochabamba · Presencial  [ESPECIAL]          │  ║
║  ├───────┼──────────────────────────────────────────────┤  ║
║  │  05   │ Culto de Aniversario IEMB                    │  ║
║  │  JUL  │ La Paz · Presencial + Transmisión en vivo    │  ║
║  └───────┴──────────────────────────────────────────────┘  ║
║                                                             ║
║                      [Ver agenda completa →]                ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ SECCIÓN 11 — IGLESIAS (Conversión final)                    ║
║                                                             ║
║  IGLESIAS                                                   ║
║  "Hay una iglesia metodista cerca de ti"                    ║
║                                                             ║
║  ┌─────────────────────────────────────────────────────┐   ║
║  │ 🔍  Busca por ciudad o departamento...    [Buscar]  │   ║
║  └─────────────────────────────────────────────────────┘   ║
║                                                             ║
║  [La Paz] [Cochabamba] [Santa Cruz] [Oruro] [Potosí]       ║
║  [Sucre]  [Tarija]    [Beni]       [Pando]                 ║
║                                                             ║
║           +200 congregaciones en todo Bolivia               ║
║                                                             ║
║                    [Ver directorio completo →]              ║
╚═════════════════════════════════════════════════════════════╝

╔═════════════════════════════════════════════════════════════╗
║ FOOTER                                                      ║
║                                                             ║
║  [LOGO]           Navegación      Radio TV        Síguenos  ║
║  Tagline          ─────────────   ────────────    ─────────  ║
║  IEMB             Nosotros        Radio en Vivo   Facebook  ║
║  Dirección        Autoridades     TV en Vivo      YouTube   ║
║  Tel / Email      Noticias        Programación    Instagram ║
║                   Recursos        ────────────    WhatsApp  ║
║                   Iglesias                        ─────────  ║
║                                                  [Email  ] ║
║                                                  [Suscrib.] ║
║ ─────────────────────────────────────────────────────────── ║
║  © 2025 IEMB · Privacidad · Términos · Hecho en Bolivia 🇧🇴 ║
╚═════════════════════════════════════════════════════════════╝
```

---

## Resumen de Secciones y Jerarquía

| # | Sección | Emoción clave | Pilar IEMB | Prioridad |
|---|---------|--------------|------------|-----------|
| 0 | Navbar | Claridad | Institucionalidad | Permanente |
| 1 | Hero Principal | Esperanza + Solidez | Todos los 5 | 🔴 MÁXIMA |
| 2 | Radio TV en Vivo ⭐ | Presencia · Urgencia | Fe Viva / Medios | 🔴 ALTA |
| 3 | Presencia Nacional | Orgullo · Pertenencia | Institucionalidad | 🔴 ALTA |
| 4 | Noticias | Actividad · Relevancia | Institucionalidad | 🟡 MEDIA-ALTA |
| 5 | Historia y Legado | Reverencia · Continuidad | Historia | 🟡 MEDIA |
| 6 | Acción Social | Admiración · Gratitud | Acción Social | 🔴 ALTA |
| 7 | Fe Metodista | Claridad · Identidad | Fe Metodista | 🟡 MEDIA |
| 8 | Recursos ⭐ | Utilidad · Generosidad | Educación | 🔴 ALTA |
| 9 | Palabra del Día | Paz · Conexión espiritual | Fe Viva | 🟡 MEDIA |
| 10 | Agenda | Invitación · Comunidad | Fe Viva | 🟡 MEDIA |
| 11 | Iglesias | Pertenencia · Cercanía | Institucionalidad | 🔴 ALTA |
| 12 | Footer | Solidez · Confianza | Institucionalidad | Permanente |
