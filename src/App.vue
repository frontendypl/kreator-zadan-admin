<template>
  <div id="app" class="d-flex flex-column min-vh-100">

    <AppLoaderComponent v-if="loaderActive" />

    <header>
      <button @click="logOut">wyloguj</button>
    </header>

    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import AppLoaderComponent from "@/components/AppLoaderComponent";

export default {
  name: 'App',
  components: {AppLoaderComponent},
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['loaderActive'])
  },
  methods: {
    ...mapActions(['setUser', 'logOut', 'getExercisesLists'])
  },
  watch: {
    user: {
      handler(newValue, oldValue){
        if(newValue.token !== oldValue.token){
          if(newValue.token === ''){
            this.$router.push({name:'AuthLoginView'})
          }else{
            if(this.$route.path === '/logowanie' || this.$route.path === '/rejestracja'){
              this.$router.push({name:'home'})
            }
            this.getExercisesLists()
          }
        }
      },
      deep: true
    }
  },
  created(){
    const userStored = localStorage.getItem('user')
    if(userStored){
      this.setUser(JSON.parse(userStored))
    }
  },
  mounted(){

  }
}
</script>

<style lang="scss">
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

body {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}
</style>
