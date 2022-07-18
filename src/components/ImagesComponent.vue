<template>
  <div class="c-ImagesComponent border">
    <div class="row">
      <div class="col-md-6 col-lg-3 mb-4 mt-4 d-flex justify-content-end flex-column" v-for="image in userImages" :key="image._id">
        <div class="row">
          <div class="col">
            <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">
            <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname"
                 v-if="image.srcType === 'buffer' ">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <button class="btn btn-success w-100">
              Użyj
            </button>
          </div>
          <div class="col">
            <button class="btn btn-danger w-100" @click="deleteImage(image._id)">
              Usuń
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  name: 'ImagesComponent',
  props: {
    userImages: {
      type: Array
    }
  },
  methods: {
    ...mapActions({
      deleteImage: 'imageModule/deleteImage'
    })
  }
}
</script>

<style lang="scss">
  .c-ImagesComponent {
    max-height: 50vh;
    overflow: auto;
  }
</style>