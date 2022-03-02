const router = {
  name: 'customComponents',
  path: '/customComponents',
  component: () => import('./CustomComponents.vue'),
  meta: {
    key: '组件'
  }
}

export default router
