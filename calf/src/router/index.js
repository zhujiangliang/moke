import Vue from 'vue'
import VueRouter from 'vue-router'
import pageRoutes from './pages-routes'
import viewsRoutes from './views-routes'

Vue.use(VueRouter)
const routes = [...viewsRoutes, ...pageRoutes]
console.log('routes', routes)
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
