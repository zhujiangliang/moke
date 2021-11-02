import Vue from 'vue'
import VueRouter from 'vue-router'

<<<<<<< HEAD
import { Login, NotFound } from './router'
=======
const Login = () => import('@/pages/Login.vue')
>>>>>>> 587a878fcbefdf42c00286117f09bf273a92e7d8

Vue.use(VueRouter)

const routes = [
<<<<<<< HEAD
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
=======
    {
        path: '/',
        component: Login
    }
]

export default new VueRouter({
    routes
})
>>>>>>> 587a878fcbefdf42c00286117f09bf273a92e7d8
