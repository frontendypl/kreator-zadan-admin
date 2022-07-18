<template>
  <div class="c-ExerciseFormComponent row">
    <div class="col">
      <label for="fileInput" class="form-label visually-hidden" >Upolad obrazka.</label>
      <input id="fileInput" class="form-control" type="file"
             :class="{'border-danger': errors.fileInput}"
             @change="handleInputFile" ref="inputFile"
      />
    </div>
    <div class="col-auto">
      <p>lub</p>
    </div>
    <div class="col">
      <label class="form-label">link:</label>
      <input id="urlInput" class="form-control w-100" type="text" placeholder="https://www.obrazki.pl/1"
             :class="{'border-danger': errors.urlInput}"
             @change="handleUrlInput"
             v-model="imageUrl"
      >
    </div>
    <div class="col">
      <button class="btn btn-danger w-100 mb-1">usuń</button>
      <button class="btn btn-success w-100" @click="handleForm">zatwierdź</button>
    </div>
    <div class="col-12">
      <h4 class="text-danger"
          v-for="(error, key, i) in errors"
          :key="i"
      >
        {{error.message}}
      </h4>
    </div>
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
      errors: {}
    }
  },
  computed: {
    ...mapState(['user','exercisesLists']),
    ...mapGetters(['apiUrl','frontUrl']),
  },
  methods: {
    ...mapActions({
      getImages: 'imageModule/getImages',
      setLoader: 'setLoader',
    }),
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
      }catch (e) {
        console.log(e)
        this.errors = {...e.response.data.errors}
        this.setLoader({form: false})
      }

    }
  }
}
</script>