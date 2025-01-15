import axios from 'axios';

const state = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  authToken: localStorage.getItem('authToken') || null,
};

const getters = {
  userName: (state) => state.user?.name || 'Guest',
  isAuthenticated: (state) => !!state.authToken,
};

const mutations = {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_AUTH_TOKEN(state, token) {
    state.authToken = token;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit('SET_USER', user);
  },
  setAuthToken({ commit }, token) {
    commit('SET_AUTH_TOKEN', token);
  },
  fetchUser({ commit, state }) {
    const token = state.authToken || localStorage.getItem('authToken');
    if (token) {
      axios.get('/user', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => {
          commit('SET_USER', response.data);
        })
        .catch(() => {
          commit('SET_USER', null);
        });
    }
  },
  logout({ commit }) {
    commit('SET_USER', null);
    commit('SET_AUTH_TOKEN', null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
