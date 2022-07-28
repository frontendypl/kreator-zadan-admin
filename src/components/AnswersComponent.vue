<template>
  <div class="c-AnswersComponent">
    <h3>Odpowiedzi:</h3>
<!--    <h5 v-for="(answer, key, index) in players" :key="index">{{player.name}}-->
<!--      <button class="btn btn-danger" @click="handleDelete(player._id)">Usuń</button>-->
<!--    </h5>-->
  </div>
</template>

<script>
export default {
  name: 'AnswersComponent',
  props: {
    answers: {
      type: Array
    }
  },
  methods:{

  }
}
</script>