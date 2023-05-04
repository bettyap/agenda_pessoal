import { createApp } from 'vue'
import './style.css'
import './libs/dayjs'
import App from './App.vue'
import routes from './routes'
import { vMaska } from "maska"
import Vue3Toasity from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { Quasar } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

createApp(App)
  .use(routes)
  .directive("maska", vMaska)
  .use(Vue3Toasity, {
    autoClose: 3000,
    theme: "colored"
  })
  .use(Quasar)
  .mount('#app')
