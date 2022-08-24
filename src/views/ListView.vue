<template>
  <div class="v-ListDetailsView w-100 mt-5">
    <div class="container">

      <div class="row gx-5 my-5">
        <div class="col">
          <ListUpdateFormComponent />
        </div>
        <div class="col-auto">
          <a :href="`${frontUrl}/#/${activeList.shortCode}`" class="btn btn-dark" target="_blank">{{activeList.shortCode}}</a>
        </div>
      </div>

      <div class="row my-5">
        <div class="col">

          <div class="col">
            <ExercisesComponent :exercises="exercises" :userImages="userImages"  @deleteExercise="deleteExercise" >
              <router-link class="btn btn-success btn-lg" :to="{name: 'ExerciseCreateView'}">
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
              :exercises="exercises"
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
  name: 'ListDetailsView',
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
    ...mapGetters(['apiUrl','frontUrl']),
    activeList(){
      return this.exercisesLists.filter(list=>list._id === this.listId)[0]
    }
  },
  methods: {
    ...mapActions({
      deleteExercise: 'exerciseModule/deleteExercise',
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
    this.getPlayers()
    this.getExercises()
    this.getAnswers()
  },
  mounted(){
    this.setBackPathObject({name: 'home', params: {}})
    this.interval = setInterval(()=>{
      this.getPlayers()
      this.getAnswers()
    },5000)
  },
  beforeDestroy() {
    this.setUpdateExerciseListErrors({})
    clearInterval(this.interval)
  }
}
</script>