<template>
  <div class="menu-container bg-color-main">
    <el-menu
      :default-active="defaultMenu"
      class="el-menu-vertical-demo left-menu"
      @select="select"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#409EFF">
      <el-submenu v-for="menu in menuList" :key="menu.id" :index="String(menu.id)">
        <template slot="title">
          <i class="iconfont mr-2" :class="iconfontObj[menu.id]"></i>
          <span>{{menu.authName}}</span>
        </template>
        <el-menu-item v-for="submenu in menu.children" :key="submenu.id" :index="String(submenu.id)">
          <template slot="title">
            <i class="el-icon-menu mr-2"></i>
            <span>{{submenu.authName}}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
 </template>

<script>
  export default {
    name: 'LayoutLeftMenu',
    data () {
      return {
        menuList: [],
        iconfontObj: {
          '125': "icon-user",
          '103': "icon-tijikongjian",
          '101': "icon-shangpin",
          '102': "icon-danju",
          '145': "icon-baobiao"
        }
      }
    },
    computed: {
      defaultMenu () {
        return '111'
      }
    },
    methods: {
      async getMunuList () {
        const { data } = await this.$http.get('/menus')
        const { status, msg } = data.meta
        if (status !== 200) return this.$message.error(msg)
        this.menuList = data.data
      },

      select (key) {
        this.$router.push({ name: key })
      }
    },
    created () {
      this.getMunuList()
    }
  }
</script>

<style lang="scss" scoped>
  .menu-container {
    height: 100vh;
    .left-menu {
      width: 200px;
    }
    .el-menu {
      border-right: none;
    }
  }
</style>