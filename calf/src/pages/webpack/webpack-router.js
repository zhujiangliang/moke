const router = {
  name: 'webpack',
  path: '/webpack',
  component: () => import('./Webpack.vue'),
  meta: {
    key: 'Webpack'
  }
}

export default router
