<template>
  <div class="workspace">
    <form @submit.prevent="procesarFormulario">
      <TareaForm v-model:tarea="tarea" :isEditar="false" />
    </form>
    <ListaTareas />
  </div>
</template>

<script>
import TareaForm from '../components/Input.vue'
import ListaTareas from '../components/ListaTareas.vue'
import { mapActions } from 'vuex'
import { nanoid } from 'nanoid'

export default {
  name: 'HomeView',
  components: {
    TareaForm,
    ListaTareas
  },
  data() {
    return {
      tarea: {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  },
  methods: {
    ...mapActions(['setTareas']),
    procesarFormulario() {
      if (this.tarea.nombre.trim() === '') return
      this.tarea.id = nanoid()
      this.setTareas(this.tarea)
      this.tarea = {
        id: '',
        nombre: '',
        categorias: [],
        estado: '',
        numero: 0
      }
    }
  }
}
</script>
