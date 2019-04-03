import Vue from "vue";
import Vuex from "vuex";

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
      // state.userData.isAdmin = admin
      // state.userData.username = username
      // state.userData.email = email
      // state.userData.password = password
    },
    userData(state, payload) {
      state.userData = payload
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
