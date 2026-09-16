# worklist-frontend

SPA instalable (PWA) para gestionar listas de tareas de proyectos de desarrollo. Permite crear, editar, eliminar y clasificar tareas por categoría, prioridad y tiempo estimado.

## Stack

- **Framework:** Vue 3 (Options API)
- **Estado:** Vuex 4
- **Routing:** Vue Router 4
- **Validación:** Vuelidate 2
- **UI:** design system propio (CSS con custom properties, sin framework)
- **Build tool:** Vite 6
- **PWA:** vite-plugin-pwa 1 (Workbox)
- **Linting:** ESLint 9 flat config + eslint-plugin-vue 9
- **Formato:** Prettier 3
- **Gestor de paquetes:** pnpm ≥ 9

## Requisitos previos

- Node.js ≥ 20
- pnpm ≥ 9
- [`worklist-backend`](../worklist-backend) corriendo en local — documentación de la API en http://localhost:3000/api-docs

## Instalación

```bash
cd worklist-frontend
pnpm install
```

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `VITE_API_URL` | URL base de la API del backend | `http://localhost:3000/api` |

## Scripts

```bash
pnpm dev        # Servidor de desarrollo con HMR (puerto 5173)
pnpm build      # Build de producción → dist/
pnpm preview    # Preview del build local
pnpm lint       # Análisis de código
pnpm lint:fix   # Corrección automática

pnpm generate-pwa-assets   # Regenera los iconos de la PWA desde public/assets/logo.png
```

## PWA

La aplicación es instalable y funciona sin conexión.

- **Manifest:** generado por `vite-plugin-pwa` en `/manifest.webmanifest` (configurado en `vite.config.js`).
- **Service worker:** estrategia `generateSW` de Workbox. Precachea el shell de la aplicación (HTML, JS, CSS e iconos) y sirve `index.html` como fallback de navegación para que las rutas del SPA funcionen offline.
- **API:** las llamadas al backend **nunca** se cachean; las tareas siempre se piden al servidor.
- **Terceros:** ninguno. La aplicación no carga CSS ni JS externo, así que no hace falta `runtimeCaching`: todo lo que necesita está precacheado.
- **Actualizaciones:** modo `prompt`. Cuando hay una versión nueva, `PwaToast.vue` muestra un aviso con un botón *Actualizar* en lugar de recargar sin avisar.
- **Iconos:** en `public/assets/` (`pwa-64x64`, `pwa-192x192`, `pwa-512x512`, `maskable-icon-512x512`, `apple-touch-icon-180x180`). Se regeneran desde `logo.png` con `pnpm generate-pwa-assets` (config en `pwa-assets.config.js`).

### Notas

- El service worker solo se registra en el build de producción (`pnpm build` + `pnpm preview`), no en `pnpm dev`. Para probarlo en desarrollo hay que poner `devOptions.enabled: true` en `vite.config.js`.
- Sin conexión se carga la aplicación y se mantiene la sesión (localStorage), pero **las tareas necesitan red** porque viven en el backend. Para uso offline real habría que cachear los `GET /api/tareas` y encolar las escrituras.
- La instalación requiere HTTPS (o `localhost`): al desplegar el frontend, el dominio debe servirse por HTTPS para que el navegador ofrezca instalar la app.
- `workbox-window` está declarado como devDependency explícita: con pnpm no basta con la dependencia transitiva de `vite-plugin-pwa` y el build falla al resolverla.

## Design system

La interfaz no usa ningún framework CSS. Todo el estilo vive en `src/assets/styles/`, se importa una sola vez desde `main.js` y Vite lo empaqueta con hash.

```
src/assets/styles/
├── index.css        # Punto de entrada — importa los tres siguientes
├── tokens.css       # Custom properties: color, tipografía, espaciado, radios, sombras, motion
├── base.css         # Reset, tipografía base, layout (.app-shell, .app-main, .workspace) y utilidades
└── components.css   # Navegación, tarjetas, botones, formularios, lista de tareas, feedback, overlays
```

**Regla principal:** ningún componente escribe un valor literal que exista como token. Los colores, tamaños y espacios se toman siempre de `var(--…)`, así que cambiar la paleta es editar `tokens.css` y nada más.

### Tokens

| Grupo | Ejemplos |
|-------|----------|
| Superficies | `--color-bg`, `--color-surface-1/2/3` |
| Texto | `--color-text`, `--color-text-muted`, `--color-text-subtle` |
| Marca | `--color-accent` (#f0b429), `--color-accent-hover`, `--color-accent-soft` |
| Semántico | `--color-danger`, `--color-success`, `--color-info` |
| Prioridades | `--color-priority-urgente / -media / -relax` |
| Espaciado | `--space-1` … `--space-12` (escala de 4px) |
| Tipografía | `--text-xs` … `--text-2xl`, `--weight-*`, `--leading-*` |
| Forma | `--radius-sm/md/lg/full`, `--shadow-sm/md/lg` |
| Movimiento | `--duration-fast/base`, `--ease` |

### Componentes

| Clase | Qué es |
|-------|--------|
| `.card` + `.card-header` / `.card-body` / `.card-footer` | Superficie base de todas las secciones |
| `.btn` + `.btn-primary` / `-secondary` / `-ghost` / `-danger`, `.btn-sm`, `.btn-block` | Jerarquía de acciones |
| `.field` + `.field-label` / `.input` / `.field-error` | Campos de formulario |
| `.chip` + `.chip-input` / `.chip-label` | Checkbox de categoría con aspecto de chip |
| `.segmented` + `.segment-input` / `.segment-label` | Radio de prioridad como control segmentado |
| `.task-list` / `.task-item` / `.tag` / `.badge-*` | Lista de tareas |
| `.empty-state` | Lista vacía |
| `.alert` / `.toast` | Feedback y avisos |

Los patrones de chip y segmented se apoyan en `input:checked + label`: el input real queda oculto pero sigue siendo el que recibe el foco y el teclado, así que la accesibilidad se mantiene.

### Iconos

`src/components/shared/Icon.vue` sustituye a Font Awesome. Son trazos SVG de 24×24 definidos en un mapa dentro del propio componente; heredan `currentColor` y el grosor:

```vue
<Icon name="clock" :size="14" />
```

Para añadir uno nuevo basta con meter su `d` en el objeto `ICONS`.

## Estructura

```
src/
├── main.js                     # Entry point — importa el design system
├── assets/
│   └── styles/                 # Design system (tokens, base, componentes)
├── App.vue                     # Root — carga sesión al iniciar
├── store/
│   └── index.js                # Vuex — toda la lógica de llamadas a la API
├── router/
│   └── index.js                # Rutas con guard de autenticación
├── views/
│   ├── Home.vue                # Formulario + lista de tareas
│   ├── Editar.vue              # Editar tarea existente
│   ├── Ingreso.vue             # Login
│   └── Registro.vue            # Registro de cuenta
└── components/
    ├── Input.vue               # Formulario de tarea (reutilizable)
    ├── ListaTareas.vue         # Tabla de tareas
    └── shared/
        ├── Navbar.vue          # Barra de navegación
        ├── Icon.vue            # Iconos SVG inline
        └── PwaToast.vue        # Aviso de nueva versión / modo offline
```

## Rutas

| Ruta | Vista | Auth |
|------|-------|------|
| `/` | Home | ✅ Requerida |
| `/editar/:id` | Editar | ✅ Requerida |
| `/ingreso` | Login | — |
| `/registro` | Registro | — |
