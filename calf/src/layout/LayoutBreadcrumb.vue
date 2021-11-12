<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="mb-2">
    <el-breadcrumb-item :to="{ name: 'users' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
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

    }
  }
</script>

<style lang="scss" scoped>
</style>
