<template>
  <div class="c-ExercisesComponent">
    <div class="row">
      <h3 class="c-ExercisesComponent__head">
        Zadania:
        <slot v-if="exercises.length"/>
      </h3>
    </div>
    <div v-if="!exercises.length">
      <p>
        Brak. Kliknij przycisk bo dodać pierwsze zadanie: <slot />
      </p>

    </div>
    <div v-else>
      <div class="row my-2 c-ExercisesComponent__head-row">
        <div class="col-2">Data</div>
        <div class="col-2">Nazwa</div>
        <div class="col-2">Pytanie</div>
        <div class="col-2">Ilustracja</div>
        <div class="col-2">Odpowiedzi:</div>
        <div class="col-2">Akcje:</div>
      </div>
      <div class="row align-items-center my-2 border-top c-ExercisesComponent__exercise-row"
           v-for="exercise in exercises"
           :class="{'archived' :exercise.isArchived}"
           :key="exercise._id"
      >
        <div class="col-2"
        >
          {{new Date().toLocaleDateString() === new Date(exercise.createdAt).toLocaleDateString() ?
            new Date(exercise.createdAt).toLocaleTimeString() :
            new Date(exercise.createdAt).toLocaleString()
          }}
        </div>
        <div class="col-2">
          {{exercise.name}}
        </div>
        <div class="col-2" :class="{'written-font': !!exercise.contentFont}">
          {{exercise.content.length < 200 ? exercise.content : exercise.content.slice(0,200) + '...'}}
        </div>
        <div class="col-2">
          <img class="img-fluid" alt=""
               :src="exercise.image.url"
               v-if="exercise.image && exercise.image.srcType === 'url' "
          >
          <img class="img-fluid"
               :src="`data:${exercise.image.mimetype};base64,${exercise.image.src}`"
               :alt="exercise.image.originalname"
               v-if="exercise.image && exercise.image.srcType === 'buffer' "
          >
        </div>
        <div class="col-2" :class="{'written-font': !!exercise.answersFont}">
          <p v-for="(option, key, index) in exercise.answerOptions"
             :class="{'text-success fw-bold':option.isCorrect}"
             :key="index"
          >
            {{option.text}}
          </p>
        </div>
        <div class="col-2 col--action">
          <button class="btn  c-ExercisesComponent__button"
                  :data-test="exercise.isArchived"
                  :class="[exercise.isArchived ? 'btn-success':'btn-danger']"
                  :title="exercise.isArchived ? 'Kliknij by zadanie znów było widoczne.':'Ukryj to zadanie. Nie pojawi się do rozwiązywania.'"
                  @click="$emit('switchExercise', {exerciseId:exercise._id, isArchived: !exercise.isArchived})">
            {{exercise.isArchived ? 'Pokaż' : 'Ukryj'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExercisesComponent',
  data(){
    return {
    }
  },
  props: {
    exercises: {
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
.c-ExercisesComponent{

  &__exercise-row,
  &__head-row{
    font-size: 10px;
    &--old{
      opacity: 0.8;
    }
  }
  &__head-row{
    font-weight: 700;
  }
  &__exercise-row{
  }

  &__button{
    font-size: 10px;
    padding: 0.2em 0.5em;
  }

  .archived {
    div:not(.col--action){
      opacity: 0.5;
    }
  }
}
</style>

<!--<template>-->
<!--  <div class="c-ExercisesComponent">-->
<!--    <h3>Zadania:</h3>-->
<!--    <div class="row" v-for="(exercise, key, index) in exercises" :key="index">-->
<!--      <div class="col">-->
<!--        {{exercise.name}} <button class="btn btn-danger" @click="$emit('deleteExercise', exercise._id)">usuń</button>-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--export default {-->
<!--  name: 'ExercisesComponent',-->
<!--  props: {-->
<!--    exercises: {-->
<!--      type: Array-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->