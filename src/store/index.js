import { createStore } from 'vuex'
import router from '../router'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// El guard del router lee el store de forma síncrona, antes de que
// `cargarLocalStorage` termine. Sin esto, recargar una ruta protegida
// rebota siempre a /ingreso aunque haya sesión guardada.
function usuarioGuardado() {
  try {
    const stored = localStorage.getItem('usuario')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`
  }
}

export default createStore({
  state: {
    tareas: [],
    tarea: {
      id: '',
      nombre: '',
      categorias: [],
      estado: '',
      numero: 0
    },
    user: usuarioGuardado(),
    error: null
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    cargar(state, payload) {
      state.tareas = payload
    },
    set(state, payload) {
      state.tareas.push(payload)
    },
    eliminar(state, payload) {
      state.tareas = state.tareas.filter((item) => item.id !== payload)
    },
    tarea(state, payload) {
      if (!state.tareas.find((item) => item.id === payload)) {
        router.push('/')
        return
      }
      state.tarea = state.tareas.find((item) => item.id === payload)
    },
    update(state, payload) {
      state.tareas = state.tareas.map((item) => (item.id === payload.id ? payload : item))
      router.push('/')
    }
  },
  actions: {
    cerrarSesion({ commit }) {
      commit('setUser', null)
      commit('cargar', [])
      router.push('/ingreso')
      localStorage.removeItem('usuario')
    },

    async ingresoUsuario({ commit }, usuario) {
      commit('setError', null)
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: usuario.email, password: usuario.password })
        })
        const data = await res.json()
        if (!res.ok) {
          commit('setError', data.error || 'Error al iniciar sesión')
          return
        }
        commit('setUser', data)
        localStorage.setItem('usuario', JSON.stringify(data))
        router.push('/')
      } catch {
        commit('setError', 'Error de conexión con el servidor')
      }
    },

    async registrarUsuario({ commit }, usuario) {
      commit('setError', null)
      try {
        const res = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: usuario.email, password: usuario.password })
        })
        const data = await res.json()
        if (!res.ok) {
          commit('setError', data.error || 'Error al registrarse')
          return
        }
        commit('setUser', data)
        localStorage.setItem('usuario', JSON.stringify(data))
        router.push('/')
      } catch {
        commit('setError', 'Error de conexión con el servidor')
      }
    },

    async cargarLocalStorage({ commit }) {
      const stored = localStorage.getItem('usuario')
      if (!stored) {
        commit('setUser', null)
        return
      }
      const user = JSON.parse(stored)
      commit('setUser', user)
      try {
        const res = await fetch(`${API_URL}/tareas`, {
          headers: authHeaders(user.token)
        })
        if (!res.ok) {
          if (res.status === 401) {
            commit('setUser', null)
            localStorage.removeItem('usuario')
            router.push('/ingreso')
          }
          return
        }
        const tareas = await res.json()
        commit('cargar', tareas)
      } catch {
        console.error('Error al cargar tareas')
      }
    },

    async setTareas({ commit, state }, tarea) {
      try {
        const res = await fetch(`${API_URL}/tareas`, {
          method: 'POST',
          headers: authHeaders(state.user.token),
          body: JSON.stringify(tarea)
        })
        if (!res.ok) {
          const data = await res.json()
          console.error(data.error)
          return
        }
        commit('set', tarea)
      } catch {
        console.error('Error al crear tarea')
      }
    },

    async deleteTareas({ commit, state }, id) {
      try {
        const res = await fetch(`${API_URL}/tareas/${id}`, {
          method: 'DELETE',
          headers: authHeaders(state.user.token)
        })
        if (!res.ok) return
        commit('eliminar', id)
      } catch {
        console.error('Error al eliminar tarea')
      }
    },

    setTarea({ commit }, id) {
      commit('tarea', id)
    },

    async updateTarea({ commit, state }, tarea) {
      try {
        const res = await fetch(`${API_URL}/tareas/${tarea.id}`, {
          method: 'PATCH',
          headers: authHeaders(state.user.token),
          body: JSON.stringify(tarea)
        })
        if (!res.ok) {
          const data = await res.json()
          console.error(data.error)
          return
        }
        const dataDB = await res.json()
        commit('update', dataDB)
      } catch {
        console.error('Error al actualizar tarea')
      }
    }
  },
  getters: {
    usuarioAutenticado(state) {
      return !!state.user
    },
    datosUsuario(state) {
      return state.user?.email ?? ''
    }
  },
  modules: {}
})
