<template>
  <header class="app-nav">
    <div class="app-nav-inner">
      <router-link :to="usuarioAutenticado ? '/' : '/ingreso'" class="brand">
        <img src="/assets/logo.png" width="32" height="32" alt="" class="brand-logo" />
        <span class="brand-name">Work List</span>
      </router-link>

      <div class="nav-user" v-if="usuarioAutenticado">
        <span class="user-chip" :title="datosUsuario">
          <Icon name="user" :size="14" />
          <span class="user-chip-email">{{ datosUsuario }}</span>
        </span>
        <button class="btn btn-ghost btn-sm" type="button" @click="cerrarSesion">
          <Icon name="logout" :size="14" />
          <span>Salir</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
// Propiedades de VUEX
import { mapActions, mapGetters } from 'vuex'
import Icon from './Icon.vue'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapGetters(['usuarioAutenticado', 'datosUsuario'])
  },
  methods: {
    ...mapActions(['cerrarSesion'])
  }
}
</script>
