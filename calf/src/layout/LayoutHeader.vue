<template>
  <div class="d-flex align-item-center justify-content-between border-bottom py-2">
    <div>{{ $t('version') }}：0.1.0</div>
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        {{ language }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="lang of languageOptions" :command="lang.value" :key="lang.value">{{lang.label}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  export default {
    name: 'LayoutHeader',
    data () {
      return {
        language: "简体中文",
        languageOptions: [
          {
            label: '简体中文',
            value: 'zh_CN'
          },
          {
            label: 'English',
            value: 'en_US'
          }
        ]
      }
    },
    methods: {
      handleCommand (val) {
        this.$i18n.locale = 'en_US'
        console.log("this.$i18n", this.$i18n.locale)
        this.language = val
        console.log("val", val)
      }
    }
  }
</script>

<style>
</style>