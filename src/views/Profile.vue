<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input id="description" type="text" v-model="v$.name.$model" :class="{ invalid: v$.name.$errors.length }"/>
        <label for="description">Имя</label>
        <small class="helper-text invalid" v-if="v$.name.$errors.length"> введите имя </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { required } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
  data: () => ({
    v$: useVuelidate(),
    name: ''
  }),
  validations() {
    return {
      name: { required},
    }
  },
  mounted () {
    this.name = this.info.name
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      } 

      try {
        await this.updateInfo({
          name: this.name
        })
      } catch (e) {}
    }
  },
  computed: {
    ...mapGetters(['info'])
  }
}
</script>