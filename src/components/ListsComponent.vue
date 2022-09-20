<template>
  <div class="c-ListsComponent">
    <div class="row justify-content-between border-bottom mb-2"
      v-for="(list,i) in exercisesLists"
         :key="i"
    >
      <div class="col-auto align-self-center fs-3">
        <router-link class="text-decoration-none text-dark"
                     :to="{name: 'ListView', params: {listId: list._id}}"
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
<!--        <router-link class="btn btn-primary text-light ms-2"-->
<!--          :to="{name: 'ListView', params: {listId: list._id}}"-->
<!--        >-->
<!--          edytuj-->
<!--        </router-link>-->
        <button class="btn btn-danger text-light ms-2"
          @click="deleteExercisesList(list._id)"
        >
          usuń
        </button>
      </div>
      <div class="col-12 mt-1">
        <p>
          <router-link class="text-decoration-none text-dark"
                       :to="{name: 'ListView', params: {listId: list._id}}"
          >
            Kliknij by zobaczyć zadania, uczniów i odpowiedzi dla tej listy zadań !
          </router-link>
        </p>
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
    ...mapGetters(['frontUrl'])
  },
  methods: {
    ...mapActions({
      setLoader: 'setLoader',
      getExercisesLists: 'listModule/getExercisesLists',
      deleteExercisesList: 'listModule/deleteExercisesList'
    }),

  }
}
</script>