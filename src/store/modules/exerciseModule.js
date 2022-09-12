import axios from "axios";
import router from "@/router";
import {filter} from "core-js/internals/array-iteration";

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
            content: '',
            contentFont: '',
            answersFont: '',
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
        },
        activeExercises(state) {
            return state.exercises.filter(exercise=>!exercise.isArchived)
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
         * @param {string} content
         */
        setContent(state, content){
            state.content = content
        },

        setContentFont(state, font){
            state.contentFont = font
        },
        setAnswersFont(state, font){
            state.answersFont = font
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
            state.content = ''
            state.answers = [
                {
                    id: Date.now(),
                    text: '',
                    isCorrect: false
                }
            ]
            state.contentFont = ''
            state.answersFont = ''
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
         * @param {string} content
         */
        setContent({commit}, content){
            commit('setContent', content)
        },

        setContentFont({commit}, font){
            commit('setContentFont', font)
        },
        setAnswersFont({commit}, font){
            commit('setAnswersFont', font)
        },

        async saveExercise({commit,dispatch,state,rootGetters,rootState }){
            // wyświetlić błędy
            // zrobic przekierowanie lub komunikat z linkami "dodano pomyślnie, kliknij by dodać następne lub wróć do widoku listy"
            // loadery ustawiać
            let exerciseData = {
                list: state.newExerciseData.listId,
                image: state.newExerciseData.imageId || null,
                content: state.content,
                answers: state.answers,
                answersFont: state.answersFont,
                contentFont: state.contentFont
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
                router.push({name: 'ListView', params: {listId: rootState.listModule.listId}})
                dispatch('resetExercise')
            }catch (e) {
                commit('setErrors', e.response.data.errors)
            }
        },
        async switchExercise({dispatch, rootState, rootGetters}, {exerciseId, isArchived}){
            console.log(exerciseId, isArchived)
            dispatch('setLoader', {deleteExercise: true}, { root: true })
            const response = await axios.patch(`${rootGetters.apiUrl}/exercises/${exerciseId}`,{
                exerciseId,
                isArchived
                },

                {
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