import Vue from 'vue'
import router from './router'
import './element'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import './style/index.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
