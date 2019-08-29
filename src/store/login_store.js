export default{
    state: {
      showLoginContain: false,
      loginState: false,
      userId : 1,
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
