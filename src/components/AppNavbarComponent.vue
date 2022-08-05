<template>
  <nav class="c-AppNavbarComponent navbar navbar-expand-lg navbar-dark bg-dark mb-3">
    <div class="container-fluid">
<!--      <router-link class="navbar-brand" :to="{name: 'home'}">Start</router-link>-->
      <router-link class="btn btn-outline-light me-auto ms-5"
        :to="backPathObject"
      >
        Cofnij
      </router-link>

      <button
          class="btn btn-danger"
          @click="$emit('logOut')"
          v-if="user._id"
      >
        Wyloguj się
      </button>
      <router-link
          class="btn btn-success"
          :to="{name: 'AuthLoginView'}"
          v-else
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
  }
}
</script>

