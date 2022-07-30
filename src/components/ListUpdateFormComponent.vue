<template>
  <div class="c-ListUpdateFormComponent">
    <form class="mb-4" @submit.prevent="updateListName">

      <div class="row g-1">
        <div class="col">
          <input class="form-control fs-3 mb-2" placeholder="Nazwa np: zwierzęta" type="text"
                 :class="{'border-danger border-3': updateExerciseListErrors.name}"
                 v-model="listName"
          >
        </div>
        <div class="col-auto">
          <button class="btn btn-primary text-light fs-3 border-3">
            zmień nazwę
          </button>
        </div>
        <h4 class="text-danger" v-for="(error, key, i) in updateExerciseListErrors" :key="i">{{error.message}}</h4>
      </div>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: 'ListUpdateNameComponent',
  data(){
    return {}
  },
  computed: {
    ...mapState({
      updateExerciseListErrors: state=>state.listModule.updateExerciseListErrors
    }),
    ...mapGetters({
      activeList: 'listModule/activeList'
    }),
    listName: {
      get(){
        return this.$store.state.listModule.updateListName
      },
      set(val){
        this.setUpdateListName(val)
      }
    }
  },
  methods: {
    ...mapActions({
      updateListName: 'listModule/updateListName',
      setUpdateListName: 'listModule/setUpdateListName'
    }),
  },
  created(){
    this.setUpdateListName(this.activeList.name)
  }
}
</script>