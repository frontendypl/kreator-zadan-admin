<template>
  <div id="app" class="d-flex flex-column min-vh-100">
<!--    <PWAPrompt />-->
    <AppNavbarComponent @logOut="logOut" @removeUser="removeUser" :user="user" :backPathObject="backPathObject"/>

    <AppLoaderComponent v-if="loaderActive" />

    <router-view/>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import AppLoaderComponent from "@/components/AppLoaderComponent";
import AppNavbarComponent from "@/components/AppNavbarComponent";
import PWAPrompt from "@/components/PWAPrompt";

export default {
  name: 'App',
  components:
      {
        // PWAPrompt,
        AppNavbarComponent,
        AppLoaderComponent
      },
  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
      backPathObject: state=>state.backPathObject
    }),
    ...mapGetters(['loaderActive']),
    listIdRouterParam(){
      return this.$route.params['listId'] || ''
    }
  },
  methods: {
    ...mapActions({
      setUser: 'userModule/setUser',
      logOut: 'userModule/logOut',
      removeUser: 'userModule/removeUser',
      getExercisesLists: 'listModule/getExercisesLists',
      setListId: 'listModule/setListId',
      getImages: 'imageModule/getImages'
    })
  },
  watch: {
    user: {
      handler(newValue, oldValue){
        this.getImages()
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
    },
    listIdRouterParam(){
      this.setListId(this.$route.params['listId'])
    }
  },
  created(){
    const userStored = localStorage.getItem('user')
    if(userStored){
      this.setUser(JSON.parse(userStored))
    }

    this.setListId(this.$route.params['listId'])
  },
  mounted(){

  }
}
</script>

<style lang="scss">
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

html {
  @media (max-width: 330px) {
    font-size: 12px;
  }
  @media (max-width: 440px) {
    font-size: 14px;
  }
}

body {
  background-image: url("@/assets/images/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh;
}

.written-font{
  font-family: 'element';
}

</style>
