<template>
  <div class="v-AuthLoginView w-100 my-auto">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="mx-auto" @submit.prevent="logIn">
            <div class="row">
              <div class="col">
                <h1>Zaloguj się:</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="text"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': loginFormErrors.email}"
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
                    :class="{'border-danger border-3': loginFormErrors.password}"
                    placeholder="Hasło"
                    v-model="password"
                >
              </div>
            </div>
             <div class="row">
              <div class="col">
                <button class="btn btn-primary text-light btn-lg w-100">
                  <i class="bi bi-check fs-1"></i>
                </button>
                <h2
                    class="text-danger"
                    v-for="(error, key, i) in loginFormErrors"
                    :key="i">
                  {{error.message}}
                </h2>
                <h4>Nie masz konta? <router-link :to="{name:'AuthRegisterView'}">Zarejestruj się</router-link></h4>
                <h6>
                  <router-link :to="{name:'AuthResetPasswordView'}">Zapomniałem hasła</router-link>
                </h6>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from 'vuex'
import axios from 'axios'

export default {
  name: "AuthLoginView",
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      loginUserForm: state=>state.userModule.loginUserForm,
      loginFormErrors: state => state.userModule.loginFormErrors
    }),
    ...mapGetters(['apiUrl']),
    email: {
      get(){
        return this.loginUserForm.email
      },
      set(email){
        this.setLoginUserForm({email})
      }
    },
    password: {
      get(){
        return this.loginUserForm.password
      },
      set(password){
        this.setLoginUserForm({password})
      }
    }

  },
  methods: {
    ...mapActions({
      setLoginUserForm: 'userModule/setLoginUserForm',
      logIn: 'userModule/logIn',
      setBackPathObject: 'setBackPathObject'
    }),
  },
  mounted(){
    this.setBackPathObject({})
  }
}
</script>