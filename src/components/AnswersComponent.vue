<template>
  <div class="c-AnswersComponent">
    <h3>Odpowiedzi:</h3>
    <div class="row" v-for="(answer, key, index) in answers" :key="index">
      <div class="col-2">
        {{answer.playerId.name}}
      </div>
      <div class="col-4">
        {{answer.exerciseId.content}}
      </div>
      <div class="col-4">

            <div v-for="(image,i) in userImages" :key="i" >
                     <div v-show="image._id === answer.exerciseId.image">
                       <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">
                       <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname"
                            v-if="image.srcType === 'buffer' ">
                     </div>
            </div>

<!--        <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">-->
<!--        <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname"-->
<!--             v-if="image.srcType === 'buffer' ">-->

<!--        {{userImages.find(image=>image._id === answer.exerciseId.image)?.mimetype}}-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnswersComponent',
  props: {
    answers: {
      type: Array
    },
    userImages: {
      type: Array
    }
  },
  methods:{

  }
}
</script>