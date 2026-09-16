<template>
  <section class="card">
    <header class="card-header">
      <h2 class="card-title">
        <Icon name="list" :size="18" />
        <span>Lista de tareas</span>
        <span class="count-pill">{{ tareas.length }}</span>
      </h2>
      <span class="text-muted text-sm" v-if="horasTotales > 0">{{ horasTotales }} h estimadas</span>
    </header>

    <div class="card-body card-body-flush">
      <ul class="task-list" v-if="tareas.length">
        <li class="task-item" v-for="item in tareas" :key="item.id">
          <div class="task-main">
            <span class="task-name">{{ item.nombre }}</span>
            <div class="task-meta">
              <span class="badge" :class="`badge-${item.estado}`" v-if="item.estado">
                <span class="dot"></span>
                {{ item.estado }}
              </span>
              <span class="tag" v-for="(cat, index) in item.categorias" :key="index">{{
                cat
              }}</span>
              <span class="meta-time" v-if="item.numero">
                <Icon name="clock" :size="12" />
                {{ item.numero }} h
              </span>
            </div>
          </div>

          <div class="task-actions">
            <router-link
              class="btn btn-ghost btn-sm"
              :to="{ name: 'Editar', params: { id: item.id } }"
            >
              <Icon name="edit" :size="14" />
              <span>Editar</span>
            </router-link>
            <button
              class="btn btn-danger btn-sm"
              type="button"
              :title="`Eliminar ${item.nombre}`"
              @click="deleteTareas(item.id)"
            >
              <Icon name="trash" :size="14" />
              <span>Eliminar</span>
            </button>
          </div>
        </li>
      </ul>

      <div class="empty-state" v-else>
        <span class="empty-state-icon">
          <Icon name="clipboard" :size="24" />
        </span>
        <p class="empty-state-title">Todavía no hay tareas</p>
        <p class="text-sm">Crea la primera desde el formulario y aparecerá aquí.</p>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Icon from './shared/Icon.vue'

export default {
  components: {
    Icon
  },
  computed: {
    ...mapState(['tareas']),
    horasTotales() {
      return this.tareas.reduce((total, item) => total + (Number(item.numero) || 0), 0)
    }
  },
  methods: {
    ...mapActions(['deleteTareas'])
  }
}
</script>
