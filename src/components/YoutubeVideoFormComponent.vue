<template>
  <!--  https://developers.google.com/youtube/iframe_api_reference-->
  <div class="c-YoutubeVideoFormComponent row">
    <div class="col-12 mb-3">
      <h3 class="fw-bold">Dodaj film youtube:</h3>
    </div>

    <div class="col-12 col-md-6" v-if="!showVideoForm" @click="showVideoForm = true">
      <div class="add-image">
        <i class="bi bi-youtube"></i>
      </div>
    </div>

    <!--    -->
    <div class="modal fade show" aria-modal="true" role="dialog" v-if="showVideoForm">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Dodaj film</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    @click="showVideoForm = false"
            ></button>
          </div>
          <div class="modal-body">

            <div> <!--      TODO modal-->
              <!--              <div class="col-12">-->
              <!--                <label for="fileInput" class="form-label visually-hidden" >Upolad obrazka.</label>-->
              <!--                <input id="fileInput" class="form-control form-control-lg" type="file"-->
              <!--                       :class="{'border-danger': errors.fileInput}"-->
              <!--                       @change="handleInputFile" ref="inputFile"-->
              <!--                />-->
              <!--              </div>-->
              <div class="col-12">
                <!--                TODO-->
                <div id="player" v-if="youtubeVideoId"></div>
                <!--                <iframe-->
                <!--                    v-if="youtubeVideoId"-->
                <!--                    style="max-width: 100%"-->
                <!--                    :src="`https://www.youtube.com/embed/${youtubeVideoId}?start=10&end=13&autoplay=1&loop=1`"-->
                <!--                    frameborder="0"-->
                <!--                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"-->
                <!--                    allowfullscreen>-->
                <!--                </iframe>-->

                <h5>Wklej adres url filmu:</h5>
              </div>
              <div class="col-12 mb-3">
                <label class="form-label visually-hidden">link:</label>
                <input id="urlInput" class="form-control form-control-lg w-100" type="text" placeholder="https://www.youtube.com/watch?v=WED8S7zMgnc"
                       :class="{'border-danger': errors.urlInput}"
                       @change="handleUrlInput"
                       v-model="url"
                >
              </div>
              <div class="col-12 mb-3">
                <h4 class="text-danger my-1"
                    v-for="(error, key, i) in errors"
                    v-if="key === 'urlInput' "
                    :key="i"
                >
                  {{error.message}}
                </h4>
              </div>

              <div class="row mb-3">
                <div class="col-6">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                    v-model="fullMovie" :value="true"
                    >
                    <label class="form-check-label fw-bold" for="flexRadioDefault1">
                      Cały film
                    </label>
                  </div>
                </div>
                <div class="col-6">
                  <div class="form-check">
                    <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                    v-model="fullMovie" :value="false"
                    >
                    <label class="form-check-label fw-bold" for="flexRadioDefault2">
                      Fragment
                    </label>
                  </div>
                </div>
              </div>

              <div class="row" v-if="!fullMovie">

                <div class="col-12 mb-3">
                  <div class="row mb-3">
                    <div class="col fw-bold">
                      Zacznij odtwarzanie od:
                    </div>
                  </div>
                  <div class="row" :class="{'border-danger': errors.startTime || errors.endTime}">
                    <div class="col">
                      <label>
                        godzina
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            v-model="startTime.h"
                        >
                      </label>
                    </div>
                    <div class="col">
                      <label>
                        minuta
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            max="59"
                            v-model="startTime.m"
                        >
                      </label>
                    </div>
                    <div class="col">
                      <label>
                        sekunda
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            max="59"
                            v-model="startTime.s"
                        >
                      </label>
                    </div>
                  </div>
                  <div class="col-12 mb-3">
                    <h4 class="text-danger my-1"
                        v-for="(error, key, i) in errors"
                        v-if="key === 'endTime' || key === 'startTime' "
                        :key="i"
                    >
                      {{error.message}}
                    </h4>
                  </div>

                </div>

                <div class="col-12">
                  <div class="row mb-3">
                    <div class="col fw-bold">
                      Zakończ odtwarzanie na:
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <label>
                        godzina
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            v-model="endTime.h"
                        >
                      </label>
                    </div>
                    <div class="col">
                      <label>
                        minuta
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            max="59"
                            v-model="endTime.m"
                        >
                      </label>
                    </div>
                    <div class="col">
                      <label>
                        sekunda
                        <input
                            type="number"
                            class="form-control form-control-lg mt-2"
                            min="0"
                            max="59"
                            v-model="endTime.s"
                        >
                      </label>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                    @click="cancel"
            >
              Anuluj
            </button>
            <button type="button" class="btn btn-success"
                    @click="handleForm"
            >
              Zapisz film
            </button>
          </div>
        </div>
      </div>
    </div>
    <!--    -->
  </div>
</template>

<script>
// https://developers.google.com/youtube/iframe_api_reference

// TODO error handling, use 'youtube-url' library to check if url is correct ??

// TODO validation:
//  - start seconds < end seconds
//  - youtube url


import fitvids from "fitvids"
import axios from "axios";
import {mapGetters, mapState, mapActions} from "vuex";

export default {
  name: 'YoutubeVideoFormComponent',
  data(){
    return {
      url: '',
      errors: {},
      showVideoForm: false,
      player: null,
      playerStatus: null,
      playerStatusInterval: null,
      isYTReady: false,
      fullMovie: true,
      startTime: {
        h: 0,
        m: 0,
        s: 0
      },
      endTime: {
        h: 0,
        m: 0,
        s: 0
      }
    }
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
      exercisesLists: state=>state.listModule.exercisesLists
    }),
    ...mapGetters(['apiUrl','frontUrl']),
    youtubeVideoId(){

      if(this.url.indexOf('https://www.youtube.com/watch?v=') !== -1){
        return this.url.split('?v=')[1]
      }
      else if (this.url.indexOf('https://youtu.be/') !== -1 ){
        return this.url.split('https://youtu.be/')[1]
      }else {
        return ''
      }
    },
    startTimeSeconds(){
      return +this.startTime.s + this.startTime.m * 60 + this.startTime.h * 60 * 60
    },
    endTimeSeconds(){
      return +this.endTime.s + this.endTime.m * 60 + this.endTime.h * 60 * 60
    }
  },
  methods: {
    ...mapActions({
      setLoader: 'setLoader',
      setNewExerciseData: 'exerciseModule/setNewExerciseData',
      setYoutubePreviewId: 'exerciseModule/setYoutubePreviewId'
    }),
    cancel(){
      this.errors = {}
      this.url = '';
      this.showVideoForm = false
    },
    handleUrlInput(e){
      this.errors = {}
    },
    async handleForm(){

      try{
        this.setLoader({form: true})

        const response = await axios.post(
            `${this.apiUrl}/youtube-videos`,
            {
              ytId: this.youtubeVideoId,
              startTime: this.startTimeSeconds,
              endTime: this.endTimeSeconds,
            },
            {headers: {
                'Authorization': `Bearer ${this.user.token}`,
              }}
        )

        this.setLoader({form: false})
        console.log({response})
        this.setNewExerciseData(
            {youtubeId: response.data._id}
        )
        this.showVideoForm = false
        this.setYoutubePreviewId(this.youtubeVideoId)
      }catch (e) {
        console.log(e)
        this.errors = {...e.response.data.errors}
        this.setLoader({form: false})
      }

    },

    //  TODO
    addYtScript(){
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      this.isYTReady = true
      // window.onYouTubeIframeAPIReady = () => {
      //   this.isYTReady = true
      // };
    },
    initYoutube() {

      if(!this.youtubeVideoId) return false

      const _ = this;
      console.log("initYoutube");
      console.log(_.startTimeSeconds, _.endTimeSeconds)
      this.player = new YT.Player("player", {
        width: 600,
        height: 400,
        videoId: _.youtubeVideoId,
        playerVars: {
          // autoplay: 1,
          start: _.startTimeSeconds,
          end: _.endTimeSeconds
        },
        events: {
          onReady: _.onPlayerReady,
          // onStateChange: _.onPlayerStateChange, //Not work
        }
      });

    },
    onPlayerReady(evt) {
      console.log("Player ready");

      fitvids()
      // evt.target.playVideo();

    },
    // onPlayerStateChange(evt) {
    //   console.log("Player state changed", evt);
    //   console.log('!!!!!')
    //   console.log({evt})
    // },

    resetTimeForm(){
      this.startTime.s = 0
      this.startTime.m = 0
      this.startTime.h = 0
      this.endTime.s = 0
      this.endTime.m = 0
      this.endTime.h = 0
    },
    resetErrors(){
      this.errors = {}
    },
    resetStatus(){
      this.playerStatus = null;
      this.playerStatusInterval= null;
    },
    reInitPlayer(){
      if(!this.youtubeVideoId) return false
      this.player.destroy()
      this.initYoutube()
    },
    getPlayerStatus(){
      if(! this.youtubeVideoId) return false
      this.playerStatusInterval = setInterval(()=>{
        console.log('i')
          this.playerStatus = this.player.getPlayerState()

        if(this.playerStatus === 0 ){
          this.reInitPlayer()
        }

      },250)
    }

  },
  watch: {
    showVideoForm(newVal, oldVal) {
      console.log({newVal, oldVal})
      if(newVal){
      }

      if(oldVal){
        this.url = ''
        this.resetErrors()
        this.resetTimeForm()
        clearInterval(this.playerStatusInterval)
        this.resetStatus()
      }

    },

    youtubeVideoId(newVal, oldVal) {
      if(this.isYTReady && this.youtubeVideoId){

        setTimeout(()=>{
          this.initYoutube()
        },1)

        if(newVal){
          this.getPlayerStatus()
        }

      }
    },
    fullMovie(){
      this.resetTimeForm()
      delete this.errors.startTime
      delete this.errors.endTime
    },
    startTimeSeconds(){
      this.reInitPlayer()
    },
    endTimeSeconds(){
      this.reInitPlayer()
    }
  },
  created(){},
  mounted(){

    this.addYtScript()

  },
  beforeDestroy(){
    console.log('player destroyed')
    this.player.destroy()
    clearInterval(this.playerStatusInterval)
  }

}
</script>

<style lang="scss" scoped>
.c-YoutubeVideoFormComponent {

  .add-image {
    font-size: 4em;
    border: 4px dotted black;
    text-align: center;
    padding: .25em;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      color: rgb(255 0 0);
      border: 4px dotted #157347;
    }
  }

  .modal {
    background-color: rgba(0,0,0,0.7);
    display: block;
    z-index: 2;
  }

}
</style>