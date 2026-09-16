<template>
  <div class="workspace">
    <form @submit.prevent="submitUpdate">
      <TareaForm :key="localTarea.id" v-model:tarea="localTarea" :isEditar="true" />
    </form>
    <ListaTareas />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TareaForm from '../components/Input.vue'
import ListaTareas from '../components/ListaTareas.vue'

export default {
  components: { TareaForm, ListaTareas },
  data() {
    return {
      localTarea: { id: '', nombre: '', categorias: [], estado: '', numero: 0 }
    }
  },
  computed: {
    ...mapState(['tarea'])
  },
  watch: {
    tarea(val) {
      if (val) {
        this.localTarea = { ...val, categorias: [...val.categorias] }
      }
    }
  },
  methods: {
    ...mapActions(['setTarea', 'updateTarea']),
    submitUpdate() {
      this.updateTarea(this.localTarea)
    }
  },
  created() {
    this.setTarea(this.$route.params.id)
  }
}
</script>
