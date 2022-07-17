<template>
  <div class="c-PlayersListComponent">
    <h3>Uczniowie:</h3>
    <h5 v-for="(player, key, index) in players" :key="index">{{player.name}}</h5>
  </div>
</template>

<script>
export default {
  name: 'PlayersComponent',
  props: {
    players: {
      type: Array
    }
  }
}
</script>