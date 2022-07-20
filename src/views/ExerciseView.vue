<template>
  <div class="v-ExerciseCreateView w-100 mt5">
      <div class="container">
        <div class="row mb-5">
          <div class="col">
            <h1 class="fw-bold">Tworzenie zadania:</h1>
          </div>
          <div class="col-auto">
            <label class="fw-bold">Nazwa</label>
<!--       TODO     Use computed, v-model and get/set to change value, now is not correct-->
            <input class="w-100" type="text" placeholder="zadanie1"
              @change="function(e){setNewExerciseData({name: e.target.value})}"
            >
          </div>
        </div>
        <div class="row my-3 mb-5">
          <div class="col">
            <ImageFormComponent />
          </div>
<!--          <div class="col-12 col-md-4">-->
<!--            <ExerciseImagePreviewComponent :usedImage="usedImage"/>-->
<!--          </div>-->
        </div>

        <div class="row mb-5">
          <div class="col-12">
            <h3 class="text-center fw-bold">Możesz wykorzystać użyte poprzednio obrazy:</h3>
          </div>
          <ImagesComponent
              class="mb-5 mt-5"
              :userImages="userImages"
              :usedImage="usedImage"
              @selectImage="setNewExerciseData"/>
        </div>

      </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import ImageFormComponent from "@/components/ImageFormComponent";
import ImagesComponent from "@/components/ImagesComponent";
import {mapGetters, mapState, mapActions} from "vuex";
import ExerciseImagePreviewComponent from "@/components/ExerciseImagePreviewComponent";
/**
 * TODO:
 * - walidacja na froncie, ?vee-validate
 * - drag and drop
 * - podgląd zadania: komponent/
 */

export default {
  name: "ExerciseCreateView",
  components: {ExerciseImagePreviewComponent, ImageFormComponent, ImagesComponent},

  data(){
    return {

    }
  },
  computed: {
    ...mapState({
      user: 'user',
      exercisesLists: 'exercisesLists',
      userImages: state => state.imageModule.userImages,
      newExerciseData: state => state.exerciseModule.newExerciseData
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
      setNewExerciseData: 'exerciseModule/setNewExerciseData'
    }),
  },
  created(){
    this.getImages()
  }
}
</script>