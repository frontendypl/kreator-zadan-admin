<template>
  <div class="v-ListDetailsView w-100 mt-5">
    <div class="container">

      <div class="row gx-5">
        <div class="col">
          <ListUpdateFormComponent />
        </div>
        <div class="col-auto">
          <a :href="`${frontUrl}/#/${activeList.shortCode}`" class="btn btn-dark" target="_blank">{{activeList.shortCode}}</a>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <h3>Zadania</h3>
          <router-link class="btn btn-success btn-lg" :to="{name: 'ExerciseCreateView'}">
            Stwórz nowe zadanie
          </router-link>
          <div class="col">
            <ExercisesComponent :exercises="exercises" @deleteExercise="deleteExercise" />
          </div>
        </div>

        <div class="col">
          <PlayersComponent :players="players" @deletePlayer="deletePlayer"/>
        </div>
      </div>
      <div class="row">
        <div class="col-auto">
          <AnswersComponent :answers="answers"/>
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
      answers: []
    }
  },
  computed: {
    ...mapState({
      user: state=>state.user,
      exercisesLists: state=>state.listModule.exercisesLists,
      listId: state=>state.listModule.listId,
      exercises: state=>state.exerciseModule.exercises,
      players: state=>state.playerModule.players
      // answers
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
      getExercises: 'exerciseModule/getExercises',
      getPlayers: 'playerModule/getPlayers',
      deletePlayer: 'playerModule/deletePlayer',

    }),

    async getAnswers(){ //przeniesc do answerModule
      try{
        const response = await axios.get(`${this.apiUrl}/lists/${this.listId}/answers`)
        this.answers = response.data
      }catch (e) {

      }
    }

  },
  created(){
    this.setListId(this.$route.params['listId'])
    this.getPlayers()
    this.getExercises()

  },
  mounted(){
    this.interval = setInterval(()=>{
      // this.getPlayers()
      // this.getAnswers()
    },5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>