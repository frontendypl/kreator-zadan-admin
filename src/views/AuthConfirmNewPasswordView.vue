<template>
  <div class="v-AuthLoginView w-100 my-auto">
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h2 v-if="passwordConfirmed">
            Hasło zostało zmienione.
            <router-link :to="{name:'AuthLoginView'}">Zaloguj się</router-link>
          </h2>
          <h2 v-if="passwordConfirmationErrors.status">
            Coś poszło nie tak.
            <router-link :to="{name:'AuthLoginView'}">Zaloguj się</router-link>
          </h2>
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
      passwordConfirmed: state=>state.userModule.passwordConfirmed,
      passwordConfirmationErrors: state => state.userModule.passwordConfirmationErrors
    }),
    ...mapGetters(['apiUrl']),
  },
  methods: {
    ...mapActions({
      confirmNewPassword: 'userModule/confirmNewPassword',
      // logIn: 'userModule/logIn',
      // setBackPathObject: 'setBackPathObject'
    }),
  },
  mounted(){
    this.confirmNewPassword(this.$route.params.id)
  }
}
</script>