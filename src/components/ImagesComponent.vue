<template>
  <div class="c-ImagesComponent"
    :class="{'c-ImagesComponent--multi':userImages.length>1}"
  >
    <div class="row">
      <div class="col-md-6 col-lg-3  mb-3 d-flex justify-content-end flex-column"
           :class="{activeImage: image._id === usedImage._id, 'visually-hidden': usedImage._id && (image._id !==usedImage._id) }"
           v-for="image in userImages"
           :key="image._id"
      >
        <div class="row">
          <div class="col text-center">
            <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">
            <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname"
                 v-if="image.srcType === 'buffer' ">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col">
            <button class="btn btn-success w-100"
              @click="useImage(image._id)"
              v-if="image._id !== usedImage._id"
            >
              Użyj
            </button>
            <button class="btn btn-outline-dark shadow-none w-100"
                    @click="useImage('')"
                    v-else
            >
              Użyj innego
            </button>
          </div>
          <div class="col">
            <button class="btn btn-danger w-100"
                    @click="switchImage({id: image._id, isArchived: !image.isArchived})"
                    v-if="image._id !== usedImage._id"
                    title="Po usunięciu zdjęcie wciąż bedzie widoczne w innych zadaniach."
            >
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
    },
    usedImage: {
      type: Object,
      default(){return {}}
    }
  },
  methods: {
    ...mapActions({
      switchImage: 'imageModule/switchImage'
    }),
    useImage(id){
      this.$emit('selectImage', {imageId: id})
    }
  }
}
</script>

<style lang="scss">
  .c-ImagesComponent {
    overflow-x: hidden;
    &--multi{
      max-height: 50vh;
      overflow-y: auto;

      img{
        max-height: calc(45vh - 5rem); // 5rem is about buttons height
      }
    }
  }
  .activeImage{
    img{
      border: 3px solid red;
    }
  }
</style>