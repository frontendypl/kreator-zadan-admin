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
    getters: {
      userImagesActive(state){
          return state.userImages.filter(image=>!image.isArchived)
      }
    },
    actions: {
        async getImages({commit, dispatch, rootGetters, rootState}){
            try{
                dispatch('setLoader', {images: true}, { root: true })
                const response = await axios.get(
                    `${rootGetters.apiUrl}/images`,
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                commit('getImages',response.data)
                dispatch('setLoader', {images: false}, { root: true })
            }catch (e) {
                console.log(e)
                dispatch('setLoader', {images: false}, { root: true }) //TODO handle images loading error !!!
            }
        },
        async switchImage({dispatch, rootGetters, rootState},{id, isArchived}){

            try{
                dispatch('setLoader', {images: true}, { root: true })

                const response = await axios.patch(
                    `${rootGetters.apiUrl}/images/${id}`,
                    {
                        id,
                        isArchived
                    },
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                dispatch('getImages')
            }catch (e) {
                dispatch('getImages')
            }
        }
    }
}