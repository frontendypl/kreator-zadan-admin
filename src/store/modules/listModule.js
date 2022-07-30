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
        /**
         * Set active list based on url :listId params. listId is used in requests
         * @param commit
         * @param {string} listId
         */
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
        },
        async deleteExercisesList({dispatch, commit, rootGetters, rootState},id){
            dispatch('setLoader',{list: true}, {root: true})
            try{
                const response = await axios.delete(`${rootGetters.apiUrl}/lists/${id}`,
                    {headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }}
                )
                dispatch('getExercisesLists')
            }catch (e){
                console.log(e)
                dispatch('setLoader',{list: false}, {root: true})
            }

        }
    },

}