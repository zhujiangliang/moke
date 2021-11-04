<template>
  <div class="menu-container bg-color-main">
    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical-demo left-menu"
      @select="select"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu v-for="menu in menuList" :key="menu.index" :index="menu.index">
        <template slot="title">
          {{menu.name}}
        </template>
        <el-menu-item v-for="submenu in menu.submenuList" :key="submenu.index" :index="submenu.index">
          {{submenu.name}}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
 </template>

<script>
  import menuList from './mokeJson/menuList'

  export default {
    name: 'LayoutLeftMenu',
    data () {
      return {
        menuList: menuList
      }
    },
    computed: {
      defaultMenu () {
        return this.menuList[0].submenuList[0].index
      }
    },
    methods: {
      select (key) {
        this.$router.push({ name: key })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menu-container {
    height: 100vh;
    .left-menu {
      width: 200px;
      overflow: hidden;
    }
  }
</style>