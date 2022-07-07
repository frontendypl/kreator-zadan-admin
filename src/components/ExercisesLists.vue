<template>
  <div class="c-ExercisesLists">
    <div class="row justify-content-between border-bottom"
      v-for="(list,i) in exercisesLists"
         :key="i"
    >
      <div class="col-auto align-self-center fs-3">
        <b>{{i}}. {{list.name}}</b>
      </div>
      <div class="col-auto">
        <!--    TODO      jako link do gry z tym kodem-->
        <a class="btn btn-info text-light ms-2"
           target="_blank"
          :href="`${frontUrl}/#/${list._id}`"
        >
          kod: {{list._id}}
        </a>
        <button class="btn btn-primary text-light ms-2">
          edytuj
        </button>
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
  name: "ExercisesLists",
  props: {
    exercisesLists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapState(['user']),
    ...mapGetters(['frontUrl', 'apiUrl'])
  },
  methods: {
    ...mapActions(['getExercisesLists']),

   async deleteExercisesList(id){
      try{
        const response = await axios.delete(`${this.apiUrl}/lists/${id}`,
            {headers: {
                'Authorization': `Bearer ${this.user.token}`
              }}
        )
        await this.getExercisesLists()
      }catch (e){
        console.log(e)
      }

    }
  }
}
</script>