const router = {
  name: 'customAppCascader',
  path: '/customComponents/customAppCascader',
  component: () => import('./CustomAppCascader.vue'),
  meta: {
    key: '自定义tree'
  }
}

export default router

