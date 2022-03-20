import firebase from "firebase/compat/app"

export default {
    actions: {
        async createRecord ({ dispatch, commit }, record) {
            try {
                const uId = await dispatch('getUId')
                return await firebase.database().ref(`/users/${uId}/records`).push(record)
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecordById ({ dispatch, commit }, id) {
            try {
                const uid = await dispatch('getUId')
                const record = (await firebase.database().ref(`/users/${uid}/records`).child(id).once('value')).val() || {}

                return { ...record, id }
            } catch (e) {
                commit('setError', e)
                throw e
            }
        },
        async fetchRecords ({ dispatch, commit }) {
            try {
                const uid = await dispatch('getUId')
                const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {}

                return Object.keys(records).map(key => ({...records[key], id: key}))
            } catch (e) {
                commit('setError', e)
                throw e
            }
        }
    }
}