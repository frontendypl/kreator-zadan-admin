<template>
  <div class="c-ListUpdateFormComponent">
    <form class="mb-4" @submit.prevent="handleFormRenameList">

      <div class="row g-1">
        <div class="col">
          <input class="form-control fs-3 mb-2" placeholder="Nazwa np: zwierzęta" type="text"
                 v-model="listName"
          >
        </div>
        <div class="col-auto">
          <button class="btn btn-primary text-light fs-3">
            zmień nazwę
          </button>
        </div>
        <h4 v-for="(error, key, i) in errors" :key="i">{{error.message}}</h4>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import axios from "axios";

export default {
  name: 'ListUpdateNameComponent',
  data(){
    return {
      listName: '',
      errors: {},
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
    ...mapActions(['getExercisesLists']),
    /**
     * update List name, if success call store method getExercisesLists to get live data
     */
    async handleFormRenameList(){
      try{
        const response = await axios.patch(
            `${this.apiUrl}/lists/${this.listId}`,
            {name: this.listName},
            {headers: {
                'Authorization': `Bearer ${this.user.token}`
              }}
        )
        await this.getExercisesLists()
      }catch (e) {
        this.errors = {...e.response.data.errors}
      }
    },
  },
  created(){
    this.listName = this.activeList.name
  }
}
</script>