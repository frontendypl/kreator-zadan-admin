<template>
  <div class="c-ListFormComponent">
    <form class="mb-4" @submit.prevent="handleForm">

      <div class="row g-1">
        <div class="col col-md-4">
          <input class="form-control fs-3 mb-2" placeholder="Nowa lista zadań" type="text"
                 :class="{'border-danger':Object.keys(errors).length}"
                 v-model="listName"
          >
        </div>
        <div class="col-auto">
          <button class="btn btn-primary text-light fs-3">
            +
          </button>
        </div>
        <h4 class="text-danger"
            v-for="(error, key, i) in errors"
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
      listName: '',
      errors: {
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
    }),
    ...mapGetters(['apiUrl']),
  },
  methods: {
    ...mapActions({
      getExercisesLists: 'listModule/getExercisesLists'
    }),
    async handleForm(){
      this.$emit('setLoader',{list: true})
      try{
        const response = await axios.post(
            `${this.apiUrl}/lists`,
            {name: this.listName},
            {headers: {
              'Authorization': `Bearer ${this.user.token}`
              }}
        )
        await this.$router.push({name:'ExerciseListView',params: {listId: response.data._id}})
        await this.getExercisesLists()
      }catch (e) {
        this.errors = {...e.response.data.errors}
        this.$emit('setLoader',{list: false})
      }
    }
  },
}
</script>

<style lang="scss">

</style>