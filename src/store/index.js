import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

/*Only for demo*/
import JwtEncode from 'jwt-encode';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userData: {},
    token: {}
  },
  mutations: {
    SET_USER_DATA(state, user) {
      state.userData = user;
    },
    SET_USER_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    login: ({}, formData) => {
      /*Only for demo*/
      const secret = 'secret';
      const data = {
        sub: '1234567890',
        user: {
          name: 'Jhon',
          lastName: 'Doe',
          email: 'email@example.com'
        },
        exp: 1672510604,
        iat: 1516239022
      };
      const jwt = JwtEncode(data, secret);
      return {
        user: jwt,
        token: 'SAMPLE_TEXT'
      };

      return axios
        .post(`${process.env.VUE_APP_API_BASE_URI}/api/login`, formData)
        .then((response) => response.data)
        .catch((err) => {
          console.error(err);
          throw new Error(`Can't login the user`);
        });
    },
    setUserData: ({ commit }, userData) => {
      commit('SET_USER_DATA', userData);
    },
    setUserToken: ({ commit }, token) => {
      commit('SET_USER_TOKEN', token);
    }
  },
  modules: {}
});
