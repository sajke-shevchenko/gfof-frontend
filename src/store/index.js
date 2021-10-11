import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const api = 'http://localhost:8000/api/'

export default new Vuex.Store({
  state: {
    tariffs: [],
  },
  mutations: {
    SET_TARIFFS (state, tariffs) {
      state.tariffs = tariffs;
    }
  },
  actions: {
    /** Load all tariffs **/
    async loadTariffs() {
      return await axios.get(api + 'tariffs').then(response => this.commit('SET_TARIFFS', response.data.results))
    },
  },
})
