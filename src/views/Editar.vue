<template>
  <div class="row">
    <div class="col-sm-4">
      <form @submit.prevent="submitUpdate">
        <TareaForm v-model:tarea="localTarea" :isEditar="true" />
      </form>
    </div>
    <div class="col-sm-8">
      <ListaTareas />
    </div>
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
