<template>
  <div class="d-flex">
    <layout-left-menu></layout-left-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  import LayoutLeftMenu from './LayoutLeftMenu.vue'

  export default {
    name: 'Layout',
    components: { LayoutLeftMenu },
    data () {
      return {
      }
    },

  }
</script>

<style scoped>
</style>