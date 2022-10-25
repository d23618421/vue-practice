import store from '../store'

export default function (to, from, next) {
  if (store.getters.user) {
    next()
    console.log('kva ' + store.getters.user.id)
  } else {
    next('/login?loginError=true')
  }
}
