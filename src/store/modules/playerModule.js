import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state() {
        return {
            players: [],

        }
    },
    mutations: {
        setPlayers(state, payload) {
            state.players = payload
        }
    },
    actions: {
        /**
         * get list of players
         */
        async getPlayers({state, commit, dispatch,  rootGetters, rootState}, loader=false){
            try{
                if(loader){
                    dispatch('setLoader', {getPlayers: true}, { root: true })
                }
                const response = await axios.get(
                    `${rootGetters.apiUrl}/lists/${rootState.listModule.listId}/players`, //liste przeniesc do listModule
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                commit('setPlayers', response.data)
                dispatch('setLoader', {getPlayers: false}, { root: true })
            }catch (e) {
                console.log(e)
                dispatch('setLoader', {getPlayers: false}, { root: true })
            }
        },
        /**
         *
         * @param {string} id
         * @return {Promise<void>}
         */
        async deletePlayer({dispatch, rootGetters},id){
            try{
                const response = await axios.delete(`${rootGetters.apiUrl}/players/${id}`)
                await dispatch('getPlayers')
            }catch (e) {
                console.log(e)
            }
        },
    }
}