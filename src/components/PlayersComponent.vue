<template>
  <div class="c-PlayersComponent">
    <h3>Uczniowie:</h3>
    <h5 v-for="(player, key, index) in players" :key="index">{{player.name}}
      <button class="btn btn-danger" @click="handleDelete(player._id)">Usuń</button>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'PlayersComponent',
  props: {
    players: {
      type: Array
    }
  },
  methods:{
    handleDelete(id){
      this.$emit('deletePlayer', id)
    }
  }
}
</script>