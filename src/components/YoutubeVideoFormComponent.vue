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
            <h5 class="modal-title" id="exampleModalCenterTitle">Dodaj nowy obrazek</h5>
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
              <div class="col-12 my-4">
<!--                TODO-->

                <iframe id="player" type="text/html"></iframe>

                <h5>Link</h5>
              </div>
              <div class="col-12 mb-3">
                <label class="form-label visually-hidden">link:</label>
                <input id="urlInput" class="form-control form-control-lg w-100" type="text" placeholder="https://www.youtube.com/watch?v=WED8S7zMgnc"
                       :class="{'border-danger': errors.urlInput}"
                       @change="handleUrlInput"
                       v-model="url"
                >
              </div>
              <div class="col-12 my-3">
                <h4 class="text-danger my-1"
                    v-for="(error, key, i) in errors"
                    :key="i"
                >
                  {{error.message}}
                </h4>
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
              Zatwierdź
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

// TODO error handling, use 'youtube-url' library to check if url is correct
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
      isYTReady: false,
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
      // this.url = '';
    },
    // handleInputFile(e){
    //   this.errors = {}
    //   this.image = e.target.files[0]
    //   this.imageUrl = ''
    // },
    async handleForm(){

      try{
        this.setLoader({form: true})

        const response = await axios.post(
            `${this.apiUrl}/youtube-videos`,
            {
              url: this.youtubeVideoId
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
    initYoutube() {
      const _ = this;
      console.log("initYoutube");
      setTimeout(()=>{
        this.player = new window.YT.Player("player", {
          width: 600,
          height: 400,
          videoId: _.youtubeVideoId,
          events: {
            onReady: _.onPlayerReady,
            onStateChange: _.onPlayerStateChange
          }
        });
      },100)

    },
    onPlayerReady(evt) {
      console.log("Player ready");
      evt.target.playVideo();
    },
    onPlayerStateChange(evt) {
      console.log("Player state changed", evt);
    }

  },
  watch: {
    showVideoForm(newVal, oldVal) {
      if(newVal){

        // // 2. This code loads the IFrame Player API code asynchronously.
        // var tag = document.createElement('script');
        //
        // tag.src = "https://www.youtube.com/iframe_api";
        // var firstScriptTag = document.getElementsByTagName('script')[0];
        // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        //
        // // 3. This function creates an <iframe> (and YouTube player)
        // //    after the API code downloads.

        // window.onYouTubeIframeAPIReady = () => {
        //   this.isYTReady = true
        // };

      }
    },

    youtubeVideoId(newVal, oldVal) {
      if(newVal)

        this.initYoutube()
      // fitvids()

    }
  },
  created(){},
  mounted(){



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