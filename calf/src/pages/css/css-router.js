const router = {
  name: 'css',
  path: '/css',
  component: () => import('./Css.vue'),
  meta: {
    key: 'Css'
  }
}

export default router
