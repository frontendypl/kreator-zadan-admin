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
        <button class="btn btn-danger text-light ms-2">
          usuń
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "ExercisesLists",
  props: {
    exercisesLists: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['frontUrl'])
  }
}
</script>