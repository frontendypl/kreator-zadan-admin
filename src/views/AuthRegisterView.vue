<template>
  <div class="v-AuthRegisterView w-100 my-auto">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="mx-auto" @submit.prevent="registerUser">
            <div class="row">
              <div class="col">
                <h1>Stwórz konto:</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="text"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': registerFormErrors.email}"
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
                    :class="{'border-danger border-3': registerFormErrors.password}"
                    placeholder="Hasło"
                    v-model="password"
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input
                    type="password"
                    class="form-control form-control-lg w-100 fs-1 mb-2"
                    :class="{'border-danger border-3': registerFormErrors.repeatPassword}"
                    placeholder="Powtórz hasło"
                    v-model="repeatPassword"
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
                    v-for="(error, key, i) in registerFormErrors"
                    :key="i">
                  {{error.message}}
                </h2>
                <h4>Masz już konto? <router-link :to="{name:'AuthLoginView'}">Zaloguj się</router-link></h4>
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
  name: "AuthRegisterView",
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      registerUserForm: state=>state.userModule.registerUserForm,
      registerFormErrors: state => state.userModule.registerFormErrors
    }),
    ...mapGetters(['apiUrl']),
    email: {
      get(){
        return this.registerUserForm.email
      },
      set(email){
        this.setRegisterUserForm({email})
      }
    },
    password: {
      get(){
        return this.registerUserForm.password
      },
      set(password){
        this.setRegisterUserForm({password})
      }
    },
    repeatPassword: {
        get(){
          return this.registerUserForm.repeatPassword
        },
        set(repeatPassword){
          this.setRegisterUserForm({repeatPassword })
        }
    }
  },
  methods: {
    ...mapActions({
      setRegisterUserForm: 'userModule/setRegisterUserForm',
      registerUser: 'userModule/registerUser',
    }),
  }
}
</script>