import {Store} from 'vuex';

const store = new Store({
  state: {
    userEmail: null,
    user: null
  },
  mutations: {
    setUserEmail(state, email) {
      state.userEmail = email;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    getUserEmail: state => state.userEmail,
    getUser: state => state.user
  }
});

export default store;
