# worklist-frontend

SPA para gestionar listas de tareas de proyectos de desarrollo. Permite crear, editar, eliminar y clasificar tareas por categoría, prioridad y tiempo estimado.

## Stack

- **Framework:** Vue 3 (Options API)
- **Estado:** Vuex 4
- **Routing:** Vue Router 4
- **Validación:** Vuelidate 2
- **Build tool:** Vite 6
- **Linting:** ESLint 9 flat config + eslint-plugin-vue 9
- **Formato:** Prettier 3
- **Gestor de paquetes:** pnpm ≥ 9

## Requisitos previos

- Node.js ≥ 20
- pnpm ≥ 9
- [`worklist-backend`](../worklist-backend) corriendo en local

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
```

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
        └── Navbar.vue          # Barra de navegación
```

## Rutas

| Ruta | Vista | Auth |
|------|-------|------|
| `/` | Home | ✅ Requerida |
| `/editar/:id` | Editar | ✅ Requerida |
| `/ingreso` | Login | — |
| `/registro` | Registro | — |
