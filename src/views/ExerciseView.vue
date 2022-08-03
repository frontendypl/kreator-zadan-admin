<template>
  <div class="v-ExerciseCreateView w-100 mt5">
      <div class="container">
        <div class="row mb-5">
          <div class="col">
            <h1 class="fw-bold">Tworzenie zadania:</h1>
          </div>
          <div class="col-auto">
            <label class="fw-bold">Nazwa</label>
            <input
                class="w-100 form-control"
                :class="{'border-danger': errors.name && !name}"
                type="text"
                placeholder="zadanie1"
                v-model="name"
            >
            <div class="col-12" v-if="errors.name && !name">
              <p class="text-center text-danger fw-bold">{{errors.name.message}}</p>
            </div>
          </div>
        </div>
        <div class="row my-3 mb-5" v-if="!usedImage">
          <div class="col">
            <ImageFormComponent />
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-12" v-if="!usedImage">
            <h3 class="text-center fw-bold">Możesz wykorzystać użyte poprzednio obrazy:</h3>
          </div>
          <div class="col-12">
            <ImagesComponent
                class="mt-5"
                :userImages="userImages"
                :usedImage="usedImage"
                @selectImage="setNewExerciseData" />
          </div>
        </div>

        <div class="row mb-5">
          <div class="col-12">
            <ExerciseFormComponent :errors="errors" />
          </div>
        </div>

<!--        //przycisk dissabled - validacja front TODO-->
        <div class="row mb-5">
          <div class="col-12">
            <button class="btn btn-success w-100" type="button"
              @click="saveExercise"
            >
              GOTOWE, Zapisz!
            </button>
          </div>
        </div>

      </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ImageFormComponent from "@/components/ImageFormComponent";
import ImagesComponent from "@/components/ImagesComponent";
import {mapGetters, mapState, mapActions} from "vuex";
import ExerciseFormComponent from "@/components/ExerciseFormComponent";
/**
 * TODO:
 * - walidacja na froncie, ?vee-validate
 * - drag and drop
 * - podgląd zadania: komponent/
 */

export default {
  name: "ExerciseCreateView",
  components: {ExerciseFormComponent, ImageFormComponent, ImagesComponent},

  data(){
    return {
    }
  },
  computed: {
    ...mapState({
      errors: state=> state.exerciseModule.errors,
    }),
    name:{
      get(){
        return this.exerciseName
      },
      set(val){
        this.setName(val)
      }
    },
    ...mapState({
      user: state => state.userModule.user,
      exercisesLists: state => state.listModule.exercisesLists,
      userImages: state => state.imageModule.userImages,
      newExerciseData: state => state.exerciseModule.newExerciseData,
      exerciseName: state=> state.exerciseModule.name
    }),
    ...mapGetters(
        {
          apiUrl: 'apiUrl',
          frontUrl: 'frontUrl',
          usedImage:'exerciseModule/usedImage'
        }),
  },
  methods: {
    ...mapActions({
      getImages: 'imageModule/getImages',
      setNewExerciseData: 'exerciseModule/setNewExerciseData',
      setName: 'exerciseModule/setName',
      saveExercise: 'exerciseModule/saveExercise',
      resetExercise: 'exerciseModule/resetExercise'
    }),
  },
  created(){
    // this.getImages()
    this.setNewExerciseData({listId: this.$route.params.listId})
  },
  beforeDestroy() {
    this.resetExercise()
  }
}
</script>