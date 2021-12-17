const router = {
  name: 'friday',
  path: '/friday',
  component: () => import('./Friday.vue'),
  meta: {
    key: 'Friday'
  }
}

export default router
