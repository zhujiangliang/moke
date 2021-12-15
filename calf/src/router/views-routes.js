const Error404 = () => import('../views/error/404.vue')
const Login = () => import('../views/login/Login.vue')

export default [
  {
    path: '/404',
    name: 'error404',
    component: Error404
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    component: Error404
  }
]
