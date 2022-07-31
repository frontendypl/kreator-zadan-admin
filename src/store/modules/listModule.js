import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            listId: '',
            exercisesLists: [],

            newListName: '',
            createNewExerciseListErrors: {},

            updateListName: '',
            updateExerciseListErrors: {},
        }
    },
    getters: {
      activeList(state){
          return state.exercisesLists.find(list=>list._id === state.listId)
      }
    },
    mutations: {
        setListId(state, listId) {
            state.listId = listId
        },
        getExercisesLists(state, exercisesLists){
            state.exercisesLists = exercisesLists
        },
        setNewExerciseListErrors(state, payload){
            state.updateExerciseListErrors = {...payload}
        },
        /**
         *
         * @param state
         * @param {string} name
         */
        setNewListName(state, name){
            state.newListName = name
        },
        setUpdateListName(state, newName){
            state.updateListName = newName
        },
        setUpdateExerciseListErrors(state, payload){
            state.updateExerciseListErrors = {...payload}
        },

    },
    actions: {
        /**
         *
         * @param commit
         * @param {string} name
         */
        setNewListName({commit}, name){
            commit('setNewListName', name)
        },
        setUpdateListName({commit}, newName){
            commit('setUpdateListName', newName)
        },
        setUpdateExerciseListErrors({commit}, payload){
            commit('setUpdateExerciseListErrors',payload)
        },
        /**
         * Set active list based on url :listId params. listId is used in requests
         * @param commit
         * @param {string} listId
         */
        setListId({commit}, listId) {
            commit('setListId', listId)
        },
        async getExercisesLists({state, commit, getters, dispatch, rootGetters, rootState}){
            commit('setUpdateExerciseListErrors',{})
            commit('setNewExerciseListErrors',{})
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

        },
        async createNewExerciseList({state, dispatch, commit, rootGetters, rootState}){
            dispatch('setLoader',{list: true}, {root: true})
            try{
                const response = await axios.post(
                    `${rootGetters.apiUrl}/lists`,
                    {name: state.newListName},
                    {headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }}
                )
                dispatch('getExercisesLists')
                await router.push({name:'ExerciseListView',params: {listId: response.data._id}})
            }catch (e) {
                commit('setNewExerciseListErrors', e.response.data.errors)
                dispatch('setLoader',{list: false}, {root: true})
            }
        },
        async updateListName({state, commit, dispatch, rootGetters, rootState}){
            dispatch('setLoader',{list: true}, {root: true})
            try{
                const response = await axios.patch(
                    `${rootGetters.apiUrl}/lists/${state.listId}`,
                    {name: state.updateListName},
                    {headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }}
                )
                dispatch('getExercisesLists')
            }catch (e) {
                commit('setUpdateExerciseListErrors', e.response.data.errors)
                dispatch('setLoader',{list: false}, {root: true})
            }
        },
    },

}