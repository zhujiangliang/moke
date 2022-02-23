import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: 'name-store',
    user: 'user-store',
    age: '25',
    count: 0,
    userInfo: {
      permissionList: ['test']
    }
  },
  getters: {
    userName: (state) => state.name + state.user,
    userNameAge: (state, getters) => getters.userName + state.age,
    nameWeight: (state) => (weight) => state.name + weight
  },
  mutations: {
    addCount(state, payload) {
      Vue.set(state, 'height', '165')
      state.count += payload.num
    }
  },
  actions: {
    asyncAddCount({ commit }, payload) {
      setTimeout(() => {
        commit('addCount', payload)
      }, 2000)
    }
  },
  modules: {
    moduleA,
    moduleB
  }
})

export default store
