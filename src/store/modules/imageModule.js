import axios from "axios";

export default {
    namespaced: true,
    state(){
        return {
            userImages: []
        }
    },
    mutations: {
        getImages(state, images){
            state.userImages = images
        }
    },
    actions: {
        async getImages({commit, rootGetters, rootState}){
            try{
                const response = await axios.get(
                    `${rootGetters.apiUrl}/images`,
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.user.token}`
                        }
                    }
                )
                commit('getImages',response.data)
            }catch (e) {
                console.log(e)
            }
        }
    }
}