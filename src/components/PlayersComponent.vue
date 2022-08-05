<template>
  <div class="c-PlayersComponent">
    <h3>Uczniowie:</h3>
    <h5 v-for="(player, key, index) in players" :key="index">
      <router-link :to="{name: 'PlayerView', params: {listId, playerId: player._id}}">
        {{player.name}}
      </router-link>
      <button class="btn btn-danger" @click="handleDelete(player._id)">Usuń</button>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'PlayersComponent',
  props: {
    listId: {
      type: String,
      required: true
    },
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