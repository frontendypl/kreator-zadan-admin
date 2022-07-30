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

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    imageModule, exerciseModule, playerModule, listModule, userModule
  },
  state: {
    loader: {
      user: false,
      list: false,
      form: false,
      images: false,
      deleteExercise: false,
    },
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
  },
  actions: {
    setLoader(context, loaderStatus){
      context.commit('setLoader', loaderStatus)
    },
  }
})
