import axios from "axios";

export default {
    namespaced: true,
    state(){
        return {
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
      usedImage(state, getters, rootState, rootGetters){
          return rootState.imageModule.userImages.filter(image=>image._id === state.newExerciseData.imageId)[0]
      }
    },
    mutations: {
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

        resetExerciseCreating(state) {
            state.errors = {}
            state.newExerciseData = {
                listId: '',
                imageId: '',
            }
            state.name = 'Nowe Zadanie',
                state.content = '',
                state.answers = [
                    {
                        id: Date.now(),
                        text: '',
                        isCorrect: false
                    }
                ]
        }
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

        async saveExercise({commit,state,rootGetters,rootState }){
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
                            'Authorization': `Bearer ${rootState.user.token}`
                        }
                    }
                )
            }catch (e) {
                commit('setErrors', e.response.data.errors)
            }
        },

        resetExerciseCreating({commit}){
            commit('resetExerciseCreating')
        }

    }
}