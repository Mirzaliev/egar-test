import Vue from 'vue'
import Vuex from 'vuex'
import Repository from './Repository/ApiRepository';
const Securities = Repository.get('securities');
import Serialize from './helpers/Serialize'
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    securities: null
  },

  getters: {
    getSecurities: state => {
      return state.securities;
    },
  },

  mutations: {
    ADD_SECURITIES (state, payload) {
      /**
       *  Если просто написать state.securities.push(payload) добавляет
       *  родительский массив
       *
       */
      payload.forEach((p) => {
        state.securities.push(p);
      })

    },
    CLEAR_SECURITIES (state){
      state.securities = []
    }
  },
  /**
   * Получение данных из Firebase
   */
  actions: {
    async getUpdateFromFirebase({commit}, requestObject) {
      commit('CLEAR_SECURITIES');
      const { data } = await Securities.get();
      commit('ADD_SECURITIES', Serialize.serializeFirebaseResponseData(data))
    }
  }
});
