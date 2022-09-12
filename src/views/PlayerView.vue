<template>
  <div class="v-PlayerView">
    <h4 class="mb-3" v-if="playerData"><b>{{playerData.name}} </b>, {{activeList.name}}</h4>
    <AnswersComponent :answers="playerAnswers" :userImages="userImages"/>
  </div>
</template>

<script>
import AnswersComponent from "@/components/AnswersComponent";
import {mapActions, mapGetters, mapState} from "vuex";
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
      players: state => state.playerModule.players,
      ...mapGetters({
        activeList: 'listModule/activeList'
      }),
      playerAnswers(){
        return this.answers.filter(answer=>answer.player._id === this.$route.params.playerId)
      },
      playerData(){
        return this.players.find(player=>player._id === this.$route.params.playerId)
      }
    })
  },
  methods: {
    ...mapActions({
      setBackPathObject: 'setBackPathObject',
      getAnswers: 'answerModule/getAnswers',
      getPlayers: 'playerModule/getPlayers'
    }),

  },
  created(){
    this.getAnswers()
    if(!this.players.length){
      this.getPlayers()
    }
  },
  mounted(){
    this.setBackPathObject({name: 'ListView', params: {listId: this.listId}})
    this.interval = setInterval(()=>{
      this.getAnswers()
    },3000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>