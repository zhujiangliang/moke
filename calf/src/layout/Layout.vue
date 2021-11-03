<template>
  <div class="d-flex">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo left-menu"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="Oracle">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Oracle</span>
        </template>
        <el-menu-item index="1-3">实例管理</el-menu-item>
        <el-menu-item index="1-4-1">变更管理</el-menu-item>
      </el-submenu>
         <el-submenu index="Oracle">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Oracle</span>
        </template>
        <el-menu-item index="1-3">实例管理</el-menu-item>
        <el-menu-item index="1-4-1">变更管理</el-menu-item>
      </el-submenu>
         <el-submenu index="Oracle">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Oracle</span>
        </template>
        <el-menu-item index="1-3">实例管理</el-menu-item>
        <el-menu-item index="1-4-1">变更管理</el-menu-item>
      </el-submenu>
         <el-submenu index="Oracle">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>Oracle</span>
        </template>
        <el-menu-item index="1-3">实例管理</el-menu-item>
        <el-menu-item index="1-4-1">变更管理</el-menu-item>
      </el-submenu>
      <el-menu-item index="MySql">
        <i class="el-icon-menu"></i>
        <span slot="title">MySql</span>
      </el-menu-item>
      <el-menu-item index="SqlServer">
        <i class="el-icon-setting"></i>
        <span slot="title">SqlServer</span>
      </el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'Layout',
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped>
  .left-menu {
    width: 200px;
    overflow: hidden;
  }
</style>