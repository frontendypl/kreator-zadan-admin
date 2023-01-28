<template>
  <div class="v-ExerciseCreateView w-100 mt5">
      <div class="container">
        <div class="row mb-5">
          <div class="col">
            <h1 class="fw-bold">Tworzenie zadania:</h1>
          </div>
        </div>
        <div class="row my-3 mb-5" >
          <div class="col-12 col-lg-6 mb-4" v-if="!usedImage">
            <ImageFormComponent />
          </div>
          <div class="col-12 col-lg-6 mb-4">

            <YoutubeVideoFormComponent v-if="!youtubePreviewId" />

            <div v-if="youtubePreviewId">
              <iframe
                  :src="`https://www.youtube.com/embed/${youtubePreviewId.ytId}?start=${youtubePreviewId.startTime}&end=${youtubePreviewId.endTime}`"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
              >
              </iframe>
            </div>


            <button
                class="btn btn-danger w-25 mt-2"
                @click="removeVideo(youtubeId)"
                v-if="youtubePreviewId"
            >
              Usuń
            </button>
          </div>
        </div>

        <div class="row mb-5" v-if="userImagesActive.length">
          <div class="col-12" v-if="!usedImage">
            <h3 class="fw-bold">Możesz wykorzystać użyte poprzednio obrazy:</h3>
          </div>
          <div class="col-12">
            <ImagesComponent
                class=""
                :userImages="userImagesActive"
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
            <button class="btn btn-success w-100 p-4 fs-2 fw-bold" type="button"
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
import fitvids from "fitvids"

/* eslint-disable vue/no-unused-components */
import ImageFormComponent from "@/components/ImageFormComponent";
import YoutubeVideoFormComponent from "@/components/YoutubeVideoFormComponent";
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
  components: {ExerciseFormComponent, ImageFormComponent,YoutubeVideoFormComponent, ImagesComponent},

  data(){
    return {
    }
  },
  computed: {
    ...mapState({
      errors: state=> state.exerciseModule.errors,
    }),
    ...mapState({
      user: state => state.userModule.user,
      exercisesLists: state => state.listModule.exercisesLists,
      listId: state => state.listModule.listId,
      userImages: state => state.imageModule.userImages,
      newExerciseData: state => state.exerciseModule.newExerciseData,
      youtubePreviewId: state => state.exerciseModule.youtubePreviewId,
      youtubeId: state => state.exerciseModule.newExerciseData.youtubeId,

    }),
    ...mapGetters(
        {
          apiUrl: 'apiUrl',
          frontUrl: 'frontUrl',
          usedImage:'exerciseModule/usedImage',
          userImagesActive: 'imageModule/userImagesActive'
        }),
  },
  methods: {
    ...mapActions({
      setBackPathObject: 'setBackPathObject',
      getImages: 'imageModule/getImages',
      setNewExerciseData: 'exerciseModule/setNewExerciseData',
      saveExercise: 'exerciseModule/saveExercise',
      resetExercise: 'exerciseModule/resetExercise',
      removeVideo: 'youtubeModule/removeVideo'
    }),
  },
  watch: {
    youtubePreviewId: {
      handler(newVal, oldVal) {
        if(!newVal) return
        setTimeout(()=>{
          fitvids()
        },1)
      },
      deep: true
    }
  },
  created(){
    // this.getImages()
    this.setNewExerciseData({listId: this.$route.params.listId})
  },
  mounted(){
    this.setBackPathObject({name: 'ListView', params: {listId: this.listId}})
  },
  beforeDestroy() {
    this.resetExercise()
  }
}
</script>