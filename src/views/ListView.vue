<template>
  <div class="v-ListDetailsView w-100">
    <div class="container" v-if="activeList">

      <div class="row gx-5 gy-2 my-5 justify-content-between">
        <div class="col-12 col-sm-4 mb-3 text-center" title="Ten kod udostępnij uczniom. Kliknij by przejść do zadań z tej listy.">
          <div class="row">
            <div class="col-12">
              <a :href="`${frontUrl}/#/${activeList.shortCode}`" class="btn btn-dark btn-lg fs-1" target="_blank">{{activeList.shortCode}}</a>
            </div>
            <div class="col-12">
              <b>Kod dostepu do zadań z tej listy.</b>
            </div>
            <div class="col-12">
              <span>Udostępnij swoim uczniom.</span>
            </div>
            <div class="col-12">
              <span class="text-danger">Kliknij i sprawdź.</span>
            </div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <ListUpdateFormComponent />
        </div>
      </div>

      <div class="row my-5">
        <div class="col">

          <div class="col">
            <ExercisesComponent
                :exercises="exercises"
                :userImages="userImages"
                @switchExercise="switchExercise"

            >
              <router-link class="btn btn-success btn-lg" :to="{name: 'ExerciseView'}">
                Stwórz nowe zadanie
              </router-link>
            </ExercisesComponent>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col">
          <PlayersComponent
              :activeList="activeList"
              :players="players"
              :answers="answers"
              :exercises="activeExercises"
              :frontUrl="frontUrl"
              @deletePlayer="deletePlayer"

          />
        </div>
      </div>
      <div class="row my-5">
        <div class="col-12">
          <AnswersComponent
              :answers="answers"
              :userImages="userImages"

          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import axios from "axios";
import PlayersComponent from "@/components/PlayersComponent";
import ExercisesComponent from "@/components/ExercisesComponent";
import ListUpdateFormComponent from "@/components/ListUpdateFormComponent";
import AnswersComponent from "@/components/AnswersComponent";

//TODO get players and other data every few seconds ???

export default {
  name: 'ListView',
  components: {AnswersComponent, ListUpdateFormComponent, PlayersComponent, ExercisesComponent},
  data(){
    return {
      interval: null,
    }
  },
  computed: {
    ...mapState({
      user: state=>state.user,
      exercisesLists: state=>state.listModule.exercisesLists,
      listId: state=>state.listModule.listId,
      exercises: state=>state.exerciseModule.exercises,
      players: state=>state.playerModule.players,
      answers: state=>state.answerModule.answers,
      userImages: state => state.imageModule.userImages,
    }),
    ...mapGetters({
      apiUrl: 'apiUrl',
      frontUrl: 'frontUrl',
      activeExercises: 'exerciseModule/activeExercises',
      activeList: 'listModule/activeList'
    }),
    // activeList(){
    //   return this.exercisesLists.filter(list=>list._id === this.listId)[0]
    // }
  },
  methods: {
    ...mapActions({
      switchExercise: 'exerciseModule/switchExercise',
      setListId: 'listModule/setListId',
      setUpdateExerciseListErrors: 'listModule/setUpdateExerciseListErrors',
      getExercises: 'exerciseModule/getExercises',
      getPlayers: 'playerModule/getPlayers',
      deletePlayer: 'playerModule/deletePlayer',
      getAnswers: 'answerModule/getAnswers',
      getImages: 'imageModule/getImages',
      setBackPathObject: 'setBackPathObject'
    }),

  },
  created(){
    // this.getImages()
    // this.setListId(this.$route.params['listId'])
    // console.log(this.exercisesLists)
    // if(this.exercisesLists.length){
    //   this.$router.push({name: 'Home'})
    // }

    this.getPlayers()
    this.getExercises()
    this.getAnswers()
  },
  mounted(){
    this.setBackPathObject({name: 'home', params: {}})
    this.interval = setInterval(()=>{
      this.getPlayers()
      this.getAnswers()
    },3000)
  },
  beforeDestroy() {
    this.setUpdateExerciseListErrors({})
    clearInterval(this.interval)
  }
}
</script>