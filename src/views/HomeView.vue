<template>
  <div class="v-HomeView w-100 mt-5">
    <div class="container">

      <h4 class="mb-3">Witaj, <b>{{ user.email }}</b>, stwórz pierwsze zadania !</h4>

      <ListForm/>

<!--      TODO zrobić komponent listy, przekazac do niego propsami-->
      <div class="row justify-content-between border-bottom">
        <div class="col-auto align-self-center fs-3">
          <b>1. Geometria</b>
        </div>
        <div class="col-auto">
          <!--    TODO      jako link do gry z tym kodem-->
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
<!--      TODO-->


    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ListForm from "@/components/ListForm";

export default {
  name: "HomeView",
  components: {ListForm},
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