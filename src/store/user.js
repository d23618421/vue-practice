import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

class User {
  constructor (id) {
    this.id = id
  }
}

export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      console.log('setuser ', payload)
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }

      /* firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => {
          commit('setUser', new User(user.uid))
          commit('setLoading', false)
        })
        .catch(error => {
          commit('setLoading', false)
          commit('setError', error.message)
        }) */
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setUser', new User(user.uid))
        console.log('login user ', user.uid)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    autoLoginUser ({commit}, payload) {
      console.log('autologin user ', payload.uid)
      commit('setUser', new User(payload.uid))
    },
    logoutUser ({commit}) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      console.log('Getter of the user = ' + state.user)
      return state.user
    },
    isUserLoggedIn (state) {
      return state.user !== null
    }
  }
}
