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
        </div>
        <div class="col">
          <PlayersListComponent :players="players" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import axios from "axios";
import PlayersListComponent from "@/components/PlayersList";
import ListUpdateFormComponent from "@/components/ListUpdateFormComponent";

//TODO get players and other data every few seconds ???

export default {
  name: 'ListDetailsView',
  components: {ListUpdateFormComponent, PlayersListComponent},
  data(){
    return {
      players: []
    }
  },
  computed: {
    ...mapState(['user','exercisesLists']),
    ...mapGetters(['apiUrl','frontUrl']),
    listId(){
      return this.$route.params['listId']
    },
    activeList(){
      return this.exercisesLists.filter(list=>list._id === this.listId)[0]
    }
  },
  methods: {
    /**
     * get data by listId (players and exercises lists)
     */
    async getPlayers(){
      try{
        const response = await axios.get(
            `${this.apiUrl}/lists/${this.listId}`,
            {
              headers: {
                'Authorization': `Bearer ${this.user.token}`
              }
            }
        )
        this.players = response.data
      }catch (e) {
        console.log(e)
      }
    }
  },
  created(){

  },
  mounted(){
    this.getPlayers()
  }
}
</script>