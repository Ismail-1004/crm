<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input id="email" type="text" v-model.trim="v$.email.$model" :class="{ invalid: v$.email.$errors.length }"/>
        <label for="email">Email</label>
        <small class="helper-text invalid" v-for="(error, index) in v$.email.$errors" :key="index"> {{ error.$message }} </small>
      </div>
      <div class="input-field">
        <input id="password" type="password" v-model.trim="v$.password.$model" />
        <label for="password">Пароль</label>
        <small class="helper-text invalid" v-for="(error, index) in v$.password.$errors" :key="index"> {{ error.$message }} </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/registration">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import messages from '@/utils/message'

export default {
  name: "Login",
  data: () => ({
    v$: useVuelidate(),
    email: '',
    password: ''
  }),
  validations() {
    return {
      email: {email, required},
      password: {required, minLength: minLength(6)}
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      } 

      const formData = {
        email: this.email,
        password: this.password
      }

      try {
        await this.$store.dispatch('login', formData)  
        this.$router.push('/')    
      } catch (e) {}
    }
  },
}
</script>