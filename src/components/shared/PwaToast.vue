<template>
  <div class="pwa-toast" role="alert" v-if="offlineReady || needRefresh">
    <div class="pwa-toast-message">
      <span v-if="offlineReady"> La aplicaci&oacute;n ya funciona sin conexi&oacute;n. </span>
      <span v-else> Hay una nueva versi&oacute;n disponible. </span>
    </div>
    <button class="form-button button-l" v-if="needRefresh" @click="updateServiceWorker(true)">
      Actualizar
    </button>
    <button class="form-button button-l ml-2" @click="cerrar">Cerrar</button>
  </div>
</template>

<script>
import { useRegisterSW } from 'virtual:pwa-register/vue'

export default {
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
