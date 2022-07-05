<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'App',
  data(){
    return {

    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {

  },
  watch: {
    user: {
      handler(newValue, oldValue){
        if(newValue.token !== oldValue.token){
          this.$router.push({name:'home'})
        }
      },
      deep: true
    }
  },
  created(){

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
