<template>
  <div class="h-100 menu-container d-flex flex-column">
    <el-menu
      :default-active="defaultActive"
      :collapse="collapse"
      :collapse-transition="false"
      class="el-menu-vertical-demo flex-grow-1 border-0"
      background-color="#1f2533"
      text-color="#fff"
      active-text-color="#409EFF"
      router
      @select="select"
    >
      <el-submenu v-for="menu in menuList" :key="menu.id" :index="'/' + menu.path">
        <template slot="title">
          <i class="iconfont mr-2" :class="iconfontObj[menu.id]"></i>
          <span>{{ menu.authName }}</span>
        </template>
        <el-menu-item v-for="submenu in menu.children" :key="submenu.id" :index="'/' + submenu.path">
          <template slot="title">
            <i class="el-icon-menu mr-2"></i>
            <span>{{ submenu.authName }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
    <span type="primary" class="collapse-btn" @click="collapse = !collapse">
      <i :class="collapseIcon"></i>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'LayoutLeftMenu',
    data () {
      return {
        collapse: false,
        menuList: [],
        iconfontObj: {
          125: 'icon-user',
          103: 'icon-tijikongjian',
          101: 'icon-shangpin',
          102: 'icon-danju',
          145: 'icon-baobiao'
        }
      }
    },
    computed: {
      collapseIcon () {
        return this.collapse ? 'el-icon-right' : 'el-icon-back'
      },
      defaultActive () {
        return '/' + this.$route.fullPath.split('/')[1]
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
        console.log('key', key)
      }
    },
    created () {
      this.getMunuList()
    }
  }
</script>

<style lang="scss" scoped>
  .menu-container {
    background-color: #1f2533;
    position: relative;
    &-version {
      color: white;
    }
    .el-submenu {
      width: 160px;
      .el-menu-item {
        min-width: 160px;
        padding-left: 30px !important;
      }
    }
    .el-menu--collapse {
      width: 0px;
      .el-submenu {
        display: none;
      }
    }
    .el-submenu-show {
      display: none;
    }
    .collapse-btn {
      width: 20px;
      color: white;
      background: #1f2533;
      border-radius: 0 25px 25px 0;
      border-left: 1px solid #909399;
      position: absolute;
      font-size: 30px;
      right: -20px;
      top: calc(50% - 50px);
      i {
        font-size: 20px;
        line-height: 100px;
      }
    }
  }
</style>
