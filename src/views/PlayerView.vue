<template>
  <div class="v-PlayerView">
    Player View:
    <AnswersComponent :answers="playerAnswers" :userImages="userImages"/>
  </div>
</template>

<script>
import AnswersComponent from "@/components/AnswersComponent";
import {mapActions, mapState} from "vuex";
export default {
  name: 'PlayerView',
  components: {AnswersComponent},
  data(){
    return {
      interval: null,
    }
  },
  computed: {
    ...mapState({
      listId: state => state.listModule.listId,
      answers: state=>state.answerModule.answers,
      userImages: state => state.imageModule.userImages,
      playerAnswers(){
        return this.answers.filter(answer=>answer.player._id === this.$route.params.playerId)
      }
    })
  },
  methods: {
    ...mapActions({
      setBackPathObject: 'setBackPathObject',
      getAnswers: 'answerModule/getAnswers',
    }),

  },
  created(){
    this.getAnswers()
  },
  mounted(){
    this.setBackPathObject({name: 'ExerciseListView', params: {listId: this.listId}})
    this.interval = setInterval(()=>{
      this.getAnswers()
    },5000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>