<template>
  <Navbar />
  <div class="container">
    <router-view />
  </div>
  <PwaToast />
</template>

<script>
import { mapActions } from 'vuex'
// componentes
import Navbar from './components/shared/Navbar.vue'
import PwaToast from './components/shared/PwaToast.vue'

export default {
  components: {
    Navbar,
    PwaToast
  },
  methods: {
    ...mapActions(['cargarLocalStorage'])
  },
  created() {
    this.cargarLocalStorage()
  }
}
</script>
