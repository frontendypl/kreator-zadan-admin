<template>
  <div class="v-HomeView w-100 mt-5">
    <div class="container">

      <h4 class="mb-3">
        Witaj, <b>{{ user.email }}</b>, stwórz pierwsze zadania !
        <a :href="`${frontUrl}/#/${user.shortCode}/listy-zadan`"
           class="btn btn-dark"
           target="_blank"
           title="Ten kod możesz udostępnić uczniom. Kliknij by podejrzeć."
        >
          {{user.shortCode}}
        </a>
      </h4>

      <ListFormComponent />

<!--      TODO zrobić komponent listy, przekazac do niego propsami-->
      <ListsComponent :exercisesLists="exercisesLists"/>
<!--      TODO-->


    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
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
    ...mapState({
      user: state => state.userModule.user,
      exercisesLists: state=>state.listModule.exercisesLists
    }),
    ...mapGetters(['frontUrl']),
  },
  methods: {
    ...mapActions(['setLoader', 'setBackPathObject']),
    handleForm(){

    }
  },
  created(){

  },
  mounted(){
    this.setBackPathObject({})
  }
}
</script>

<style lang="scss">
  body{
    background-image: none;
    background-color: #0a58ca08;
  }
</style>