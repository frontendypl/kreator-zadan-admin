import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      _id: '',
      email: '',
      token: '',
    },
    exercisesLists: []
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://api.kreator-zadan.pl' : 'http://localhost:2000'
    },
    frontUrl(){
      return location.href.indexOf('localhost') === -1? 'https://kreator-zadan.pl' : 'http://localhost:8080'
    },
  },
  mutations: {
    setUser(state, userData){
      state.user = {...state.user, ...userData}
      localStorage.setItem('user', JSON.stringify(state.user))
    },
    logOut(state){
      state.user = {
        _id: '',
        email: '',
        token: '',
      }
    },
    getExercisesLists(state, exercisesLists){
      state.exercisesLists = exercisesLists
    }
  },
  actions: {
    setUser(context, userData){
      context.commit('setUser', userData)
    },
    logOut(context){
      localStorage.removeItem('user')
      context.commit('logOut')
    },
    async getExercisesLists({state, commit, getters}){
      try{
        const response = await axios.get(
            `${getters.apiUrl}/lists`,
            {headers: {
                'Authorization': `Bearer ${state.user.token}`
              }}
        )
        commit('getExercisesLists', response.data)
      }catch (e) {
        console.log(e)
      }
    }
  },
  modules: {
  }
})
