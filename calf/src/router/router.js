const Login = () => import('@/pages/login/Login.vue')
const NotFound = () => import('@/pages/404.vue')
const Layout = () => import('@/layout/Layout.vue')
const Users = () => import('@/pages/userManagement/Users.vue')
const Roles = () => import('@/pages/authorityManagement/Roles.vue')
const Rights = () => import('@/pages/authorityManagement/Rights.vue')

export { Login, NotFound, Layout, Users, Roles, Rights }
