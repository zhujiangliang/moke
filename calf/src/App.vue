<template>
  <div id="app">
    <router-view name="header"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: 'App'
  }
  console.log('%c%s', 'color: #fff; background: #0a0d14; font-size: 13px; border-radius: 4px;padding: 3px 5px', '0.1.0' + ' 版本')
</script>

<style>
  html,
  body,
  #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>
