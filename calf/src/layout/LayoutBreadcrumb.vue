<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="mb-2">
    <el-breadcrumb-item style="font-weight: 500;">{{$route.matched[1].name}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: 'LayoutLeftMenu',
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {

    },
    mounted () {
      console.log('------', this.$route)
    }
  }
</script>

<style lang="scss" scoped>
</style>
