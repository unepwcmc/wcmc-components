export const storeDummyButton = {
  namespaced: true,
  state: {
    counter: 0
  },
  getters: {
    counter: (state) => state.counter
  },
  mutations: {
    increment(state) {
      state.counter += 1
    }
  }
}
