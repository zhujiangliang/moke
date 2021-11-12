<template>
  <div class="d-flex h-100">
    <layout-left-menu></layout-left-menu>
    <div class="flex-grow-1 p-3">
      <layout-breadcrumb></layout-breadcrumb>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import LayoutLeftMenu from './LayoutLeftMenu.vue'
  import LayoutBreadcrumb from './LayoutBreadcrumb.vue'

  export default {
    name: 'Layout',
    components: { LayoutLeftMenu, LayoutBreadcrumb },
    data () {
      return {
      }
    },

  }
</script>

<style scoped>
</style>