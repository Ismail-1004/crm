import firebase from "firebase/compat/app"

export default {
  state: {},
  mutatios: {},
  actions: {
    async login({ dispatch, commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async register ({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email,password)
        const uid = await dispatch('getUId')
        await firebase.database().ref(`/users/${uid}/info`).set({
          bill: 10000,
          name
        })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    getUId () {
      const user = firebase.auth().currentUser
      return user ? user.uid : null 
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearInfo')
    }
  },
  getters: {}
}