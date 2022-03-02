const router = {
  name: 'html',
  path: '/html',
  component: () => import('./Html.vue'),
  meta: {
    key: 'Html'
  }
}

export default router
