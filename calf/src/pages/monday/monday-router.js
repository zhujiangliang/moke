const router = {
  name: 'monday',
  path: '/monday',
  component: () => import('./Monday'),
  meta: {
    key: 'Monday'
  }
}

export default router
