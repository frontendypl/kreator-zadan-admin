<template>
  <nav class="c-AppNavbarComponent navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container">
<!--      <router-link class="navbar-brand" :to="{name: 'home'}">Start</router-link>-->
      <div class="logo written-font me-5" v-if="screenWidth>600 && !user._id">
        <a class="logo__link link-light text-decoration-none" href="https://ucze.net">ucze.net</a>
      </div>
      <router-link class="btn btn-outline-light me-auto"
        :to="backPathObject"
        v-if="backPathObject.name"
      >
        Cofnij
      </router-link>

      <div class="ms-auto">
        <button
            class="btn btn-info text-white me-3"
            @click="$emit('logOut')"
            v-if="user._id"
        >
          Wyloguj się
        </button>
        <button
            class="btn btn-danger"
            @click="$emit('removeUser')"
            v-if="user._id"
        >
          Usuń Konto
        </button>
      </div>
      <router-link
          class="btn btn-success"
          :to="{name: 'AuthLoginView'}"
          v-if="!user._id && $route.name !== 'AuthRegisterView' && $route.name !== 'AuthLoginView' "
      >
        Zaloguj się
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppNavbarComponent',
  props: {
    user: {
      type: Object,
      required: true
    },
    backPathObject: {
      type: Object,
      required: true
    }
  },
  computed: {
    screenWidth(){
      return window.outerWidth
    }
  }
}
</script>

<style lang="scss" scoped>
.c-AppNavbarComponent {

  .logo{
    &__link {
      font-size: 2em;
    }
  }
}
</style>