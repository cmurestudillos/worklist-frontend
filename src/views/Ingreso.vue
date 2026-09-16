<template>
  <div class="centered-view">
    <div class="auth-card">
      <div class="auth-brand">
        <img src="/assets/logo.png" width="56" height="56" alt="" class="auth-logo" />
        <div>
          <h1>Work List</h1>
          <p class="text-muted text-sm">Organiza las tareas de tus proyectos</p>
        </div>
      </div>

      <section class="card">
        <header class="card-header">
          <h2 class="card-title">Iniciar sesión</h2>
        </header>

        <form
          class="card-body stack"
          @submit.prevent="ingresoUsuario({ email: $v.email.$model, password: $v.pass1.$model })"
        >
          <div class="field">
            <label class="field-label" for="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              class="input"
              :class="{ 'input-invalid': $v.email.$error }"
              placeholder="tu@email.com"
              autocomplete="email"
              v-model="$v.email.$model"
            />
            <p class="field-error" v-for="(error, index) of $v.email.$errors" :key="index">
              <span v-if="error.$message === 'Value is required'">Campo requerido</span>
              <span v-if="error.$message === 'Value is not a valid email address'">
                Dirección de correo electrónico no válida.
              </span>
            </p>
          </div>

          <div class="field">
            <label class="field-label" for="login-password">Contraseña</label>
            <input
              id="login-password"
              type="password"
              class="input"
              :class="{ 'input-invalid': $v.pass1.$error }"
              placeholder="••••••••"
              autocomplete="current-password"
              v-model="$v.pass1.$model"
            />
            <p class="field-error" v-for="(error, index) of $v.pass1.$errors" :key="index">
              <span v-if="error.$message === 'Value is required'">Campo requerido</span>
              <span v-if="error.$message === 'This field should be at least 6 long'">
                La contraseña debe tener al menos 6 caracteres.
              </span>
            </p>
          </div>

          <p v-if="error" class="alert alert-danger">
            <Icon name="alert" :size="16" />
            <span>{{ error }}</span>
          </p>

          <button class="btn btn-primary btn-block" :disabled="$v.$invalid">Ingresar</button>

          <p class="auth-footer">
            ¿Aún no tienes cuenta?
            <router-link to="/registro">Regístrate</router-link>
          </p>
        </form>
      </section>

      <p class="app-footer">Diseñada y creada por Carlos Mur · v{{ version }}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import packageInfo from '../../package.json'
import Icon from '../components/shared/Icon.vue'

export default {
  components: {
    Icon
  },
  setup() {
    return { $v: useVuelidate() }
  },
  data() {
    return {
      email: '',
      pass1: '',
      version: packageInfo.version
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['ingresoUsuario'])
  },
  validations() {
    return {
      email: { required, email },
      pass1: { required, minLength: minLength(6) }
    }
  }
}
</script>
