<template>
  <div class="c-ListFormComponent">
    <form class="mb-4" @submit.prevent="createNewExerciseList">

      <div class="row g-1">
        <div class="col col-md-4">
          <input class="form-control fs-2 mb-2" placeholder="Nowa lista zadań" type="text"
                 :class="{'border-danger':Object.keys(createNewExerciseListErrors).length}"
                 v-model="newListName"
          >
        </div>
        <div class="col-auto">
          <button class="btn btn-primary text-light fs-2">
            Dodaj
          </button>
        </div>
        <h4 class="text-danger"
            v-for="(error, key, i) in createNewExerciseListErrors"
            :key="i"
        >
          {{error.message}}
        </h4>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions} from "vuex";
import axios from "axios";
import router from "@/router";

export default {
  name: 'ListFormComponent',
  data(){
    return {
    }
  },
  computed: {
    ...mapState({
      createNewExerciseListErrors: state=>state.listModule.createNewExerciseListErrors
    }),
    newListName: {
      get(){
        return this.$store.state.listModule.newListName
      },
      set(name){
        this.setNewListName(name)
      }
    },
  },
  methods: {
    ...mapActions({
      setNewListName: 'listModule/setNewListName',
      createNewExerciseList: 'listModule/createNewExerciseList',
    }),
  },
}
</script>

<style lang="scss">

</style>