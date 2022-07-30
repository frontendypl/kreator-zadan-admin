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
        async getPlayers({state, commit,  rootGetters, rootState}){
            try{
                const response = await axios.get(
                    `${rootGetters.apiUrl}/lists/${rootState.listModule.listId}/players`, //liste przeniesc do listModule
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                commit('setPlayers', response.data)
            }catch (e) {
                console.log(e)
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