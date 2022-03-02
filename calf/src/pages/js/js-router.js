const router = {
  name: 'js',
  path: '/js',
  component: () => import('./Js.vue'),
  meta: {
    key: 'Js'
  }
}

export default router
