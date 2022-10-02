<template>
  <div class="c-ExerciseFormComponent row">
    <div class="col-12 mb-3">
      <h3 class="fw-bold">Dodaj nowy obrazek/ilustracje/zdjęcie:</h3>
    </div>

    <div class="col-12 col-md-6" v-if="!showImageForm" @click="showImageForm = true">
        <div class="add-image">
          <i class="bi bi-images"></i>
        </div>
    </div>

    <!--    -->
    <div class="modal fade show" aria-modal="true" role="dialog" v-if="showImageForm">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalCenterTitle">Dodaj nowy obrazek</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    @click="showImageForm = false"
            ></button>
          </div>
          <div class="modal-body">

            <div> <!--      TODO modal-->
              <div class="col-12">
                <label for="fileInput" class="form-label visually-hidden" >Upolad obrazka.</label>
                <input id="fileInput" class="form-control form-control-lg" type="file"
                       :class="{'border-danger': errors.fileInput}"
                       @change="handleInputFile" ref="inputFile"
                />
              </div>
              <div class="col-12 my-4">
                <h5>lub wklej link z internetu:</h5>
              </div>
              <div class="col-12 mb-3">
                <label class="form-label visually-hidden">link:</label>
                <input id="urlInput" class="form-control form-control-lg w-100" type="text" placeholder="https://www.obrazki.pl/1"
                       :class="{'border-danger': errors.urlInput}"
                       @change="handleUrlInput"
                       v-model="imageUrl"
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
import axios from "axios";
import {mapGetters, mapState, mapActions} from "vuex";

export default {
  name: 'ExerciseImageForm',
  data(){
    return {
      image: '',
      imageUrl: '',
      errors: {},
      showImageForm: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.userModule.user,
      exercisesLists: state=>state.listModule.exercisesLists
    }),
    ...mapGetters(['apiUrl','frontUrl']),
  },
  methods: {
    ...mapActions({
      getImages: 'imageModule/getImages',
      setLoader: 'setLoader',
      setNewExerciseData: 'exerciseModule/setNewExerciseData'
    }),
    cancel(){
      this.errors = {}
      this.$refs.inputFile.value = ''
      this.image = '';
      this.imageUrl = ''
      this.showImageForm = false
    },
    handleUrlInput(e){
      this.errors = {}
      this.$refs.inputFile.value = ''
      this.image = '';
      this.imageUrl = e.target.value
    },
    handleInputFile(e){
      this.errors = {}
      this.image = e.target.files[0]
      this.imageUrl = ''
    },
    async handleForm(){
      const formData = new FormData()


      if(this.image){
        formData.set('image', this.image)
        formData.set('srcType', 'buffer')
      }
      if(this.imageUrl){
        formData.set('url', this.imageUrl)
        formData.set('srcType', 'url')
      }

      try{
        this.setLoader({form: true})
        const response = await axios.post(
            `${this.apiUrl}/images`,
            formData,
            {headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${this.user.token}`,
              }}
        )
        this.setLoader({form: false})
        this.getImages()
        console.log({response})
        this.setNewExerciseData({imageId: response.data._id})
      }catch (e) {
        console.log(e)
        this.errors = {...e.response.data.errors}
        this.setLoader({form: false})
      }

    }
  }
}
</script>

<style lang="scss" scoped>
.c-ExerciseFormComponent {

  .add-image {
    font-size: 4em;
    border: 4px dotted black;
    text-align: center;
    padding: .25em;
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
      color: #157347;
      border: 4px dotted #157347;
    }
  }

  .modal {
    background-color: rgba(0,0,0,0.7);
    display: block;
  }

}
</style>