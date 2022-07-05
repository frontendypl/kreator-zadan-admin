<template>
  <div class="v-HomeView w-100 mt-5">
    <div class="container">
      <h4 class="mb-3">Witaj, <b>{{ user.email }}</b>, stwórz pierwsze zadania !</h4>
      <form class="mb-5" @submit.prevent="handleForm">

        <div class="row g-1">
          <div class="col col-md-4">
            <input class="form-control fs-3 mb-2" placeholder="Nowa lista zadań" type="text"
            >
          </div>
          <div class="col-auto">
            <button class="btn btn-primary text-light fs-3">
              +
            </button>
          </div>

        </div>
      </form>

      <div class="row justify-content-between">
        <div class="col-auto align-self-center fs-3">
          <b>1. Geometria</b>
        </div>
        <div class="col-auto">
          <button class="btn btn-info text-light ms-2">
            kod: 324df
          </button>
          <button class="btn btn-primary text-light ms-2">
            edytuj
          </button>
          <button class="btn btn-danger text-light ms-2">
            usuń
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "HomeView",
  data(){
    return{

    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    handleForm(){

    }
  },
  created(){

  },
  mounted(){

  }
}
</script>

<style lang="scss">
  body{
    background-image: none;
    background-color: antiquewhite;
  }
</style>