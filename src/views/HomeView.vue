<template>
  <div class="v-HomeView w-100 mt-5">
    <div class="container">

      <h4 class="mb-3">Witaj, <b>{{ user.email }}</b>, stwórz pierwsze zadania !</h4>

      <ListFormComponent/>

<!--      TODO zrobić komponent listy, przekazac do niego propsami-->
      <ListsComponent :exercisesLists="exercisesLists"/>
<!--      TODO-->


    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import ListFormComponent from "@/components/ListFormComponent";
import ListsComponent from "@/components/ListsComponent";

export default {
  name: "HomeView",
  components: {ListsComponent, ListFormComponent},
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