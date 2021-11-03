import Vue from 'vue'
import VueRouter from 'vue-router'
import { Login, NotFound, Layout } from './router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'login' },
    component: Login
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'layout',
    path: '/layout',
    component: Layout
  },
  {
    name: 'nogFound',
    path: '*',
    component: NotFound
  }
]

export default new VueRouter({
  mode: 'history',
  routes
})
