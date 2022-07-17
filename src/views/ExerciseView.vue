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
            <ImageFormComponent />
          </div>
          <div class="col-auto">Preview</div>
        </div>

        <div class="row mb-5">
          <ImagesComponent :userImages="userImages"/>
        </div>

      </div>
  </div>
</template>

<script>
import ImageFormComponent from "@/components/ImageFormComponent";
import ImagesComponent from "@/components/ImagesComponent";
import {mapGetters, mapState} from "vuex";
import axios from "axios";
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
      userImages: []
    }
  },
  computed: {
    ...mapState(['user','exercisesLists']),
    ...mapGetters(['apiUrl','frontUrl']),
  },
  methods: {
    async getImages(){
      try{
        const response = await axios.get(
            `${this.apiUrl}/images`,
            {
              headers: {
                'Authorization': `Bearer ${this.user.token}`
              }
            }
        )
        this.userImages = response.data
      }catch (e) {
        console.log(e)
      }
    }
  },
  created(){
    this.getImages()
  }
}
</script>