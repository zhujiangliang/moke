import Vue from 'vue'
import router from './router'
import './element'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'
import './assets/fonts/iconfont.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('mokeToken')
  return config
})

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
