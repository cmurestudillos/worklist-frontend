# worklist-frontend

SPA instalable (PWA) para gestionar listas de tareas de proyectos de desarrollo. Permite crear, editar, eliminar y clasificar tareas por categoría, prioridad y tiempo estimado.

## Stack

- **Framework:** Vue 3 (Options API)
- **Estado:** Vuex 4
- **Routing:** Vue Router 4
- **Validación:** Vuelidate 2
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
- **CDN:** Bootstrap, Font Awesome y jQuery se cachean con `CacheFirst` para que la interfaz se vea correctamente sin conexión.
- **API:** las llamadas al backend **nunca** se cachean; las tareas siempre se piden al servidor.
- **Actualizaciones:** modo `prompt`. Cuando hay una versión nueva, `PwaToast.vue` muestra un aviso con un botón *Actualizar* en lugar de recargar sin avisar.
- **Iconos:** en `public/assets/` (`pwa-64x64`, `pwa-192x192`, `pwa-512x512`, `maskable-icon-512x512`, `apple-touch-icon-180x180`). Se regeneran desde `logo.png` con `pnpm generate-pwa-assets` (config en `pwa-assets.config.js`).

### Notas

- El service worker solo se registra en el build de producción (`pnpm build` + `pnpm preview`), no en `pnpm dev`. Para probarlo en desarrollo hay que poner `devOptions.enabled: true` en `vite.config.js`.
- Sin conexión se carga la aplicación y se mantiene la sesión (localStorage), pero **las tareas necesitan red** porque viven en el backend. Para uso offline real habría que cachear los `GET /api/tareas` y encolar las escrituras.
- La instalación requiere HTTPS (o `localhost`): al desplegar el frontend, el dominio debe servirse por HTTPS para que el navegador ofrezca instalar la app.
- `workbox-window` está declarado como devDependency explícita: con pnpm no basta con la dependencia transitiva de `vite-plugin-pwa` y el build falla al resolverla.

## Estructura

```
src/
├── main.js                     # Entry point
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
        └── PwaToast.vue        # Aviso de nueva versión / modo offline
```

## Rutas

| Ruta | Vista | Auth |
|------|-------|------|
| `/` | Home | ✅ Requerida |
| `/editar/:id` | Editar | ✅ Requerida |
| `/ingreso` | Login | — |
| `/registro` | Registro | — |
