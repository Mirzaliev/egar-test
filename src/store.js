import Vue from 'vue'
import Vuex from 'vuex'
import Repository from './Repository/ApiRepository';
const Securities = Repository.get('securities');
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    securities: []
  },

  getters: {
    GET_SECURITIES: state => {
      return state.securities;
    },
  },

  mutations: {
    ADD_SECURITIES (state, payload) {
      state.securities.push(payload);
    },
    CLEAR_SECURITIES (state){
      state.securities = []
    }
  },

  actions: {
    async getDataFromFirebase({commit}, requestObject) {
      commit('CLEAR_SECURITIES');
      const { data } = await Securities.get();
      commit('ADD_SECURITIES', data)
    }
  }
});
