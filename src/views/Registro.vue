<template>
  <div class="login-container text-c animated flipInX">
    <h3 class="text-whitesmoke">Registro de Usuarios</h3>
    <div class="container-content">
      <form
        class="margin-t"
        @submit.prevent="registrarUsuario({ email: $v.email.$model, password: $v.pass1.$model })"
      >
        <div class="form-group">
          <input type="email" class="form-control" placeholder="Email" v-model="$v.email.$model" />
          <p class="alert alert-danger" v-for="(error, index) of $v.email.$errors" :key="index">
            <span v-if="error.$message === 'Value is required'">Campo requerido</span>
            <span v-if="error.$message === 'Value is not a valid email address'"
              >Dirección de correo electrónico no válida.</span
            >
          </p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Contraseña"
            v-model="$v.pass1.$model"
          />
          <p class="alert alert-danger" v-for="(error, index) of $v.pass1.$errors" :key="index">
            <span v-if="error.$message === 'Value is required'">Campo requerido</span>
            <span v-if="error.$message === 'This field should be at least 6 long'"
              >Password debe tener al menos un mínimo de 6 caracteres.</span
            >
          </p>
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            placeholder="Repetir contraseña"
            v-model="$v.pass2.$model"
          />
          <p class="alert alert-danger" v-for="(error, index) of $v.pass2.$errors" :key="index">
            <span v-if="error.$message === 'The value must be equal to the other value'"
              >Las contraseñas deben ser iguales.</span
            >
          </p>
        </div>
        <p v-if="error" class="alert alert-danger">{{ error }}</p>
        <button class="form-button button-l margin-b" :disabled="$v.$invalid">Registrar</button>
        <router-link to="/ingreso" class="text-darkyellow">
          <small>Ingresar</small>
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

export default {
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
