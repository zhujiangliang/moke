export default {
  // namespaced: true,
  state: () => ({
    moduleName: 'moduleName-a',
    count: 100
  }),
  getters: {
    doubleCount: (state) => state.count * 2
  }
}
