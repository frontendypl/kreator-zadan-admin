import axios from "axios";
import router from "@/router";

export default {
    namespaced: true,
    state(){
        return {
            user: {
                _id: '',
                email: '',
                token: '',
            },

            loginUserForm: {
                email: '',
                password: '',
            },
            loginFormErrors: {}


        }
    },
    mutations: {
        setUser(state, userData){
            state.user = {...state.user, ...userData}
            localStorage.setItem('user', JSON.stringify(state.user))
        },
        logOut(state){
            state.user = {
                _id: '',
                email: '',
                token: '',
            }
        },

        setLoginUserForm(state, payload){
            state.loginUserForm = {...state.loginUserForm, ...payload}
        },
        setLoginErrors(state, payload){
            state.loginFormErrors = {...payload}
        }
    },
    actions: {
        setUser(context, userData){
            context.commit('setUser', userData)
        },
        logOut(context){
            localStorage.removeItem('user')
            context.commit('logOut')
        },



        /**
         *
         */
        setLoginUserForm({commit}, payload){
            commit('setLoginUserForm', payload)
        },
        setLoginErrors(state, payload){
            state.loginErrors = {...payload}
        },
        // validation(){
        //     this.errors = {
        //         required: {
        //             message: ''
        //         }
        //     }
        //     if(!this.user.email || !this.user.password){
        //         this.errors.required.message = 'Uzupełnij wszystkie pola'
        //         return false
        //     }
        //
        //     return true
        // },
        /**
         *
         */
        async logIn({state, dispatch, commit, rootGetters}){

            try{
                dispatch('setLoader', {form: true}, { root: true })
                const response = await axios.post(`${rootGetters.apiUrl}/users/login`, state.loginUserForm)
                commit('setUser', {...response.data.user, token: response.data.token})
                dispatch('setLoader', {form: false}, { root: true })
            }catch (e) {
                commit('setLoginErrors', e.response.data.errors)
                dispatch('setLoader', {form: false}, { root: true })
            }

        }
    }
}