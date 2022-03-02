import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log('to', to)
//   console.log('from', from)
//   console.log('next', next)
// })

// 跳当前路由报错处理
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

export default router

// 1、动态路由匹配
// 动态路径参数 params 设置多段“路径参数” *自动添加pathMath

// 2、路由组件传参
// 布尔模式：
// props被设置为 true，route.params 将会被设置为组件属性。
// 对于包含命名视图的路由，你必须分别为每个命名视图添加 `props` 选项。
// 对象模式：
// props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
// 函数模式：
// 可以创建一个函数返回 props。这样你便可以将参数转换成另一种类型，将静态值与基于路由的值结合等等。
// props: route => ({ query: route.query.q })
