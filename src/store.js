import Vue from 'vue'
import Vuex from 'vuex'
import Repository from './Repository/ApiRepository';
const Securities = Repository.get('securities');
import Serialize from './helpers/Serialize'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    securities: []
  },

  getters: {
    getSecurities: state => {
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
    async getUpdateFromFirebase({commit}, requestObject) {
      commit('CLEAR_SECURITIES');
      const { data } = await Securities.get();
      commit('ADD_SECURITIES', Serialize.serializeFirebaseResponseData(data))
    }
  }
});
