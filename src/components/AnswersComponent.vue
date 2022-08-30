<template>
  <div class="c-AnswersComponent">
    <div class="row">
      <h3 class="c-AnswersComponent__head">
        Odpowiedzi:
        <button class="btn float-end btn-outline-dark"
                @click="hideOldAnswers = !hideOldAnswers"
                v-if="answers.length"
        >
          {{hideOldAnswers? 'Pokaż starsze odpowiedzi': 'Ukryj starsze odpowiedzi'}}
        </button>
      </h3>
    </div>
    <div v-if="!answers.length">
      <div class="col" >
        <p>
          Narazie brak.
        </p>
        <p>
          Odpowiedzi będą pojawiać się gdy jakiś uczeń rozwiąże zadanie.
        </p>
      </div>
    </div>
    <div v-else>
      <div class="row my-2 c-AnswersComponent__head-row">
        <div class="col-2">Data</div>
        <div class="col-2">Imię</div>
        <div class="col-2">Pytanie</div>
        <div class="col-2 text-center">Ilustracja</div>
        <div class="col-2 text-center">Odpowiedź</div>
        <div class="col-2 text-center">Poprawna</div>
      </div>
      <div class="row align-items-center my-4 c-AnswersComponent__answer-row"
           :class="{
          'bg-danger text-light': !answer.answerOption.isCorrect,
          'c-AnswersComponent__answer-row--old':new Date().toLocaleDateString() !== new Date(answer.createdAt).toLocaleDateString(),
          'c-AnswersComponent__answer-row--archived': answer.exercise.isArchived
          }"
           v-for="(answer, key, index) in answers"
           :key="index"
           v-show="!hideOldAnswers || new Date().toLocaleDateString() === new Date(answer.createdAt).toLocaleDateString()"
           v-if="answer.exercise"
      >
        <div class="col-2"
             :class="{'fw-bold': new Date().toLocaleDateString() === new Date(answer.createdAt).toLocaleDateString()}"
        >
          {{new Date().toLocaleDateString() === new Date(answer.createdAt).toLocaleDateString() ?
            new Date(answer.createdAt).toLocaleTimeString() :
            new Date(answer.createdAt).toLocaleString()
          }}
        </div>
        <div class="col-2"
             :class="{'fw-bold': true, 'fw-bold': new Date().toLocaleDateString() === new Date(answer.createdAt).toLocaleDateString()}"
        >
          {{answer.player.name}}
        </div>
        <div class="col-2">
          {{answer.exercise.content.length < 200 ? answer.exercise.content : answer.exercise.content.slice(0,200) + '...'}}
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
  </div>
</template>

<script>
export default {
  name: 'AnswersComponent',
  data(){
    return {
      hideOldAnswers: false
    }
  },
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

<style lang="scss">
//overflow-wrap: break-word
.c-AnswersComponent{

  &__answer-row,
  &__head-row{
    font-size: 10px;
    &--old{
      opacity: 0.8;
    }
    &--archived {
      opacity: 0.5;
    }
  }
  &__head-row{
    font-weight: 700;
  }
  &__answer-row{
  }
}
</style>