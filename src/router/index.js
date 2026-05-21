import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { rutaProtegida: true }
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue'),
    meta: { rutaProtegida: true }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: () => import('../views/Registro.vue')
  },
  {
    path: '/ingreso',
    name: 'Ingreso',
    component: () => import('../views/Ingreso.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, _from, next) => {
  if (to.meta.rutaProtegida) {
    store.getters.usuarioAutenticado ? next() : next('/ingreso')
  } else {
    next()
  }
})

export default router
