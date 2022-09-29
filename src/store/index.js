import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

/**
 * import Modules
 */
import imageModule from "@/store/modules/imageModule";
import exerciseModule from "@/store/modules/exerciseModule";
import playerModule from "@/store/modules/playerModule";
import listModule from "@/store/modules/listModule";
import userModule from "@/store/modules/userModule";
import answerModule from "@/store/modules/answerModule";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    imageModule, exerciseModule, playerModule, listModule, userModule, answerModule
  },
  state: {
    loader: {
      user: false,
      list: false,
      form: false,
      images: false,
      deleteExercise: false,
      getPlayers: false,
      getExercises: false,
      getAnswers: false
    },
    backPathObject: {
      name: 'home',
      params: {}
    }
  },
  getters: {
    apiUrl(){
      return location.href.indexOf('localhost') === -1? 'https://pytania-api.ucze.net' : 'http://localhost:2000'
    },
    frontUrl(){
      return location.href.indexOf('localhost') === -1? 'https://pytania.ucze.net' : 'http://localhost:8081'
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
    setBackPathObject(state, payload){
      state.backPathObject = {...payload}
    }
  },
  actions: {
    setLoader(context, loaderStatus){
      context.commit('setLoader', loaderStatus)
    },
    setBackPathObject({commit},payload){
      commit('setBackPathObject', payload)
    },
  }
})
