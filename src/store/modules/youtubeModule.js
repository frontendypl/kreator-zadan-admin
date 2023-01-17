import axios from "axios";

export default {
    namespaced: true,
    state() {

    },
    mutations: {

    },
    actions: {
        async removeVideo({commit, dispatch, rootGetters, rootState}, youtubeId){

            try {
                const response = await axios.delete(
                    `${rootGetters.apiUrl}/youtube-videos/${youtubeId}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )

                rootState.exerciseModule.youtubePreviewId = '';
                rootState.exerciseModule.newExerciseData.youtubeId = '';

            }catch (e) {

            }

        }
    },
    getters: {

    }

}