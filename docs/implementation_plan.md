# Arquitectura Técnica — Portal IEMB v1.0
**Iglesia Evangélica Metodista en Bolivia**
*Decisiones Arquitectónicas — Listas para Implementación*

---

## Principios Técnicos No Negociables

Antes de cualquier decisión técnica, estos principios rigen la arquitectura:

1. **Performance First**: Bolivia tiene conexiones móviles lentas (3G en zonas rurales). Core Web Vitals perfectos no son opcionales.
2. **Zero Cold Starts en contenido público**: El feligrés que busca su iglesia a las 7am no puede ver un spinner de 3 segundos.
3. **Firebase como backend, no como arquitectura**: Firebase es una herramienta, no el diseño del sistema. El frontend no habla directamente con Firebase en el 80% de los casos.
4. **Cloudflare como primera línea**: CDN, caché, seguridad y despliegue viven en Cloudflare. Firebase nunca es el origen bajo carga.
5. **Separación de concerns estricta**: La capa de datos, la capa de presentación y la capa de negocio son independientes.

---

# I. ARQUITECTURA GENERAL DEL SISTEMA

## 1.1 Diagrama de Capas

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIOS FINALES                      │
│           (Móvil Android · Desktop · Tablet)            │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────────┐
│                 CLOUDFLARE EDGE                          │
│         CDN · WAF · DDoS · SSL/TLS · Cache              │
│              Cloudflare Pages (hosting)                  │
└────────────────────────┬────────────────────────────────┘
                         │
┌────────────────────────▼────────────────────────────────┐
│              NEXT.JS 15 — APP ROUTER                     │
│                                                          │
│  ┌──────────────────┐    ┌──────────────────────────┐   │
│  │  SERVER LAYER    │    │     CLIENT LAYER          │   │
│  │                  │    │                           │   │
│  │ - RSC (default)  │    │ - Interactividad UI       │   │
│  │ - Route Handlers │    │ - Estado local            │   │
│  │ - Middleware     │    │ - Radio/TV player         │   │
│  │ - ISR/SSG/SSR    │    │ - Buscador iglesias       │   │
│  │ - Metadata API   │    │ - Formularios             │   │
│  └──────────────────┘    └──────────────────────────┘   │
└────────┬───────────────────────────────┬────────────────┘
         │                               │
┌────────▼──────────┐        ┌───────────▼───────────────┐
│   FIREBASE         │        │    CLOUDFLARE R2           │
│                    │        │                            │
│ • Firestore DB     │        │ • Imágenes optimizadas     │
│ • Firebase Auth    │        │ • PDFs y documentos        │
│ • Firebase Storage │        │ • Assets estáticos         │
│ • Firebase Analytics│       │ • Backup de media          │
└────────────────────┘        └────────────────────────────┘
```

## 1.2 Estrategia de Rendering por Tipo de Página

| Página / Sección | Estrategia | Revalidación | Justificación |
|-----------------|-----------|-------------|---------------|
| Home Page | **ISR** | 60 min | Contenido semifrecuente, crítico para performance |
| Noticias (listado) | **ISR** | 30 min | Se actualiza varias veces al día |
| Noticia individual | **ISR** | 24 horas | Contenido estable después de publicación |
| Iglesias (listado) | **SSG** | 24 horas | Datos que cambian raramente |
| Iglesia individual | **SSG** | 24 horas | Datos muy estables |
| Autoridades | **SSG** | 1 semana | Cambia raramente |
| Recursos (listado) | **ISR** | 2 horas | Se agregan nuevos con frecuencia media |
| Radio TV / Programación | **ISR** | 1 hora | Programación semanal |
| Página de búsqueda | **SSR** | No aplica | Dinámico por query string |
| Intranet / Auth | **SSR** | No aplica | Siempre dinámico, autenticado |
| Contacto | **SSG** | Estático | Formulario sin datos dinámicos |
| 404, Privacy, Terms | **SSG** | Estático | Nunca cambian |

**Regla de oro**: Si una página puede ser SSG, es SSG. Si debe actualizarse, es ISR. SSR solo cuando hay datos de usuario autenticado o query params dinámicos.

## 1.3 Flujo de Datos

```
ESCRITURA (Admin CMS → Firebase):
Admin Panel → Firebase Auth (verificar rol) → Firestore → 
  Cloudflare Pages revalidate (on-demand ISR) → Caché actualizada

LECTURA (Usuario → Portal):
Request → Cloudflare CDN [HIT] → Respuesta inmediata (~50ms)
Request → Cloudflare CDN [MISS] → Next.js RSC → Firestore → 
  Render → Cloudflare cachea → Respuesta (~300ms)
```

---

# II. ESTRUCTURA DE CARPETAS — NEXT.JS 15

## 2.1 Convenciones que Seguimos

- **App Router** (no Pages Router): Usando la arquitectura moderna de Next.js 15.
- **Feature-based**: Las carpetas se organizan por feature/dominio, no por tipo de archivo.
- **Colocation**: Los archivos viven cerca de donde se usan.
- **Barrel exports**: Cada carpeta de componentes expone un `index.ts`.

## 2.2 Estructura Completa

```
portal-iemb/
│
├── app/                                  # App Router — Next.js 15
│   ├── (marketing)/                      # Route Group — páginas públicas
│   │   ├── layout.tsx                    # Layout base público (navbar + footer)
│   │   ├── page.tsx                      # Home Page /
│   │   │
│   │   ├── nosotros/
│   │   │   ├── page.tsx                  # /nosotros
│   │   │   ├── historia/page.tsx         # /nosotros/historia
│   │   │   ├── mision-vision/page.tsx    # /nosotros/mision-vision
│   │   │   ├── fe-metodista/page.tsx     # /nosotros/fe-metodista
│   │   │   ├── estructura/page.tsx       # /nosotros/estructura
│   │   │   ├── accion-social/page.tsx    # /nosotros/accion-social
│   │   │   └── documentos/page.tsx       # /nosotros/documentos
│   │   │
│   │   ├── autoridades/
│   │   │   ├── page.tsx                  # /autoridades
│   │   │   ├── obispo/page.tsx
│   │   │   ├── gabinete/page.tsx
│   │   │   ├── conferencia/page.tsx
│   │   │   └── superintendentes/page.tsx
│   │   │
│   │   ├── noticias/
│   │   │   ├── page.tsx                  # /noticias (listado)
│   │   │   ├── [slug]/
│   │   │   │   ├── page.tsx              # /noticias/[slug]
│   │   │   │   └── loading.tsx           # Skeleton loader
│   │   │   ├── categoria/
│   │   │   │   └── [nombre]/page.tsx     # /noticias/categoria/[nombre]
│   │   │   ├── comunicados/page.tsx
│   │   │   └── agenda/page.tsx
│   │   │
│   │   ├── radio-tv/
│   │   │   ├── page.tsx                  # /radio-tv
│   │   │   ├── radio-en-vivo/page.tsx
│   │   │   ├── tv-en-vivo/page.tsx
│   │   │   ├── programacion/page.tsx
│   │   │   └── sobre/page.tsx
│   │   │
│   │   ├── recursos/
│   │   │   ├── page.tsx                  # /recursos
│   │   │   ├── devocionales/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── sermones/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── escuela-dominical/page.tsx
│   │   │   ├── formacion-ministerial/page.tsx
│   │   │   └── documentos/page.tsx
│   │   │
│   │   ├── iglesias/
│   │   │   ├── page.tsx                  # /iglesias (buscador)
│   │   │   ├── [id]/page.tsx             # /iglesias/[id] (perfil)
│   │   │   └── distrito/
│   │   │       └── [nombre]/page.tsx     # /iglesias/distrito/[nombre]
│   │   │
│   │   ├── contacto/page.tsx
│   │   └── buscar/page.tsx
│   │
│   ├── (auth)/                           # Route Group — autenticación
│   │   ├── layout.tsx                    # Layout mínimo sin navbar/footer
│   │   └── login/page.tsx
│   │
│   ├── (intranet)/                       # Route Group — área privada
│   │   ├── layout.tsx                    # Layout intranet (sidebar + auth guard)
│   │   └── dashboard/
│   │       ├── page.tsx
│   │       ├── noticias/
│   │       │   ├── page.tsx              # Listado de noticias (admin)
│   │       │   ├── nueva/page.tsx        # Crear noticia
│   │       │   └── [id]/editar/page.tsx  # Editar noticia
│   │       ├── recursos/page.tsx
│   │       └── iglesias/page.tsx
│   │
│   ├── api/                              # Route Handlers
│   │   ├── revalidate/route.ts           # Webhook para ISR on-demand
│   │   ├── contacto/route.ts             # Envío de formulario de contacto
│   │   ├── buscar/route.ts               # API de búsqueda global
│   │   └── newsletter/route.ts           # Suscripción al newsletter
│   │
│   ├── sitemap.ts                        # Sitemap dinámico automático
│   ├── robots.ts                         # robots.txt dinámico
│   ├── manifest.ts                       # Web App Manifest (PWA-ready)
│   ├── not-found.tsx                     # Página 404 personalizada
│   ├── error.tsx                         # Error boundary global
│   ├── loading.tsx                       # Loading state global
│   ├── globals.css                       # CSS global + custom properties
│   └── layout.tsx                        # Root layout (html, body, providers)
│
├── components/                           # Componentes reutilizables
│   ├── ui/                               # Átomos — componentes base del DS
│   │   ├── button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.types.ts
│   │   │   └── index.ts
│   │   ├── badge/
│   │   ├── card/
│   │   ├── input/
│   │   ├── textarea/
│   │   ├── select/
│   │   ├── skeleton/
│   │   └── index.ts                      # Barrel export de todos los UI
│   │
│   ├── layout/                           # Componentes de estructura
│   │   ├── Navbar/
│   │   │   ├── Navbar.tsx                # Server Component
│   │   │   ├── NavbarClient.tsx          # Client Component (drawer, scroll)
│   │   │   ├── MegaMenu.tsx
│   │   │   └── index.ts
│   │   ├── Footer/
│   │   │   ├── Footer.tsx
│   │   │   └── index.ts
│   │   └── Container/
│   │       ├── Container.tsx
│   │       └── index.ts
│   │
│   ├── sections/                         # Secciones de página (organismos)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── RadioTVSection.tsx
│   │   │   ├── PresenciaNacionalSection.tsx
│   │   │   ├── NoticiasSection.tsx
│   │   │   ├── HistoriaSection.tsx
│   │   │   ├── AccionSocialSection.tsx
│   │   │   ├── FeMetodistaSection.tsx
│   │   │   ├── RecursosSection.tsx
│   │   │   ├── PalabraDelDiaSection.tsx
│   │   │   ├── AgendaSection.tsx
│   │   │   └── IglesiasSection.tsx
│   │   ├── noticias/
│   │   ├── recursos/
│   │   └── iglesias/
│   │
│   └── features/                         # Componentes de feature específica
│       ├── radio-player/
│       │   ├── RadioPlayer.tsx           # 'use client'
│       │   ├── LiveBadge.tsx             # 'use client'
│       │   └── index.ts
│       ├── church-finder/
│       │   ├── ChurchSearch.tsx          # 'use client'
│       │   ├── ChurchCard.tsx
│       │   └── index.ts
│       ├── news-filter/
│       │   └── CategoryFilter.tsx        # 'use client'
│       └── contact-form/
│           └── ContactForm.tsx           # 'use client'
│
├── lib/                                  # Capa de lógica y datos
│   ├── firebase/
│   │   ├── config.ts                     # Inicialización Firebase (servidor)
│   │   ├── config.client.ts              # Inicialización Firebase (cliente)
│   │   ├── admin.ts                      # Firebase Admin SDK
│   │   └── index.ts
│   │
│   ├── data/                             # Capa de acceso a datos
│   │   ├── noticias.ts                   # Queries de noticias → Firestore
│   │   ├── iglesias.ts                   # Queries de iglesias → Firestore
│   │   ├── recursos.ts
│   │   ├── autoridades.ts
│   │   ├── agenda.ts
│   │   └── programacion.ts
│   │
│   ├── utils/
│   │   ├── formatDate.ts
│   │   ├── slugify.ts
│   │   ├── cn.ts                         # classnames utility (clsx + twMerge)
│   │   └── seo.ts                        # Helpers de metadata
│   │
│   └── constants/
│       ├── navigation.ts                 # Definición del navbar
│       ├── departamentos.ts              # Lista de departamentos de Bolivia
│       └── seo.ts                        # Constantes SEO globales
│
├── types/                                # TypeScript types
│   ├── noticia.ts
│   ├── iglesia.ts
│   ├── recurso.ts
│   ├── autoridad.ts
│   ├── evento.ts
│   ├── programa.ts
│   └── index.ts
│
├── hooks/                                # Custom hooks (client-side)
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   └── useMediaQuery.ts
│
├── public/                               # Assets estáticos
│   ├── logos/
│   │   ├── iemb-logo.svg
│   │   ├── iemb-logo-white.svg
│   │   └── iemb-logo-icon.svg
│   ├── icons/                            # Favicons y app icons
│   │   ├── favicon.ico
│   │   ├── apple-touch-icon.png
│   │   └── icon-192.png
│   └── fonts/                            # Fuentes self-hosted (opcional)
│
├── tailwind.config.ts                    # Configuración de Tailwind + Design System
├── next.config.ts                        # Configuración de Next.js
├── middleware.ts                         # Auth guard, redirects, headers
├── .env.local                            # Variables de entorno (local)
├── .env.production                       # Variables de entorno (producción)
├── .gitignore
├── package.json
└── tsconfig.json
```

---

# III. ESTRATEGIA SERVER vs CLIENT COMPONENTS

## 3.1 Regla Decisoria

```
¿Necesita el componente alguno de estos?
│
├─ Estado de React (useState, useReducer)          → CLIENT
├─ Efectos del browser (useEffect, useLayoutEffect) → CLIENT
├─ Event handlers (onClick, onChange, onSubmit)    → CLIENT
├─ APIs del browser (window, localStorage)         → CLIENT
├─ Librerías que usan lo anterior                  → CLIENT
│
├─ Acceso directo a base de datos                  → SERVER
├─ Variables de entorno secretas                   → SERVER
├─ Datos en el servidor sin exposición             → SERVER
├─ Operaciones pesadas de transformación de datos  → SERVER
└─ Componente sin ninguna de las anteriores        → SERVER (default)
```

## 3.2 Tabla de Componentes por Tipo

| Componente | Tipo | Justificación |
|-----------|------|---------------|
| `Navbar` (estructura) | **Server** | Renderiza links estáticos, lee datos de config |
| `NavbarClient` (drawer, scroll) | **Client** | useState para apertura, scroll listeners |
| `MegaMenu` | **Server** | Estructura estática de links |
| `Footer` | **Server** | Todo estático |
| `HeroSection` | **Server** | Datos estáticos, sin interactividad |
| `RadioTVSection` (estructura) | **Server** | Renders la shell |
| `RadioPlayer` (player de audio) | **Client** | API de Audio, estado play/pause |
| `LiveBadge` | **Client** | Polling de estado EN VIVO cada 60s |
| `NoticiasSection` | **Server** | Fetch desde Firestore en servidor |
| `CategoryFilter` | **Client** | onClick, estado de filtro activo |
| `NewsCard` | **Server** | Solo renderiza datos |
| `ChurchSearch` | **Client** | onChange en input, estado de búsqueda |
| `ChurchCard` | **Server** | Solo renderiza datos de iglesia |
| `MapaBolivia` (estático) | **Server** | SVG estático |
| `MapaInteractivo` (Fase 2) | **Client** | Leaflet/Mapbox requiere browser |
| `ContactForm` | **Client** | useState, onSubmit, validación |
| `NewsletterForm` | **Client** | useState, onSubmit |
| `PalabraDelDia` | **Server** | Datos del servidor |
| `AgendaList` | **Server** | Datos del servidor |
| `Skeleton` loaders | **Server** | Streameable |
| `ErrorBoundary` | **Client** | Obligatoriamente client |

## 3.3 Patrón de Composición (Server→Client)

```
Página (Server) → Sección (Server) → Shell (Server)
                                       └── Parte interactiva (Client)

Ejemplo real:
  RadioTVPage (Server, fetch programación)
    └── RadioTVSection (Server, pasa datos como props)
          ├── ProgramacionList (Server, render lista)
          └── RadioPlayerShell (Server, render contenedor)
                └── RadioPlayer (Client, 'use client', maneja audio)
```

**Regla de composición**: Los Server Components pueden pasar datos como props a Client Components. Los Client Components NO pueden importar Server Components (solo como `children`).

---

# IV. INTEGRACIÓN CON FIREBASE

## 4.1 Servicios Firebase Utilizados

| Servicio | Uso en IEMB | Justificación |
|---------|------------|---------------|
| **Firestore** | Base de datos principal | NoSQL flexible, tiempo real opcional, excelente para contenido editorial |
| **Firebase Auth** | Autenticación de administradores | Email/Password para panel interno |
| **Firebase Storage** | Almacenamiento de imágenes y documentos | Backup y source of truth de assets |
| **Firebase Analytics** | Analítica de usuarios | Gratuito, integrado, sin cookies de terceros |

## 4.2 Colecciones de Firestore — Modelo de Datos

```
Firestore Database
│
├── noticias/                    # Colección de noticias
│   └── {noticiaId}
│       ├── titulo: string
│       ├── slug: string          # Único, usado en la URL
│       ├── extracto: string
│       ├── contenido: string     # HTML o Markdown
│       ├── categoria: string     # 'institucional' | 'accion-social' | ...
│       ├── imagenUrl: string     # URL de Cloudflare R2
│       ├── imagenAlt: string
│       ├── autor: string
│       ├── publicadoEn: Timestamp
│       ├── actualizadoEn: Timestamp
│       ├── publicado: boolean
│       └── destacado: boolean
│
├── iglesias/                    # Directorio de iglesias
│   └── {iglesiaId}
│       ├── nombre: string
│       ├── slug: string
│       ├── departamento: string  # 'la-paz' | 'cochabamba' | ...
│       ├── ciudad: string
│       ├── distrito: string
│       ├── direccion: string
│       ├── pastor: string
│       ├── telefono: string
│       ├── horarioCultos: array
│       ├── lat: number           # Para mapa (Fase 2)
│       ├── lng: number
│       └── activa: boolean
│
├── recursos/
│   └── {recursoId}
│       ├── titulo: string
│       ├── slug: string
│       ├── categoria: string     # 'devocional' | 'sermon' | 'escuela-dominical' | ...
│       ├── descripcion: string
│       ├── tipo: string          # 'pdf' | 'audio' | 'video' | 'texto'
│       ├── archivoUrl: string    # Cloudflare R2
│       ├── publicadoEn: Timestamp
│       └── publicado: boolean
│
├── autoridades/
│   └── {autoridadId}
│       ├── nombre: string
│       ├── cargo: string
│       ├── orden: number         # Para ordenar la lista
│       ├── bio: string
│       ├── fotoUrl: string
│       └── activo: boolean
│
├── eventos/
│   └── {eventoId}
│       ├── titulo: string
│       ├── fecha: Timestamp
│       ├── ciudad: string
│       ├── tipo: string          # 'presencial' | 'virtual' | 'hibrido'
│       ├── descripcion: string
│       └── destacado: boolean
│
├── programacion/
│   └── {programaId}
│       ├── nombre: string
│       ├── canal: string         # 'radio' | 'tv'
│       ├── diasSemana: array     # [1,2,3,4,5] (lunes-viernes)
│       ├── horaInicio: string    # '08:00'
│       ├── horaFin: string       # '09:00'
│       └── activo: boolean
│
└── config/                      # Documentos de configuración global
    ├── home                     # Contenido editable del home (versículo del día, etc.)
    ├── radio                    # URL del stream de radio
    └── contacto                 # Emails de destino
```

## 4.3 Reglas de Firestore (Security Rules — Resumen)

| Operación | Quién puede | Regla |
|-----------|------------|-------|
| Leer noticias publicadas | Cualquiera | `publicado == true` |
| Leer todas las noticias | Solo admins autenticados | `request.auth != null && role == 'admin'` |
| Escribir noticias | Solo admins | Verificación de rol en token |
| Leer iglesias activas | Cualquiera | `activa == true` |
| Leer configuración | Cualquiera (solo lectura) | `allow read` |
| Escribir todo | Solo admins autenticados | `request.auth != null` |

## 4.4 Estrategia de Caché para Firebase

```
Request de usuario
       ↓
Cloudflare CDN (caché de Next.js ISR) → [HIT] → respuesta inmediata
       ↓ [MISS]
Next.js Server Component
       ↓
lib/data/noticias.ts (con fetch + revalidate)
       ↓
Firebase Admin SDK → Firestore
       ↓
Respuesta → se cachea en Cloudflare
```

**Firestore NUNCA es llamado desde el cliente (browser)** en el portal público. Solo desde Server Components y Route Handlers. El cliente solo usa Firebase para:
- Autenticación (Auth SDK en intranet)
- Analytics

## 4.5 Firebase Admin vs Firebase Client

| SDK | Dónde vive | Para qué |
|-----|-----------|---------|
| **Firebase Admin SDK** | Solo servidor (RSC, Route Handlers, API) | Leer/escribir Firestore sin restricciones de Security Rules |
| **Firebase Client SDK** | Browser (Client Components) | Auth de usuario, Analytics |

---

# V. ESTRATEGIA SEO

## 5.1 Arquitectura de Metadata

Usamos la **Metadata API de Next.js 15** con herencia jerárquica:

```
Root Layout (metadata global)
  └── Layout de sección (override parcial)
        └── Página individual (override específico)
```

### Metadata Global (Root Layout)

| Campo | Valor | Propósito |
|-------|-------|-----------|
| `title.default` | `"Iglesia Evangélica Metodista en Bolivia"` | Fallback |
| `title.template` | `"%s — IEMB"` | Plantilla para páginas hijas |
| `description` | Descripción institucional (155 chars) | Meta descripción |
| `metadataBase` | `https://iemb.org.bo` | Base para URLs absolutas |
| `openGraph.type` | `website` | OG cards |
| `openGraph.locale` | `es_BO` | Bolivia |
| `twitter.card` | `summary_large_image` | Twitter/X cards |
| `robots` | `index, follow` | Crawling |
| `authors` | `[{ name: 'IEMB' }]` | Autoría |

### Metadata por Tipo de Página

| Tipo | title | description | ogImage |
|------|-------|-------------|---------|
| Home | `IEMB — Iglesia Evangélica Metodista en Bolivia` | Dinámica | Hero image |
| Noticia | `{titulo} — IEMB` | `{extracto}` | `{imagenUrl}` |
| Iglesia | `{nombre} — Directorio IEMB` | `{ciudad}, {departamento}` | OG genérico |
| Recurso | `{titulo} — Recursos IEMB` | `{descripcion}` | OG genérico |
| Sección fija | `{nombre sección} — IEMB` | Descripción curada | OG genérico |

## 5.2 Archivos de Raíz

| Archivo | Tipo | Contenido |
|---------|------|-----------|
| `sitemap.ts` | Dinámico (App Router) | Genera XML con todas las URLs públicas incluyendo noticias, iglesias y recursos desde Firestore |
| `robots.ts` | Dinámico | Permite crawling de todo excepto `/dashboard/`, `/api/`, `/login/` |
| `manifest.ts` | PWA Manifest | Nombre, íconos, colores de brand |

## 5.3 Datos Estructurados — Schema.org

| Página | Schema.org Type | Datos incluidos |
|--------|----------------|-----------------|
| Home | `Organization` | Nombre, logo, dirección, redes sociales, descripción |
| Home | `WebSite` | SearchAction para búsqueda interna |
| Noticia | `NewsArticle` | Autor, fecha, imagen, publisher, headline |
| Iglesia | `Church` + `LocalBusiness` | Dirección, horario, teléfono, GPS |
| Recurso | `DigitalDocument` | Nombre, tipo, autor, URL |
| Autoridad | `Person` | Nombre, cargo, organización |

## 5.4 URLs Canónicas

- Todas las páginas tienen `<link rel="canonical">` absoluta.
- Las páginas paginadas usan `rel="next"` y `rel="prev"`.
- Los filtros de categoría (noticias) NO generan URLs indexables (se manejan client-side).

## 5.5 SEO Local (Bolivia)

| Estrategia | Implementación |
|-----------|---------------|
| Idioma | `<html lang="es-BO">` |
| País | `og:locale = es_BO` |
| Página de Google My Business | Crear y enlazar desde footer |
| Keywords locales | "iglesia metodista Bolivia", "iglesia en {ciudad}" en cada perfil de iglesia |
| Schema `address` | `addressCountry: "BO"` en Organization y cada iglesia |

---

# VI. ESTRATEGIA DE IMÁGENES

## 6.1 Pipeline de Imágenes

```
Admin sube imagen
       ↓
Firebase Storage (almacenamiento original, archivo)
       ↓
Webhook → Route Handler `/api/process-image`
       ↓
Optimización server-side (resize, WebP, AVIF)
       ↓
Cloudflare R2 (distribución: original + versiones optimizadas)
       ↓
next/image sirve desde R2 con Cloudflare CDN
```

## 6.2 Configuración de `next/image`

| Parámetro | Valor | Justificación |
|-----------|-------|---------------|
| `domains` | `[r2.iemb.org.bo, firebasestorage.googleapis.com]` | Fuentes autorizadas |
| `formats` | `['image/avif', 'image/webp']` | Máxima compresión |
| `deviceSizes` | `[390, 640, 768, 1024, 1280, 1536]` | Mobile First exact breakpoints |
| `imageSizes` | `[48, 96, 128, 256, 384]` | Thumbnails y avatares |
| `minimumCacheTTL` | `2592000` (30 días) | Imágenes casi nunca cambian |

## 6.3 Tamaños y Formatos por Uso

| Contexto | Tamaño original | Formatos servidos | Aspect ratio |
|---------|----------------|------------------|-------------|
| Hero Home | 1440x810px | AVIF, WebP | 16:9 |
| Imagen de noticia | 800x450px | AVIF, WebP | 16:9 |
| Noticia destacada | 1200x630px | AVIF, WebP | 21:9 |
| OG Image / Social | 1200x630px | JPG (compatibilidad) | 1.91:1 |
| Foto de autoridad | 400x500px | AVIF, WebP | 4:5 (portrait) |
| Logo en SVG | SVG nativo | SVG | Variable |
| Ícono de iglesia | 64x64px | PNG | 1:1 |

## 6.4 Cloudflare R2 como CDN de Imágenes

- R2 no tiene costos de egress dentro de Cloudflare.
- Las imágenes se sirven desde `r2.iemb.org.bo` (subdominio propio).
- Cloudflare Cache Rules: `Cache-Control: public, max-age=31536000, immutable` para assets con hash en el nombre.
- Las imágenes del logo y assets del DS viven en `/public/` (Next.js static serving).

---

# VII. DESPLIEGUE EN CLOUDFLARE

## 7.1 Servicios Cloudflare Utilizados

| Servicio | Uso | Plan |
|---------|-----|------|
| **Cloudflare Pages** | Hosting del portal Next.js | Free / Pro |
| **Cloudflare CDN** | Cache global de assets y páginas | Incluido en Pages |
| **Cloudflare R2** | Almacenamiento de imágenes y archivos | Free tier amplio |
| **Cloudflare WAF** | Firewall de aplicación web | Pro |
| **Cloudflare SSL/TLS** | Certificados HTTPS automáticos | Incluido |
| **Cloudflare DNS** | Gestión de dominios | Free |
| **Cloudflare Analytics** | Tráfico y performance sin cookies | Incluido |

## 7.2 Arquitectura de Despliegue

```
GitHub (main branch) → GitHub Actions → Build Next.js →
Cloudflare Pages → Deploy global (300+ PoP)
```

### Pipeline CI/CD (GitHub Actions)

```
On: push to main
│
├── 1. Lint (ESLint + TypeScript check)
├── 2. Test (si hay tests)
├── 3. Build (next build)
│         └── Si falla → notificación → NO deploy
├── 4. Deploy a Cloudflare Pages
│         ├── Producción: iemb.org.bo (main branch)
│         └── Preview: pr-{número}.pages.dev (pull requests)
└── 5. Purge de caché Cloudflare (selectivo)
```

### Ambientes

| Ambiente | Branch | URL | Firebase Project |
|---------|--------|-----|-----------------|
| Producción | `main` | `iemb.org.bo` | `iemb-production` |
| Staging | `develop` | `staging.iemb.pages.dev` | `iemb-staging` |
| Preview | `feature/*` | `pr-{n}.iemb.pages.dev` | `iemb-staging` |

## 7.3 Configuración de Caché en Cloudflare

| Tipo de recurso | Cache TTL | Estrategia |
|----------------|-----------|-----------|
| HTML de páginas (ISR) | 1 hora | `s-maxage=3600, stale-while-revalidate` |
| Assets estáticos (JS/CSS con hash) | 1 año | `immutable` |
| Imágenes de contenido | 30 días | `public, max-age=2592000` |
| Imágenes del logo/DS | 1 año | `immutable` |
| API Routes | No cachear | `no-store` |
| Páginas autenticadas | No cachear | `private, no-store` |

## 7.4 Headers de Seguridad (middleware.ts)

| Header | Valor | Propósito |
|--------|-------|-----------|
| `X-Frame-Options` | `DENY` | Anti-clickjacking |
| `X-Content-Type-Options` | `nosniff` | Anti-MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control de referrer |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=(self)` | Solo geo para mapa |
| `Content-Security-Policy` | Whitelist de fuentes permitidas | Anti-XSS |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` | HTTPS forzado |

## 7.5 Configuración de Dominio

```
DNS Cloudflare:
  iemb.org.bo          → Cloudflare Pages (A/AAAA + Proxy)
  www.iemb.org.bo      → Redirect 301 a iemb.org.bo
  r2.iemb.org.bo       → Cloudflare R2 (CNAME + Proxy)
  
Redirects (wrangler.toml o Pages config):
  www.* → apex domain (301)
  http  → https (automático)
```

## 7.6 Variables de Entorno por Ambiente

```
# .env.local (nunca en Git)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_ADMIN_PROJECT_ID=            # Solo servidor
FIREBASE_ADMIN_PRIVATE_KEY=           # Solo servidor ⚠️
FIREBASE_ADMIN_CLIENT_EMAIL=          # Solo servidor
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
CLOUDFLARE_R2_BUCKET=
REVALIDATE_SECRET_TOKEN=              # Para webhooks ISR
CONTACT_EMAIL=                        # Email de destino formulario
```

**Regla**: Variables con `NEXT_PUBLIC_` son expuestas al browser. Todo lo demás es privado y vive solo en el servidor.

---

# VIII. ESCALABILIDAD FUTURA

## 8.1 Decisiones que Habilitan Crecimiento

| Decisión actual | Qué habilita en el futuro |
|----------------|--------------------------|
| Feature-based folder structure | Agregar nuevas secciones sin refactorizar |
| Data layer separado (`lib/data/`) | Cambiar de Firebase a otro backend sin tocar componentes |
| ISR con revalidación | Escalar a millones de páginas (iglesias, recursos) |
| Cloudflare R2 | Sin costos de egress al escalar imágenes |
| Route Groups | Agregar apps completas (intranet, radio admin) al mismo repo |
| TypeScript estricto | Onboarding de nuevos devs sin romper tipos |
| Schema.org desde el día 1 | Compatibilidad con IA/Buscadores futuros |

## 8.2 Roadmap Técnico por Fase

### Fase 2 (3–6 meses post-lanzamiento)
| Feature | Decisión técnica |
|---------|-----------------|
| Mapa interactivo de iglesias | Leaflet.js (Client Component) + datos lat/lng ya en Firestore |
| Archivo de programas Radio TV | Firestore + R2 para archivos de audio |
| Modo oscuro | CSS custom properties ya preparadas en globals.css |
| Búsqueda avanzada | Algolia o Typesense (Firestore no es bueno en full-text search) |
| Intranet / CMS básico | Route Group `(intranet)` ya existe en la estructura |

### Fase 3 (6–12 meses)
| Feature | Decisión técnica |
|---------|-----------------|
| Cursos en línea | Integración con Teachable o plataforma propia (RSC-compatible) |
| i18n (español + idiomas nativos) | `next-intl` — App Router compatible. Estructura de carpetas lista. |
| PWA (app instalable) | `manifest.ts` ya existe. Agregar Service Worker. |
| Push notifications | Firebase Cloud Messaging (FCM) |
| App móvil nativa | React Native + compartir types y lógica de negocio |
| Analytics avanzado | Google Analytics 4 (ya compatible con Firebase) |

## 8.3 Escalado de Firebase

| Límite a vigilar | Cuándo actuar | Solución |
|-----------------|--------------|---------|
| Lecturas Firestore (50k/día free) | Al superar 30k/día | Upgrade a Firebase Blaze |
| Escrituras Firestore | Al superar 20k/día | Upgrade o batch writes |
| Storage de Firebase | Al superar 1GB | Migrar completamente a Cloudflare R2 |
| Auth users | Al superar 50k usuarios intranet | Upgrade (muy improbable para v1.0) |

## 8.4 Multitenancy (Caso de Expansión)

Si en el futuro la IEMB quiere ofrecer el portal a otras iglesias hermanas metodistas en Bolivia o Latinoamérica, la estructura actual permite:

```
iemb.org.bo          → IEMB Bolivia (actual)
ime.iemb.org.bo      → Iglesia Metodista Ecuador
imu.iemb.org.bo      → Iglesia Metodista Uruguay
```

Esto se habilitaría con Cloudflare Workers + Middleware de Next.js para routing por subdominio, sin cambiar la arquitectura de componentes.

---

# IX. STACK TÉCNICO DEFINITIVO

| Capa | Tecnología | Versión | Justificación |
|------|-----------|---------|---------------|
| Framework | **Next.js** | 15.x | App Router, ISR, RSC, Metadata API |
| Lenguaje | **TypeScript** | 5.x | Tipado estricto, mantenibilidad |
| Estilos | **TailwindCSS** | 4.x | Design System como config, utility-first |
| Base de datos | **Firestore** | v10 SDK | NoSQL flexible para contenido editorial |
| Auth | **Firebase Auth** | v10 | Simple, seguro para panel interno |
| Storage | **Firebase Storage** + **R2** | — | Firebase como origen, R2 como CDN |
| Hosting | **Cloudflare Pages** | — | Edge global, sin cold starts, free egress |
| CDN | **Cloudflare CDN** | — | 300+ PoPs, caché inteligente |
| Media CDN | **Cloudflare R2** | — | Sin costos de egress |
| CI/CD | **GitHub Actions** | — | Integración nativa con Pages |
| Iconos | **Lucide React** | latest | Open source, tree-shakeable |
| Fuentes | **Google Fonts** (self-host) | — | Playfair Display + Inter + Lora |
| Formularios | **React Hook Form** + **Zod** | latest | Validación type-safe |
| Animaciones | **Framer Motion** | latest | Animaciones fluidas, respeta `reduced-motion` |
| Utilidades CSS | **clsx** + **tailwind-merge** | latest | Composición segura de clases |

---

# X. CHECKLIST ANTES DE COMENZAR A CODIFICAR

| Item | Estado |
|------|--------|
| Dominio `iemb.org.bo` registrado y apuntando a Cloudflare | ❓ Verificar |
| Proyecto Firebase creado (`iemb-production`) | ❓ Verificar |
| Proyecto Firebase Staging creado (`iemb-staging`) | ❓ Por crear |
| Firebase Admin SDK service account generado | ❓ Por crear |
| Cloudflare R2 bucket creado (`iemb-media`) | ❓ Por crear |
| Repositorio GitHub creado | ❓ Verificar |
| GitHub Secrets configurados (Firebase + Cloudflare tokens) | ❓ Por configurar |
| `iemb.org.bo` verificado en Google Search Console | ❓ Por hacer |
| Design System congelado | ✅ Aprobado |
| Sitemap v1.0 congelado | ✅ Aprobado |
| Home Page arquitectura congelada | ✅ Aprobado |
