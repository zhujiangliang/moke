<template>
  <div>
    <el-card>
      <h1>friday-plane</h1>
      <el-button @click="toMorning">morning</el-button>
      <router-view></router-view>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'fridayPlane',
    methods: {
      toMorning () {
        this.$router.push({ name: 'fridayPlaneMorning' })
      }
    }
  }
</script>

<style>
</style>