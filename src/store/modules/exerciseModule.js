export default {
    namespaced: true,
    state(){
        return {
            newExerciseData: {
                listId: '',
                imageId: '',
                /**
                 * fields
                 */
                name: '',
            }
        }
    },
    getters: {
      usedImage(state, getters, rootState, rootGetters){
          return rootState.imageModule.userImages.filter(image=>image._id === state.newExerciseData.imageId)[0]
      }
    },
    mutations: {
        setNewExerciseData(state, payload){
            state.newExerciseData = {...state.newExerciseData, ...payload}
        }
    },
    actions: {
        setNewExerciseData({commit},payload){
            commit('setNewExerciseData', payload)
        }
    }
}