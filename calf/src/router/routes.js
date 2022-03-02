import pagesRoutes from './pages-routes'

const Error404 = () => import('../views/error/404.vue')
const Login = () => import('../views/login/Login.vue')
const Layout = () => import('../layout/Layout')
const Header = () => import('../layout/Header')

export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'layout',
    path: '/layout',
    components: {
      default: Layout,
      header: Header
    },
    children: [...pagesRoutes]
  },
  {
    path: '/404',
    name: 'error404',
    component: Error404
  },
  {
    path: '/login',
    alias: '/copyLogin',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    component: Error404
  }
]
