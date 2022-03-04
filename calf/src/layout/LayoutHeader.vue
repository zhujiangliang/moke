<template>
  <div class="d-flex align-item-center justify-content-between border-bottom my-2">
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
  import languageMixin from './mixins/language-mixin'
  export default {
    name: 'LayoutHeader',
    mixins: [languageMixin],
    data () {
      return {

      }
    },
    methods: {
      handleCommand (val) {
        localStorage.setItem('language', val)
        this.$i18n.locale = val
      }
    },
    created () {
      console.log('-----', this.$i18n)
    }
  }
</script>

<style>
</style>