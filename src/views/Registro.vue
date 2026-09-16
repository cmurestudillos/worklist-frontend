<template>
  <div class="centered-view">
    <div class="auth-card">
      <div class="auth-brand">
        <img src="/assets/logo.png" width="56" height="56" alt="" class="auth-logo" />
        <div>
          <h1>Crear cuenta</h1>
          <p class="text-muted text-sm">Empieza a organizar tus tareas</p>
        </div>
      </div>

      <section class="card">
        <header class="card-header">
          <h2 class="card-title">Registro</h2>
        </header>

        <form
          class="card-body stack"
          @submit.prevent="registrarUsuario({ email: $v.email.$model, password: $v.pass1.$model })"
        >
          <div class="field">
            <label class="field-label" for="registro-email">Email</label>
            <input
              id="registro-email"
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
            <label class="field-label" for="registro-password">Contraseña</label>
            <input
              id="registro-password"
              type="password"
              class="input"
              :class="{ 'input-invalid': $v.pass1.$error }"
              placeholder="Mínimo 6 caracteres"
              autocomplete="new-password"
              v-model="$v.pass1.$model"
            />
            <p class="field-error" v-for="(error, index) of $v.pass1.$errors" :key="index">
              <span v-if="error.$message === 'Value is required'">Campo requerido</span>
              <span v-if="error.$message === 'This field should be at least 6 long'">
                La contraseña debe tener al menos 6 caracteres.
              </span>
            </p>
          </div>

          <div class="field">
            <label class="field-label" for="registro-password-2">Repetir contraseña</label>
            <input
              id="registro-password-2"
              type="password"
              class="input"
              :class="{ 'input-invalid': $v.pass2.$error }"
              placeholder="••••••••"
              autocomplete="new-password"
              v-model="$v.pass2.$model"
            />
            <p class="field-error" v-for="(error, index) of $v.pass2.$errors" :key="index">
              <span v-if="error.$message === 'The value must be equal to the other value'">
                Las contraseñas deben ser iguales.
              </span>
            </p>
          </div>

          <p v-if="error" class="alert alert-danger">
            <Icon name="alert" :size="16" />
            <span>{{ error }}</span>
          </p>

          <button class="btn btn-primary btn-block" :disabled="$v.$invalid">Registrar</button>

          <p class="auth-footer">
            ¿Ya tienes cuenta?
            <router-link to="/ingreso">Inicia sesión</router-link>
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
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
      pass2: ''
    }
  },
  computed: {
    ...mapState(['error'])
  },
  methods: {
    ...mapActions(['registrarUsuario'])
  },
  validations() {
    return {
      email: { required, email },
      pass1: { required, minLength: minLength(6) },
      pass2: { sameAs: sameAs(this.pass1) }
    }
  }
}
</script>
