<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="v$.title.$model"
            :class="{ invalid: v$.title.$errors.length }"
          />
          <label for="name">Название</label>
          <span
            v-for="(error, index) in v$.title.$errors"
            :key="index"
            class="helper-text invalid"
          >
            {{ error.$message }}
          </span>
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="v$.limit.$model"
            :class="{ invalid: v$.limit.$errors.length }"
          />
          <label for="limit">Лимит</label>
          <span
            v-for="(error, index) in v$.limit.$errors"
            :key="index"
            class="helper-text invalid"
          >
            {{ error.$message }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  data: () => ({
    v$: useVuelidate(),
    title: "",
    limit: 10000,
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(10000) },
  },
  mounted () {
    M.updateTextFields()
  },
  methods: {
    async submitHandler() {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        })
        this.title = ''
        this.limit = 10000
        this.v$.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {}

      
    }
  }
};
</script>