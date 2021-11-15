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
      <div>{{count}}</div>
      <div>{{username}}</div>
      <div>{{height}}</div>
      <div>vuex-surplusAge: {{surplusAge}}</div>
      <div>vuex-weight: {{weight}}</div>
      <!-- <el-button @click="addHandle">add</el-button>
      <el-button @click="reduceHandle">reduce</el-button> -->
      <hr>
      <el-button @click="increment({number: 50})">increment</el-button>
      <el-button @click="reduceNum">reduceNum</el-button>
      <hr>
      <el-button @click="reduceActionsClick">reduceActions</el-button>
      <el-button @click="addActionsClick">addActions</el-button>

      <hr>
      <div>asyncState:{{asyncState}}</div>
      <el-button @click="asyncStateClick">asyncState</el-button>

      <hr>
      <h3>
        modules
        <el-button @click="moduleClick">module</el-button>
      </h3>
      <div>{{$store.state.moduleA.moduleName}}</div>
      <div>{{$store.getters.doubleCount}}</div>
      <!-- <div>{{$store.state.moduleB.moduleName}}: {{$store.getters.moduleB.doubleCount}}</div> -->
      <!-- <div>{{nameA}}</div>
      <div>{{nameB}}</div> -->
    </div>
  </div>
</template>

<script>
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
      // ...mapState(['count', 'username']),
      ...mapState({
        count: state => state.count,
        username: 'username',
        asyncState: 'asyncState',
        nameA: 'moduleA.moduleName',
        // nameB: 'moduleB/moduleName'
      }),
      // ...mapGetters(['surplusAge', 'weight']),
      ...mapGetters({
        surplusAge: 'surplusAge',
        weight: 'weight'
      }),
      // height: () => this.$store.state.count + 10,
      height () {
        return this.$store.state.count + 10
      },
      // weightself () {
      //   return this.$store.getters.weight
      // }
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
      },

      addHandle () {
        // this.$store.commit('increment', 100)
        // this.$store.commit('increment', {
        //   number: 100
        // })
        // this.$store.commit({
        //   type: 'increment',
        //   number: 20
        // })
        // console.log(this.$store.getters.weight(165))
        this.increment({ number: 10 })
      },

      reduceHandle () {
        // this.$store.commit({
        //   type: 'reduceNum'
        // })
        this.reduceNum()
      },

      ...mapMutations(['increment', 'reduceNum']),
      ...mapActions([
        'reduceActions',
        'addActions',
        'asyncActions'
      ]),
      reduceActionsClick () {
        // this.$store.dispatch({
        //   type: 'reduceActions',
        //   num: '10000'
        // })
        // this.$store.dispatch('reduceActions', {
        //   num: '10000'
        // })
        this.reduceActions({ num: 888 })
      },

      addActionsClick () {
        // this.$store.dispatch('addActions', {
        //   number: 333
        // })
        this.addActions({ number: 999 })
      },

      asyncStateClick () {
        this.asyncActions().then((msg) => {
          console.log('ok', msg)
        }).finally((err) => {
          console.log("err", err)
        })
      },

      moduleClick () {
        console.log('--------', this.$store.state.moduleA.moduleName)
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
