<template>
  <div id="app" class="d-flex flex-column min-vh-100">
<!--    <PWAPrompt />-->
    <UserRemoveModalComponent
        @removeUser="removeUser"
        @cancel="deleteUserModal = false"
        v-show="deleteUserModal"
    />

    <AppNavbarComponent
        @logOut="logOut"
        @showDeleteUserModel="deleteUserModal = true"
        :user="user"
        :backPathObject="backPathObject"
    />

    <AppLoaderComponent v-if="loaderActive" />

    <router-view/>

    <AppFooterComponent />

  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from 'vuex'
import AppLoaderComponent from "@/components/AppLoaderComponent";
import AppNavbarComponent from "@/components/AppNavbarComponent";
import PWAPrompt from "@/components/PWAPrompt";
import AppFooterComponent from "@/components/AppFooterComponent";
import UserRemoveModalComponent from "@/components/UserRemoveModalComponent";

export default {
  name: 'App',
  components:
      {
        UserRemoveModalComponent,
        AppFooterComponent,
        // PWAPrompt,
        AppNavbarComponent,
        AppLoaderComponent
      },
  data(){
    return {
      deleteUserModal: false
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
    }),
    initYoutube(){
      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
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
    this.initYoutube()
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

.c-AppFooterComponent{
  margin-top: auto;
}

.modal {
  z-index: 3;
}

</style>
