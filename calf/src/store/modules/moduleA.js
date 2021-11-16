export default {
  namespaced: true,
  // state: () => ({}),
  state: {
    name: 'moduleName-A',
    count: 0
  },
  getters: {
    aCount(state) {
      return (payload) => {
        return 'aCount' + (state.count + payload.num)
      }
    }
    // aCount: (state) => (payload) => 'aCount' + (state.count + payload.num)
  },
  mutations: {
    aAddCount(state, payload) {
      state.count += payload.num
    },
    aReduceCount(state, payload) {
      state.count -= payload.num
    }
  },
  actions: {
    aAddCountHandle({ commit }, payload) {
      setTimeout(() => {
        commit('aAddCount', payload)
      }, 1000)
    },
    aReduceCountHandle({ commit }, payload) {
      setTimeout(() => {
        commit('aReduceCount', payload)
      }, 1000)
    }
  }
}
