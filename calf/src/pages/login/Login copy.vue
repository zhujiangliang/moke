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
    <div style="color: white;">
      <ul>
        <li>{{name}}</li>
        <li>{{user}}</li>
        <li>{{userName}}</li>
        <li>{{height}}</li>
        <li>{{userNameAge}}</li>
        <li>{{nameWeight('75kg')}}</li>
        <li><el-button @click="addCountClick">addCount</el-button>{{count}}</li>
        <li><el-button @click="asyncAddCountClick">asyncAddCount</el-button>{{count}}</li>
        <li>-------------------------</li>
        <li>{{$store.state.moduleA.name}}</li>
        <li>{{aName}}</li>
        <li>{{aCount({num: 100})}}</li>
        <li><el-button @click="aAddCountClick">aAddCount</el-button></li>
        <li><el-button @click="aReduceCountClick">aReduceCount</el-button></li>
        <li><el-button @click="aAddCountHandleClick">aAddCountHandle</el-button></li>
        <li><el-button @click="aReduceCountHandleClick">aReduceCountHandle</el-button></li>
        <li>----------------</li>
        <li>{{bName}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from 'vuex'
  const { a = mapState } = createNamespacedHelpers('moduleB')
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

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
      ...mapState(['name', 'user', 'count', 'height']),
      // ...mapState({
      //   aName: state => state.moduleA.name
      // }),
      ...mapState('moduleA', {
        // aName: state => state.name
        aName: 'name'
      }),
      // ...mapState('moduleA', ['name']),
      ...mapGetters(['userName', 'userNameAge', 'nameWeight']),
      ...mapGetters('moduleA', ['aCount']),

      ...a({ bName: 'name' })
    },
    methods: {
      ...mapMutations(['addCount', 'moduleA/aAddCount']),
      ...mapMutations('moduleA', ['aReduceCount']),
      ...mapActions(['asyncAddCount']),
      // ...mapActions(['asyncAddCount', 'moduleA/aAddCountHandle']),
      ...mapActions('moduleA', ['aAddCountHandle']),
      addCountClick () {
        //   this.$store.commit({
        //   type: 'addCount',
        //   num: 50
        // })
        this.addCount({ num: 10 })
      },
      asyncAddCountClick () {
        // this.asyncAddCount('asyncAddCount', { num: 100 })
        this.asyncAddCount({ num: 100 })
      },
      aAddCountClick () {
        // this.$store.commit('moduleA/aAddCount', {num: 555})
        this['moduleA/aAddCount']({ num: 555 })
      },
      aReduceCountClick () {
        this.aReduceCount({ num: 999 })
      },
      aAddCountHandleClick () {
        // this.$store.dispatch('moduleA/aAddCountHandle', { num: 111 })
        // this['moduleA/aAddCountHandle']({ num: 111 })
        this.aAddCountHandle({ num: 222 })
      },
      aReduceCountHandleClick () {
        this.$store.dispatch('moduleA/aReduceCountHandle', { num: 777 })
      },







      login () {
        this.$refs.loginRef.validate((valid) => {
          if (!valid) return
          this.handleLogin()
        })
      },

      reset () {
        this.$refs.loginRef.resetFields()
      },

      async handleLogin () {
        const params = this.loginForm
        const { data } = await this.$http.post('/login', params)
        const { token } = data.data
        const { status, msg } = data.meta
        const type = status === 200 ? 'success' : 'warning'
        if (status === 200) {
          window.sessionStorage.setItem('mokeToken', token)
          this.$router.push('/layout')
        } else {
          this.$message({
            message: msg,
            type
          })
        }
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
