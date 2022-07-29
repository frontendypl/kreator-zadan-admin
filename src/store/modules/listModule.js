import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            listId: '',
        }
    },
    mutations: {
        setListId(state, listId) {
            state.listId = listId
        },
    },
    actions: {
        setListId({commit}, listId) {
            commit('setListId', listId)
        },
    }
}