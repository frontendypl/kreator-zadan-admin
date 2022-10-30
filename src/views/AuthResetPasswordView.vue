<template>
  <div class="v-AuthResetPasswordView w-100 my-auto">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="mx-auto" @submit.prevent="resetPassword" v-if="!resetPasswordConfirmation">
            <div class="row mb-3">
              <div class="col">
                <h1>Zmień hasło</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="text"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': resetPasswordErrors.email}"
                    placeholder="Email"
                    v-model="email"
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="password"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': resetPasswordErrors.password}"
                    placeholder="Nowe hasło"
                    v-model="password"
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="password"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': resetPasswordErrors.repeatPassword}"
                    placeholder="Powtórz nowe hasło"
                    v-model="repeatPassword"
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button class="btn btn-primary text-light btn-lg w-100 mb-3">
                  <i class="bi bi-check fs-1"></i>
                </button>
                <h3
                    class="text-danger"
                    v-for="(error, key, i) in resetPasswordErrors"
                    :key="i">
                  {{error.message}}
                </h3>
                <h4>Wróć do <router-link :to="{name:'AuthLoginView'}">logowania</router-link></h4>
                <h4>Nie masz konta? <router-link :to="{name:'AuthRegisterView'}">Zarejestruj się</router-link></h4>
              </div>
            </div>
          </form>
          <h2 v-else>
            {{resetPasswordConfirmation}}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import axios from 'axios'

// TODO:
//  - create object in store instead registerUserForm, registerFormErrors
// - link by v-model to store's object

export default {
  name: "AuthResetPasswordView",
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      resetPasswordForm: state=>state.userModule.resetPasswordForm,
      resetPasswordErrors: state => state.userModule.resetPasswordErrors,
      resetPasswordConfirmation: state => state.userModule.resetPasswordConfirmation,
    }),
    ...mapGetters(['apiUrl']),
    email: {
      get(){
        return this.resetPasswordForm.email
      },
      set(email){
        this.setResetPasswordForm({email})
      }
    },
    password: {
      get(){
        return this.resetPasswordForm.password
      },
      set(password){
        this.setResetPasswordForm({password})
      }
    },
    repeatPassword: {
        get(){
          return this.resetPasswordForm.repeatPassword
        },
        set(repeatPassword){
          this.setResetPasswordForm({repeatPassword })
        }
    }
  },
  methods: {
    ...mapActions({
      setResetPasswordForm: 'userModule/setResetPasswordForm',
      resetPassword: 'userModule/resetPassword',
      setBackPathObject: 'setBackPathObject'
    }),
  },
  mounted(){
    this.setBackPathObject({name: 'AuthLoginView'})
  }
}
</script>