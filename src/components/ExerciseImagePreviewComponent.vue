<template>
  <div class="c-ExerciseImagePreviewComponent">
    <h5>Wybrany obraz:</h5>
    <div class="row">
      <div class="col">
        <img :src="usedImage.url" class="img-fluid" alt="" v-if="usedImage.srcType === 'url' ">
        <img :src="`data:${usedImage.mimetype};base64,${usedImage.src}`" class="img-fluid" :alt="usedImage.originalname"
             v-if="usedImage.srcType === 'buffer' ">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExerciseImagePreviewComponent',
  props: {
    usedImage: {
      type: Object,
      default(){return {}}
    }
  }
}
</script>