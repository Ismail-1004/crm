export default {
  state: {
    isOpen: true
  },
  mutations: {
    toggle (state) {
      return state.isOpen = !state.isOpen
    }
  },
  getters: {
    isOpen (state) {
      return state.isOpen
    }
  }
}