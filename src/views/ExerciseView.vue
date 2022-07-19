<template>
  <div class="v-ExerciseCreateView w-100 mt5">
      <div class="container">
        <div class="row mb-5">
          <div class="col">
            <h1>Tworzenie zadania:</h1>
          </div>
          <div class="col-auto">
            <label>Nazwa</label>
<!--       TODO     Use computed, v-model and get/set to change value, now is not correct-->
            <input class="w-100" type="text" placeholder="zadanie1"
              @change="function(e){setNewExerciseData({name: e.target.value})}"
            >
          </div>
        </div>
        <div class="row my-3 justify-content-between">
          <div class="col-auto">
            <ImageFormComponent />
          </div>
          <div class="col-auto">Preview</div>
        </div>

        <div class="row mb-5">
          <ImagesComponent
              :userImages="userImages"
              :usedImageId="newExerciseData.imageId"
              @selectImage="setNewExerciseData"/>
        </div>

      </div>
  </div>
</template>

<script>
import ImageFormComponent from "@/components/ImageFormComponent";
import ImagesComponent from "@/components/ImagesComponent";
import {mapGetters, mapState, mapActions} from "vuex";
/**
 * TODO:
 * - walidacja na froncie, ?vee-validate
 * - drag and drop
 * - podgląd zadania: komponent/
 */

export default {
  name: "ExerciseCreateView",
  components: {ImageFormComponent, ImagesComponent},

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
    ...mapGetters(['apiUrl','frontUrl']),
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