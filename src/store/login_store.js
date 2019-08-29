// 登录状态
export default {
  state: {
    showLoginContain: false,
    loginState: false,
  },
  getters: {

  },
  mutations: {
    closeLoginContain(state) {
      if (state.showLoginContain === true)
        state.showLoginContain = false;
    },
    openLoginContain(state) {
      state.showLoginContain = true;
    },
    chageLoginState(state) {
      state.loginState = !state.loginState;
    }
  },
}