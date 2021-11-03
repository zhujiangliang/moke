<template>
  <div class="login-content d-flex align-items-center justify-content-center">
   <div>
    <el-form class="login-form" :model="loginForm" ref="loginRef" :rules="rules" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>
    </el-form>
    <el-button>注册</el-button>
    <el-button @click="login">登录</el-button>
   </div>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data () {
      const validateName = (rule, value, callback) => {
        if (value !== 'moke') {
          return callback('用户名错误！')
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value !== 'moke') {
          return callback('密码错误！')
        } else {
          callback()
        }
      }

      return {
        loginForm: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { validator: validateName, trigger: "blur" }
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { validator: validatePass, trigger: "blur" }
          ]
        }
      }
    },
    methods: {
      login () {
        this.$refs.loginRef.validate((valid) => {
          if (valid) {
            this.$router.push('/layout')
          } else {
            return false
          }
        })
      }
    }
  }
 </script>

<style scoped>
  .login-content {
    height: 100vh;
    background: url("../assets/images/zcloud-login-bg.png");
  }
  .login-form {
    border: 1px solid palegoldenrod;
  }
</style>

