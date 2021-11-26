export default {
  namespaced: true,
  state: {
    name: 'moduleName-B',
    count: 0
  },
  getters: {
    bCount(state) {
      return (payload) => {
        return 'aCount' + (state.count + payload.num)
      }
    }
  },
  mutations: {
    bAddCount(state, payload) {  
      state.count += payload.num
    }
  },
  actions: {
    aAddCountHandle({ commit }, payload) {
      setTimeout(() => {
        commit('bAddCount', payload)
      }, 1000)
    }
  }
}
