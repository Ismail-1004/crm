import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import Paginate from "vuejs-paginate-next";
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'

const app = createApp(App)
app.component('Loader', Loader)
app.component('Paginate', Paginate)

app.directive('tooltip', {
  mounted(el,{ value }) {
    M.Tooltip.init(el, { html: value })

    console.log(value);
  },
  unmounted (el) {
    const tooltip = M.Tooltip.getInstance(el);

    if (tooltip && tooltip.destroy ) {
      tooltip.destroy()
    }
  },
})

firebase.initializeApp({
  apiKey: "AIzaSyBOPqIQiTY59s-hFE1qsVKO92Tc6aU8YKo",
  authDomain: "crm-practice-cab07.firebaseapp.com",
  projectId: "crm-practice-cab07",
  storageBucket: "crm-practice-cab07.appspot.com",
  messagingSenderId: "1048883426920",
  appId: "1:1048883426920:web:c5713458f3715f53812ddd",
  databaseURL: "to https://crm-practice-cab07-default-rtdb.asia-southeast1.firebasedatabase.app"
})

let info 

firebase.auth().onAuthStateChanged(() => {
  if (!info) {
    info =  app.use(store).use(messagePlugin).use(router).mount('#app')
  }
})


