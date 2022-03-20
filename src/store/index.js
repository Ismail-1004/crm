import { createStore } from 'vuex'
import side from './modules/side'
import auth from './modules/auth'
import info from './modules/info'
import category from './modules/category'
import record from './modules/record'

export default createStore({
  state: {
    error: null
  },
  mutations: {
    setError (state,error) {
      return state.error = error
    },
    clearError (state) {
      state.error = null
    }
  },
  actions: {
    async fetchCurrency () {
      const key = process.env.VUE_APP_FIXER
      const res = await fetch(`http://data.fixer.io/api/latest?access_key=${key}&symbols=USD,EUR,UZS`)
      return await res.json()
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    side,
    auth,
    info,
    category,
    record
  }
})
