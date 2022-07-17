<template>
  <div class="v-ExerciseCreateView w-100 mt5">
      <div class="container">
        <div class="row mb-5">
          <div class="col">
            <h1>Tworzenie zadania:</h1>
          </div>
          <div class="col-auto">
            <label>Nazwa</label>
            <input class="w-100" type="text" placeholder="zadanie1">
          </div>
        </div>
        <div class="row my-3 justify-content-between">
          <div class="col-auto">
            <ExerciseImageForm />
          </div>
          <div class="col-auto">Preview</div>
        </div>

        <div class="row mb-5">
          <ExerciseImagesListComponent :userImages="userImages"/>
        </div>

      </div>
  </div>
</template>

<script>
import ExerciseImageForm from "@/components/ImageFormComponent";
import ExerciseImagesListComponent from "@/components/ImagesComponent";
import {mapGetters, mapState} from "vuex";
/**
 * TODO:
 * - walidacja na froncie, ?vee-validate
 * - drag and drop
 * - podgląd zadania: komponent/
 */

export default {
  name: "ExerciseCreateView",
  components: {ExerciseImagesListComponent, ExerciseImageForm},

  data(){
    return {
      userImages: []
    }
  },
  computed: {
    ...mapState(['user','exercisesLists']),
    ...mapGetters(['apiUrl','frontUrl']),
  },
  methods: {

  }
}
</script>