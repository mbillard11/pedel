import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

function initialState() {
  return {
    userData: {
      isLoggedIn: false,
      isAdmin: false,
      username: null,
      email: null,
      password: null
    }
  };
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    userData: {
      isLoggedIn: false,
      isAdmin: false,
      username: null,
      email: null,
      password: null
    }
  },
  // always watching the state
  getters: {
    fullName(state) {
      return state.userData.firstname + " " + state.userData.lastname;
    }
  },
  mutations: {
    loginState(state, payload) {
      state.userData.isLoggedIn = payload;
    },
    userData(state, payload) {
      state.userData = payload;
    },
    reset(state) {
      // acquire initial state
      const s = initialState();
      Object.keys(s).forEach(key => {
        state[key] = s[key];
      });
    }
  }
});
