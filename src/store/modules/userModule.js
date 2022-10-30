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
            loginFormErrors: {},

            registerUserForm: {
                email: '',
                password: '',
                repeatPassword: ''
            },
            registerFormErrors: {},

            resetPasswordForm: {
                email: '',
                password: '',
                repeatPassword: ''
            },
            resetPasswordErrors: {},
            resetPasswordConfirmation: '',

            passwordConfirmed: '',
            passwordConfirmationErrors: {}

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
        },

        setRegisterUserForm(state, payload){
            state.registerUserForm = {...state.registerUserForm, ...payload}
        },
        setRegisterErrors(state, payload){
            state.registerFormErrors = {...payload}
        },

        setResetPasswordForm(state, payload){
            state.resetPasswordForm = {...state.resetPasswordForm, ...payload}
        },
        setResetPasswordErrors(state, payload){
            state.resetPasswordErrors = {...payload}
        },
        setResetPasswordConfirmation(state, payload){
            state.resetPasswordConfirmation = payload
        },
        setPasswordConfirmedStatus(state, payload){
            state.passwordConfirmed = payload
        },
        setPasswordConfirmationErrors(state, payload){
            state.passwordConfirmationErrors = {...payload}
        },    },
    actions: {
        setUser(context, userData){
            context.commit('setUser', userData)
        },
        logOut(context){
            localStorage.removeItem('user')
            context.commit('logOut')
        },

        setLoginUserForm({commit}, payload){
            commit('setLoginUserForm', payload)
        },
        setRegisterUserForm({commit}, payload){
            commit('setRegisterUserForm', payload)
        },
        setResetPasswordForm({commit}, payload){
            commit('setResetPasswordForm', payload)
        },


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
        },

        async registerUser({state, commit, dispatch, rootState, rootGetters}){
            try{
                dispatch('setLoader', {form: true}, { root: true })
                const response = await axios.post(`${rootGetters.apiUrl}/users`, state.registerUserForm)
                commit('setUser', {...response.data.user, token: response.data.token})
                dispatch('setLoader', {form: false}, { root: true })
            }catch (e) {
                commit('setRegisterErrors', e.response.data.errors)
                dispatch('setLoader', {form: false}, { root: true })
            }
        },

        async resetPassword({state, commit, dispatch, rootState, rootGetters}){
            try{
                dispatch('setLoader', {form: true}, { root: true })
                const response = await axios.post(`${rootGetters.apiUrl}/reset-password`, state.resetPasswordForm)
                commit('setResetPasswordErrors', {})
                commit('setResetPasswordConfirmation', response.data.status)
                dispatch('setLoader', {form: false}, { root: true })
            }catch (e) {
                commit('setResetPasswordErrors', e.response.data.errors)
                dispatch('setLoader', {form: false}, { root: true })
            }
        },

        /**
         * @param {String} resetId
         */
        async confirmNewPassword({state, commit, dispatch, rootState, rootGetters}, resetId){
            try{
                dispatch('setLoader', {form: true}, { root: true })
                const response = await axios.post(`${rootGetters.apiUrl}/confirm-new-password`,
                    {
                        resetPasswordId: resetId
                    })
                commit('setPasswordConfirmedStatus', response.data.status)
                dispatch('setLoader', {form: false}, { root: true })
                setTimeout(()=>{
                    router.push({name:'AuthLoginView'})
                    location.reload()
                },2000)
            }catch (e) {
                commit('setPasswordConfirmationErrors', e.response.data.errors)
                dispatch('setLoader', {form: false}, { root: true })
            }
        },

        async removeUser({dispatch, state, rootGetters}){
            localStorage.clear()
            try{
                dispatch('setLoader', {form: true}, { root: true })
                const response = await axios.delete(`${rootGetters.apiUrl}/users`,
                    {headers: {
                        'Authorization': `Bearer ${state.user.token}`
                    }}
                )
                window.location.reload()
            }catch (e) {
                console.log(e)
            }
        }
    }
}