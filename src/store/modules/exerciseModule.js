import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            exercises: [],
            errors: {},
            newExerciseData: {
                listId: '',
                imageId: '',
            },
            name: 'Nowe Zadanie', //późnej to numerowac od ilosci zadan w danej liscie np "zadanie 1"
            content: '',
            answers: [
                {
                    id: Date.now(),
                    text: '',
                    isCorrect: false
                }
            ],
        }
    },
    getters: {
        usedImage(state, getters, rootState, rootGetters) {
            return rootState.imageModule.userImages.filter(image => image._id === state.newExerciseData.imageId)[0]
        },
        isAnyAnswerOptionCorrect(state){
            return !!state.answers.find(answer=> answer.isCorrect)
        }
    },
    mutations: {
        getExercises(state, payload){
          state.exercises = payload
        },
        setNewExerciseData(state, payload){
            state.newExerciseData = {...state.newExerciseData, ...payload}
        },
        addNewAnswer(state){
            state.answers.push({
                id: Date.now(),
                text: '',
                isCorrect: false
            })
        },
        /**
         *
         * @param state
         * @param {number} id
         */
        deleteAnswer(state, id){
            state.answers = state.answers.filter(answer=>answer.id !== id)
        },
        /**
         *
         * @param state
         * @param {{id: number, text: string}} payload
         */
        setAnswer(state, payload){
            let answer = state.answers.find(answer=>answer.id === payload.id)
            for(const key in payload){
                answer[key] = payload[key]
            }
        },
        clearIsCorrectProperties(state){
            state.answers.forEach(answer=>{
                answer.isCorrect = false
            })
        },
        /**
         *
         * @param state
         * @param {string} name
         */
        setName(state, name){
            state.name = name
        },
        /**
         *
         * @param state
         * @param {string} content
         */
        setContent(state, content){
            state.content = content
        },

        setErrors(state, errors) {
            state.errors = {...errors}
        },

        resetExercise(state) {
            state.errors = {}
            state.newExerciseData = {
                listId: '',
                imageId: '',
            }
            state.name = 'Nowe Zadanie'
            state.content = ''
            state.answers = [
                {
                    id: Date.now(),
                    text: '',
                    isCorrect: false
                }
            ]
        },
    },

    actions: {
        addNewAnswer({commit}){
            commit('addNewAnswer')
        },
        deleteAnswer({commit}, id){
            commit('deleteAnswer', id)
        },
        setNewExerciseData({commit},payload){
            commit('setNewExerciseData', payload)
        },
        setAnswer({commit, dispatch}, payload){
            if(payload.isCorrect){
                commit('clearIsCorrectProperties')
            }
            commit('setAnswer', payload)
        },
        /**
         *
         * @param commit
         * @param {string} name
         */
        setName({commit}, name){
            commit('setName', name)
        },
        /**
         *
         * @param commit
         * @param {string} content
         */
        setContent({commit}, content){
            commit('setContent', content)
        },

        async saveExercise({commit,dispatch,state,rootGetters,rootState }){
            // wyświetlić błędy
            // zrobic przekierowanie lub komunikat z linkami "dodano pomyślnie, kliknij by dodać następne lub wróć do widoku listy"
            // loadery ustawiać
            let exerciseData = {
                list: state.newExerciseData.listId,
                image: state.newExerciseData.imageId || null,
                name: state.name,
                content: state.content,
                answers: state.answers
            }

            try{
                const response = await axios.post(
                    `${rootGetters.apiUrl}/exercises`,
                    exerciseData,
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                console.log({response})
                router.push({name: 'ExerciseListView', params: {listId: rootState.listModule.listId}})
                dispatch('resetExercise')
            }catch (e) {
                commit('setErrors', e.response.data.errors)
            }
        },
        async deleteExercise({dispatch, rootState, rootGetters}, exerciseId){
            dispatch('setLoader', {deleteExercise: true}, { root: true })
            const response = await axios.delete(`${rootGetters.apiUrl}/exercises/${exerciseId}`,{
                headers: {
                    'Authorization': `Bearer ${rootState.userModule.user.token}`
                }
            })
            dispatch('getExercises')
            dispatch('setLoader', {deleteExercise: false}, { root: true })
        },
        resetExercise({commit, dispatch}){
            dispatch('setLoader', {deleteExercise: false}, { root: true })
            commit('resetExercise')
        },

        /**
         * get list of exercises
         */
        async getExercises({state, commit,  rootGetters, rootState}){
            try{
                const response = await axios.get(
                    `${rootGetters.apiUrl}/lists/${rootState.listModule.listId}/exercises`,
                    {
                        headers: {
                            'Authorization': `Bearer ${rootState.userModule.user.token}`
                        }
                    }
                )
                commit('getExercises', response.data)
            }catch (e) {
                console.log(e)
            }
        },
    }
}