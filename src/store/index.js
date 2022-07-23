import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

/**
 * import Modules
 */
import imageModule from "@/store/modules/imageModule";
import exerciseModule from "@/store/modules/exerciseModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    imageModule, exerciseModule
  },
  state: {
    loader: {
      user: false,
      list: false,
      form: false,
      images: false,
    },
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
      return location.href.indexOf('localhost') === -1? 'https://kreator-zadan.pl' : 'http://localhost:8081'
    },
    loaderActive(state){
      let isActive = false
      for(const property in state.loader){
        if(state.loader[property]===true) isActive = true
      }
      return isActive
    }
  },
  mutations: {
    setLoader(state, loaderStatus){
      state.loader = {...state.loader, ...loaderStatus}
    },
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
    setLoader(context, loaderStatus){
      context.commit('setLoader', loaderStatus)
    },
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
  }
})
