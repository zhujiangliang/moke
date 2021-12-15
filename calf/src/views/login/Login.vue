<template>
  <div class="login d-flex align-items-center">
    <div class="login-form">
      <el-form :model="loginForm" ref="loginRef" :rules="rules" label-width="70px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="d-flex justify-content-end">
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="reset">重置</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('moduleA')

  export default {
    name: 'Login',
    data () {
      const validateName = (rule, value, callback) => {
        if (value.length < 2) {
          return callback('长度必须大于2个字符')
        } else {
          callback()
        }
      }
      const validatePass = (rule, value, callback) => {
        if (value.length < 2) {
          return callback('长度必须大于2个字符')
        } else {
          callback()
        }
      }

      return {
        loginForm: {
          username: 'admin',
          password: '123456'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { validator: validateName, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ]
        }
      }
    },
    computed: {
      ...mapState(['name']),

    },
    methods: {
      login () {
        this.$refs.loginRef.validate((valid) => {
          if (!valid) return
          this.handleLogin()
        })
      },

      reset () {
        this.$refs.loginRef.resetFields()
      },

      handleLogin () {
        this.$router.push('/layout')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    height: 100%;
    background: url("../../assets/images/zcloud-login-bg.png");
    &-form {
      margin-left: 60%;
      border: 1px solid white;
      padding: 20px;
      border-radius: 20px;
    }
  }
</style>
<style lang="scss">
  .login {
    .el-form-item__label {
      color: white;
    }
  }
</style>
