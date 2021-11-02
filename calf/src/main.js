import Vue from 'vue'
import router from './router'
import './element'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
<<<<<<< HEAD
  render: (h) => h(App)
=======
  render: h => h(App),
>>>>>>> 587a878fcbefdf42c00286117f09bf273a92e7d8
}).$mount('#app')
