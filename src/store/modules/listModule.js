import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            listId: '',
            exercisesLists: []
        }
    },
    mutations: {
        setListId(state, listId) {
            state.listId = listId
        },
        getExercisesLists(state, exercisesLists){
            state.exercisesLists = exercisesLists
        }
    },
    actions: {
        setListId({commit}, listId) {
            commit('setListId', listId)
        },
        async getExercisesLists({state, commit, getters, dispatch, rootGetters, rootState}){
            dispatch('setLoader',{list: true}, {root: true})
            try{
                const response = await axios.get(
                    `${rootGetters.apiUrl}/lists`,
                    {headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }}
                )
                commit('getExercisesLists', response.data)
                dispatch('setLoader',{list: false}, {root: true})
            }catch (e) {
                console.log(e)
                dispatch('setLoader',{list: false}, {root: true})
            }
        }
    },

}