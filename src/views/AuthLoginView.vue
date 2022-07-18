<template>
  <div class="v-AuthLoginView w-100 my-auto">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form class="mx-auto" @submit.prevent="handleForm">
            <div class="row">
              <div class="col">
                <h1>Zaloguj się:</h1>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="text" class="form-control form-control-lg w-100 fs-1 mb-2" placeholder="Email"
                       v-model="user.email"
                >
              </div>
            </div>
            <div class="row">
              <div class="col">
                <input type="password" class="form-control form-control-lg w-100 fs-1 mb-2" placeholder="Hasło"
                       v-model="user.password"
                >
              </div>
            </div>
             <div class="row">
              <div class="col">
                <button class="btn btn-primary text-light btn-lg w-100">
                  <i class="bi bi-check fs-1"></i>
                </button>
                <h2 v-for="(error, key, i) in errors" :key="i" :data-test="i">{{error.message}}</h2>
                <h4>Nie masz konta? <router-link :to="{name:'AuthRegisterView'}">Zarejestruj się</router-link></h4>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import axios from 'axios'

export default {
  name: "AuthLoginView",
  data(){
    return {
      user: {
        email: '',
        password: '',
      },
      errors: {
        required: {
          message: ''
        }
      }
    }
  },
  computed: {
    ...mapGetters(['apiUrl'])
  },
  methods: {
    ...mapActions(['setUser', 'setLoader']),
    /**
     *
     */
    validation(){
      this.errors = {
        required: {
          message: ''
        }
      }
      if(!this.user.email || !this.user.password){
        this.errors.required.message = 'Uzupełnij wszystkie pola'
        return false
      }

      return true
    },
    /**
     *
     */
    async handleForm(){

      if(!this.validation()) return false

      try{
        this.setLoader({form: true})
        const response = await axios.post(`${this.apiUrl}/users/login`, this.user)
        this.setUser({...response.data.user, token: response.data.token})
        this.setLoader({form: false})
      }catch (e) {
        console.log({e})
        this.errors = e.response.data.errors
        this.setLoader({form: false})
      }

    }
  }
}
</script>