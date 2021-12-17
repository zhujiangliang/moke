const router = {
  name: 'tuesday',
  path: '/tuesday',
  component: () => import('./Tuesday'),
  meta: {
    key: 'Tuesday'
  }
}

export default router
