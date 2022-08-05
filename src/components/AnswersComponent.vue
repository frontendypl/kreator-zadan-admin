<template>
  <div class="c-AnswersComponent text-center">
    <h3>Odpowiedzi:</h3>
    <div class="row my-2 border-bottom">
      <div class="col-2">Data</div>
      <div class="col-2">Imię</div>
      <div class="col-2">Pytanie</div>
      <div class="col-2 text-center">Ilustracja</div>
      <div class="col-2 text-center">Odpowiedź</div>
      <div class="col-2 text-center">Poprawna</div>
    </div>
    <div class="row align-items-center my-2 border-bottom"
         :class="{'bg-danger text-light': !answer.answerOption.isCorrect }"
         v-for="(answer, key, index) in answers"
         :key="index"
    >
      <div class="col-2">
        {{new Date(answer.createdAt).toLocaleString()}}
      </div>
      <div class="col-2">
        {{answer.player.name}}
      </div>
      <div class="col-2">
        {{answer.exercise.content}}
      </div>
      <div class="col-2">
            <div v-for="(image,i) in userImages" :key="i" >
                     <div v-show="image._id === answer.exercise.image">
                       <img :src="image.url" class="img-fluid" alt="" v-if="image.srcType === 'url' ">
                       <img :src="`data:${image.mimetype};base64,${image.src}`" class="img-fluid" :alt="image.originalname"
                            v-if="image.srcType === 'buffer' ">
                     </div>
            </div>
      </div>
      <div class="col-2">
        {{answer.answerOption.text}}
      </div>
      <div class="col-2">
        {{answer.exercise.answerOptions.find(option=>option.isCorrect).text}}
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