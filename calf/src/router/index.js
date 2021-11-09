import Vue from 'vue'
import VueRouter from 'vue-router'
import { Login, NotFound, Layout, Users } from './router'

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
    component: Layout,
    redirect: '/users',
    children: [
      {
        path: '/users',
        name: 'users',
        component: Users
      }
    ]
  },
  {
    name: 'notFound',
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('mokeToken')
  if (!token) return next('/login')

  next()
})

export default router
