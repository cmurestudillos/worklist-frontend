<template>
  <div class="toast" role="status" v-if="offlineReady || needRefresh">
    <span class="toast-message">
      <span v-if="offlineReady">La aplicación ya funciona sin conexión.</span>
      <span v-else>Hay una nueva versión disponible.</span>
    </span>
    <span class="toast-actions">
      <button
        class="btn btn-primary btn-sm"
        type="button"
        v-if="needRefresh"
        @click="updateServiceWorker(true)"
      >
        <Icon name="refresh" :size="14" />
        <span>Actualizar</span>
      </button>
      <button class="btn btn-ghost btn-sm" type="button" aria-label="Cerrar aviso" @click="cerrar">
        <Icon name="close" :size="14" />
      </button>
    </span>
  </div>
</template>

<script>
import { useRegisterSW } from 'virtual:pwa-register/vue'
import Icon from './Icon.vue'

export default {
  components: {
    Icon
  },
  setup() {
    const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()

    const cerrar = () => {
      offlineReady.value = false
      needRefresh.value = false
    }

    return { offlineReady, needRefresh, updateServiceWorker, cerrar }
  }
}
</script>
