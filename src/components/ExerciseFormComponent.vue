<template>
  <div class="c-ExerciseFormComponent">
    <form>
      <div class="row">
        <div class="col-12 mb-3">
          <label class="col-form-label display-2">Treść zadania</label>
          <textarea type="text" class="form-control form-control-lg" placeholder="5 + 5 = __"
                    v-model="content"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <h4>Odpowiedzi</h4>
          <div class="input-group mb-3" v-for="answer in answers" :key="answer.id">
            <div class="input-group-text">
              <input class="form-check-input mt-0" type="checkbox" data-type="answerCheckbox"
                     @change="e=>setAnswer({id: answer.id, isCorrect: e.target.checked ? e.target.checked:false})"
                     :checked="answer.isCorrect"
              >
            </div>
            <input type="text" class="form-control"
                   @input="e=>setAnswer({id: answer.id, text: e.target.value})"
            >
            <button class="btn btn-danger" type="button"
                    @click="deleteAnswer(answer.id)"
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <button class="btn btn-primary w-100" type="button" @click="addNewAnswer">Dodaj kolejną odpowiedź</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'ExerciseFormComponent',
  computed: {
    content: {
      get(){
        return this.exerciseContent
      },
      set(val){
        this.setContent(val)
      }
    },
    ...mapState({
      answers: state=> state.exerciseModule.answers,
      exerciseContent: state=>state.exerciseModule.content
    })
  },
  methods: {
    ...mapActions({
      addNewAnswer: 'exerciseModule/addNewAnswer',
      deleteAnswer: 'exerciseModule/deleteAnswer',
      setAnswer: 'exerciseModule/setAnswer',
      setContent: 'exerciseModule/setContent'
    }),
  }
}
</script>