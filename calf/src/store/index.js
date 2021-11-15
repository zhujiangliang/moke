import Vue from 'vue'
import Vuex from 'vuex'
import { REDUCE_NUM } from './mutation'
import moduleA from './modules/moduleA'
import moduleB from './modules/moduleB'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    username: 'zhuliang',
    age: '25',
    asyncState: ''
  },
  getters: {
    surplusAge: (state) => 100 - state.age,
    weight: (state, getters) => state.count + 'kg' + '-------' + getters.surplusAge + 'years'
    // weight: (state, getters) => (height) => state.count + 'kg' + '-------' + getters.surplusAge + 'years' + '---------' + height + 'cm'
  },
  mutations: {
    increment(state, payload) {
      state.count += payload.number
    },
    [REDUCE_NUM](state) {
      state.count -= 10
      // setTimeout(() => {
      //   state.count -= 10
      // }, 1000)
    },

    asyncMutations(state) {
      state.asyncState = 'first actions'
    }
  },
  actions: {
    // reduceActions(context) {
    //   context.commit('reduceNum')
    // }
    reduceActions({ commit }, payload) {
      console.log('reduceActions', payload)
      setTimeout(() => {
        commit('reduceNum')
      }, 1000)
    },
    addActions({ commit }, payload) {
      console.log('addActions', payload)
      setTimeout(() => {
        commit('increment', payload)
      }, 1000)
    },
    asyncActions({ commit }) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('asyncMutations')
          resolve('resolve-ok')
          reject('resolve-ok')
          // console.log('----', resolve, reject)
        }, 2000)
      })
    },
    asyncActions2() {}
  },
  modules: {
    moduleA,
    moduleB
  }
})

export default store
