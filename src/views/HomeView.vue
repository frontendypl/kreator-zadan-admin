<template>
  <div class="v-HomeView w-100 mt-3">
    <div class="container">

      <div class="row align-items-center mb-4 gy-4">
        <div class="col-12 fs-3">
          Witaj, <b>{{ user.email }}</b><span v-if="!exercisesLists.length">, stwórz pierwsze zadania !</span>
        </div>
        <div class="col-12 text-center">
          <div class="row">
            <div class="col-12">
              <a :href="`${frontUrl}/#/${user.shortCode}/listy-zadan`"
                 class="btn btn-dark fs-1"
                 target="_blank"
                 title="Ten kod możesz udostępnić uczniom. Kliknij by podejrzeć."
              >
                {{user.shortCode}}
              </a>
            </div>
            <div class="col-12">
              <b>Kod dostepu.</b>
            </div>
            <div class="col-12">
              <span>Zawiera dostęp do wszystkich materiałów.</span>
            </div>
            <div class="col-12">
              <span>Kliknij i sprawdź.</span>
            </div>
          </div>
        </div>
      </div>


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