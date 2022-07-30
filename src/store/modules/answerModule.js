import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            answers: []
        }
    },
    mutations: {
        getAnswers(state, payload){
            state.answers = payload
        }
    },
    actions: {
        async getAnswers({dispatch, commit, rootState, rootGetters}){
            try{
                const response = await axios.get(`${rootGetters.apiUrl}/lists/${rootState.listModule.listId}/answers`)
                commit('getAnswers', response.data)
            }catch (e) {
                console.log(e)
            }
        }
    }
}

