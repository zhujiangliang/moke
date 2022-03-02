const router = {
  name: 'vue',
  path: '/vue/useSkills',
  component: () => import('./UseSkills.vue'),
  meta: {
    key: 'UseSkills'
  }
}

export default router
