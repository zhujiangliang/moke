const router = {
  name: 'customCheckboxTree',
  path: '/customComponents/customCheckboxTree',
  component: () => import('./CustomCheckboxTree.vue'),
  meta: {
    key: '自定义tree'
  }
}

export default router

