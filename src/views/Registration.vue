<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="v$.email.$model"
          :class="{ invalid: v$.email.$errors.length }"
        />
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) in v$.email.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="v$.password.$model"
          :class="{ invalid: v$.password.$errors.length }"
        />
        <label for="password">Пароль</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) in v$.password.$errors"
          :key="index"
        >
          {{ error.$message }}
        </small>
      </div>
      <div class="input-field">
        <input id="name" type="text" v-model.trim="v$.name.$model" :class="{ invalid: v$.name.$errors.length }" />
        <label for="name">Имя</label>
        <small class="helper-text invalid" v-for="(error, index) in v$.name.$errors" :key="index"> {{ error.$message }} </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { email, required, minLength } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  name: "registration",
  data: () => ({
    v$: useVuelidate(),
    email: "",
    password: "",
    name: "",
    agree: false,
  }),
  validations() {
    return {
      email: { email, required },
      password: { required, minLength: minLength(6) },
      name: { required },
      agree: { checkd: (v) => v },
    };
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch();
        return;
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    },
  },
};
</script>