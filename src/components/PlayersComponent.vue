<template>

  <div class="c-PlayersComponent">
    <div class="row">
      <h3 class="c-PlayersComponent__head">
        Uczniowie:
      </h3>
    </div>
    <div v-if="!players.length">
      <div class="row">
        <div class="col">
          <p>
            Nie ma tu jeszcze nikogo.
          </p>
          <p>
            Udostepnij kod dostępu lub link:
            <a :href="`${frontUrl}/#/${activeList.shortCode}`" target="_blank">
              {{activeList.shortCode}}
            </a> aby mogli dołączyć.
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row my-2 justify-content-between c-PlayersComponent__head-row">
        <div class="col-2">Data</div>
        <div class="col-2">Imię</div>
        <div class="col-2">Odpowiedzi</div>
        <div class="col-2">Błędy</div>
        <div class="col-2">Akcje</div>
      </div>
      <div class="row align-items-center my-4 justify-content-between c-PlayersComponent__item-row"
           v-for="(player, key, index) in players"
           :class="{
           'list-completed': answers.filter(answer=> answer.player._id === player._id && answer.answerOption.isCorrect).length === exercises.length,
           'list-error' : answers.filter(answer=> answer.player._id === player._id && answer.answerOption.isCorrect).length > exercises.length
         }"
           :key="index"
      >
        <div class="col-2">
          {{new Date(player.createdAt).toLocaleString()}}
        </div>
        <div class="col-2 fw-bold">
          {{player.name}}
        </div>
        <div class="col-2" >
          {{answers.filter(answer=> answer.player._id === player._id && answer.answerOption.isCorrect).length}} / {{exercises.length}}
        </div>
        <div class="col-2 text-danger fw-bold">
          {{answers.filter(answer=> answer.player._id === player._id && !answer.answerOption.isCorrect).length}}
        </div>
        <div class="col-2">
          <button class="btn btn-danger c-ExercisesComponent__button" @click="handleDelete(player._id)">usuń</button>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
export default {
  name: 'PlayersComponent',
  props: {
    activeList: {
      type: Object,
      required: true
    },
    players: {
      type: Array
    },
    answers: {
      type: Array
    },
    exercises: {
      type: Array
    },
    frontUrl: {
      type: String,
      required: true
    }
  },
  methods:{
    handleDelete(id){
      this.$emit('deletePlayer', id)
    }
  }
}
</script>

<style lang="scss">
//overflow-wrap: break-word
.c-PlayersComponent{

  &__item-row,
  &__head-row{
    font-size: 10px;
  }
  &__head-row{
    font-weight: 700;
  }
  &__item-row{
  }

  .list-completed {
    background-color: darkseagreen;
  }

  .list-error {
    background-color: yellow;
  }
}
</style>