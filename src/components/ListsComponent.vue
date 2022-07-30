<template>
  <div class="c-ListsComponent">
    <div class="row justify-content-between border-bottom"
      v-for="(list,i) in exercisesLists"
         :key="i"
    >
      <div class="col-auto align-self-center fs-3">
        <router-link class="text-decoration-none text-dark"
                     :to="{name: 'ExerciseListView', params: {listId: list._id}}"
        >
          <b>{{++i}}. {{list.name}}</b>
        </router-link>

      </div>
      <div class="col-auto">
        <!--    TODO      jako link do gry z tym kodem-->
        <a class="btn btn-info text-light ms-2"
           target="_blank"
          :href="`${frontUrl}/#/${list.shortCode}`"
        >
          kod: {{list.shortCode}}
        </a>
        <router-link class="btn btn-primary text-light ms-2"
          :to="{name: 'ExerciseListView', params: {listId: list._id}}"
        >
          edytuj
        </router-link>
        <button class="btn btn-danger text-light ms-2"
          @click="deleteExercisesList(list._id)"
        >
          usuń
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapState} from "vuex";
import axios from "axios";

export default {
  name: "ListsComponent",
  props: {
    exercisesLists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
    }),
    ...mapGetters(['frontUrl', 'apiUrl'])
  },
  methods: {
    ...mapActions({
      setLoader: 'setLoader',
      getExercisesLists: 'listModule/getExercisesLists'
    }),
   async deleteExercisesList(id){
     this.setLoader({list: true})
      try{
        const response = await axios.delete(`${this.apiUrl}/lists/${id}`,
            {headers: {
                'Authorization': `Bearer ${this.user.token}`
              }}
        )
        await this.getExercisesLists()
      }catch (e){
        console.log(e)
        this.setLoader({list: false})
      }

    }
  }
}
</script>