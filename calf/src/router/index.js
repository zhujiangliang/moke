import Vue from 'vue'
import VueRouter from 'vue-router'
import { Login, NotFound } from './router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  routes
})
