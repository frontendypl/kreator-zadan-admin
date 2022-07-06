<template>
  <div class="v-HomeView w-100 mt-5">
    <div class="container">

      <h4 class="mb-3">Witaj, <b>{{ user.email }}</b>, stwórz pierwsze zadania !</h4>

      <ExercisesListForm/>

<!--      TODO zrobić komponent listy, przekazac do niego propsami-->
      <ExercisesLists :exercisesLists="exercisesLists"/>
<!--      TODO-->


    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ExercisesListForm from "@/components/ExercisesListForm";
import ExercisesLists from "@/components/ExercisesLists";

export default {
  name: "HomeView",
  components: {ExercisesLists, ExercisesListForm},
  data(){
    return{

    }
  },
  computed: {
    ...mapState(['user', 'exercisesLists'])
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
    background-color: #0a58ca08;
  }
</style>