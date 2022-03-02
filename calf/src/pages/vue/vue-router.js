const router = {
  name: 'vue',
  path: '/vue',
  component: () => import('./Vue.vue'),
  meta: {
    key: 'Vue'
  }
}

export default router
