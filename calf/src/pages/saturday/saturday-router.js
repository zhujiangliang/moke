const router = {
  name: 'saturday',
  path: '/saturday',
  component: () => import('./Saturday'),
  meta: {
    key: 'Saturday'
  }
}

export default router
