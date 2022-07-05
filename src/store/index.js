import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      _id: '',
      email: '',
      token: '',
    }
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.kreator-zadan.pl' : 'http://localhost:2000'
    },
  },
  mutations: {
    setUser(state, userData){
      state.user = {...state.user, ...userData}
    }
  },
  actions: {
    setUser(context, userData){
      context.commit('setUser', userData)
    }
  },
  modules: {
  }
})
