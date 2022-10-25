/* eslint-disable quotes */
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BuyModalComponent from '@/components/Shared/BuyModal'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
// import './stylus/main.styl'
// import './sass/main.scss' -  не сработали у меня эти штуки с препроцессорами

Vue.component('app-buy-modal', BuyModalComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>',
  created: function () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCkH-0NKHqufwF2Y40qXcty4NswHyoxfrU',
      authDomain: 'itc-ads-b5e98.firebaseapp.com',
      databaseURL: 'https://itc-ads-b5e98-default-rtdb.europe-west1.firebasedatabase.app',
      projectId: 'itc-ads-b5e98',
      storageBucket: 'itc-ads-b5e98.appspot.com',
      messagingSenderId: '402900490660'
      // appId: '1:402900490660:web:b095295425dfd58a4c8931'
    /* apiKey: 'AIzaSyD5mgcTCPSiTxPfmTmBmPFWZU7GdR9l1BQ', // не под моим аккаунтом
      authDomain: 'itc-ads.firebaseapp.com',
      databaseURL: 'https://itc-ads.firebaseio.com',
      projectId: 'itc-ads',
      storageBucket: 'itc-ads.appspot.com',
      messagingSenderId: '145551978680' */
    /* apiKey: 'AIzaSyC9hzTHm3rZGaMR3GW5pPLbncJiWJbNyTg', // из урока
      authDomain: 'itc-ads-3fafd.firebaseapp.com',
      projectId: 'itc-ads-3fafd',
      storageBucket: 'itc-ads-3fafd.appspot.com',
      messagingSenderId: '729924269399',
      appId: '1:729924269399:web:826cc265afc7d65e9f7a12' */
    })

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
