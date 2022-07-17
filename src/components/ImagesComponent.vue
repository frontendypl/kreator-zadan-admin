<template>
  <div class="c-ImagesComponent">
    <div class="row">
      <div class="col" v-for="image in userImages" :key="image._id">
        <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">
<!--        TODO podmieniać typ pliku, zapisywać mime w bazie-->
        <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname" v-if="image.srcType === 'buffer' ">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImagesComponent',
  props: {
    userImages: {
      type: Array
    }
  },
  methods: {

  }
}
</script>