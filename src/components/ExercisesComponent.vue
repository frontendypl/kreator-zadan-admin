<template>
  <div class="c-ExercisesComponent">
    <h3>Zadania:</h3>
    <h5 v-for="(exercise, key, index) in exercises" :key="index">
      {{exercise.name}} <button class="btn btn-danger" @click="$emit('deleteExercise', exercise._id)">usuń</button>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'ExercisesComponent',
  props: {
    exercises: {
      type: Array
    }
  }
}
</script>