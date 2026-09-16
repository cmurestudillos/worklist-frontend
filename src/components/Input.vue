<template>
  <section class="card">
    <header class="card-header">
      <div>
        <h2 class="card-title">
          <Icon :name="isEditar ? 'edit' : 'plus'" :size="18" />
          <span>{{ isEditar ? 'Editar tarea' : 'Nueva tarea' }}</span>
        </h2>
        <p class="card-subtitle" v-if="isEditar">{{ local.nombre }}</p>
        <p class="card-subtitle" v-else>Describe la tarea y clasifícala</p>
      </div>
    </header>

    <div class="card-body stack">
      <div class="field">
        <label class="field-label" for="tarea-nombre">Tarea</label>
        <input
          id="tarea-nombre"
          type="text"
          class="input"
          placeholder="Ej: Desplegar en Netlify…"
          autocomplete="off"
          v-model.trim="local.nombre"
        />
      </div>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Grupo</legend>
        <div class="chip-group">
          <span class="chip" v-for="categoria in categorias" :key="categoria.value">
            <input
              type="checkbox"
              class="chip-input"
              :id="`cat-${categoria.id}`"
              :value="categoria.value"
              v-model="local.categorias"
            />
            <label class="chip-label" :for="`cat-${categoria.id}`">{{ categoria.label }}</label>
          </span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Prioridad</legend>
        <div class="segmented">
          <span class="segment" v-for="prioridad in prioridades" :key="prioridad.value">
            <input
              type="radio"
              class="segment-input"
              :id="`estado-${prioridad.value}`"
              :value="prioridad.value"
              v-model="local.estado"
            />
            <label class="segment-label" :for="`estado-${prioridad.value}`">
              <span class="dot" :class="`dot-${prioridad.value}`"></span>
              <span>{{ prioridad.label }}</span>
            </label>
          </span>
        </div>
      </fieldset>

      <fieldset class="fieldset">
        <legend class="fieldset-legend">Tiempo estimado</legend>
        <div class="input-inline">
          <input
            id="tarea-horas"
            type="number"
            class="input input-number"
            min="0"
            step="1"
            v-model.number="local.numero"
          />
          <label class="field-label" for="tarea-horas">horas</label>
        </div>
      </fieldset>
    </div>

    <footer class="card-footer">
      <button class="btn btn-primary btn-block" type="submit" :disabled="bloquear">
        <Icon :name="isEditar ? 'check' : 'plus'" :size="16" />
        <span>{{ isEditar ? 'Guardar cambios' : 'Añadir tarea' }}</span>
      </button>
      <router-link to="/" class="btn btn-secondary" v-if="isEditar">Cancelar</router-link>
    </footer>
  </section>
</template>

<script>
import { ref, watch, computed } from 'vue'
import Icon from './shared/Icon.vue'

// Los `value` deben coincidir con los que acepta la API (ver README del backend).
const CATEGORIAS = [
  { value: 'scaffolding', label: 'Scaffolding' },
  { value: 'dependencias', label: 'Dependencias' },
  { value: 'servicios', label: 'Servicios' },
  { value: 'bb dd', label: 'BB.DD' },
  { value: 'maquetacion', label: 'Maquetación' },
  { value: 'responsive', label: 'Responsive' },
  { value: 'testing', label: 'Testing' },
  { value: 'documentacion', label: 'Documentación' },
  { value: 'deploy', label: 'Deploy' },
  { value: 'hosting', label: 'Hosting' }
]

const PRIORIDADES = [
  { value: 'urgente', label: 'Urgente' },
  { value: 'media', label: 'Media' },
  { value: 'relax', label: 'Relax' }
]

export default {
  name: 'TareaForm',
  components: {
    Icon
  },
  props: {
    tarea: Object,
    isEditar: Boolean
  },
  emits: ['update:tarea'],
  setup(props, { emit }) {
    const copy = (t) => ({ ...t, categorias: [...(t?.categorias || [])] })

    const local = ref(copy(props.tarea))

    watch(
      () => props.tarea,
      (val) => {
        local.value = copy(val)
      },
      { deep: true }
    )

    watch(
      local,
      (val) => {
        if (JSON.stringify(val) !== JSON.stringify(props.tarea)) {
          emit('update:tarea', copy(val))
        }
      },
      { deep: true }
    )

    const bloquear = computed(() => !local.value.nombre?.trim())

    // 'bb dd' lleva espacio: no vale como sufijo de id en el DOM.
    const categorias = CATEGORIAS.map((c) => ({ ...c, id: c.value.replace(/\s+/g, '-') }))

    return { local, bloquear, categorias, prioridades: PRIORIDADES }
  }
}
</script>
