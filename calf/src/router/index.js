import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('@/pages/Login.vue')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Login
    }
]

export default new VueRouter({
    routes
})