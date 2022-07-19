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