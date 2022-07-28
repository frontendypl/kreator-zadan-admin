<template>
  <div class="c-ExerciseFormComponent">
    <form>
      <div class="row">
        <div class="col-12 mb-3">
          <label class="col-form-label display-2">Treść zadania</label>
          <textarea
              type="text"
              class="form-control form-control-lg"
              :class="{'border-danger': errors.content}"
              placeholder="5 + 5 = __"
              v-model="content"
          ></textarea>
          <div class="row" v-if="errors.content">
            <div class="col">
              <p class="text-center text-danger fw-bold">{{errors.content.message}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-2">
          <h4>Odpowiedzi</h4>
          <div class="input-group mb-3" v-for="(answer, index) in answers" :key="answer.id">
            <div class="input-group-text">
              <input
                  class="form-check-input mt-0"
                  :class="{'border-danger': errors.isOneCorrect}"
                  type="checkbox"
                  data-type="answerCheckbox"
                  @change="e=>setAnswer({id: answer.id, isCorrect: e.target.checked ? e.target.checked:false})"
                  :checked="answer.isCorrect"
              >
            </div>
            <input
                type="text"
                class="form-control"
                :class="{'border-danger': errors[`answers.${index}.text`]}"
                @input="e=>setAnswer({id: answer.id, text: e.target.value})"
            >
            <button
                class="btn btn-danger"
                type="button"
                @click="deleteAnswer(answer.id)"
                :disabled="answers.length === 1"
            >
              Usuń
            </button>
            <div class="row" v-if="errors[`answers.${index}.text`]">
              <div class="col">
                <p class="text-center text-danger fw-bold">{{errors[`answers.${index}.text`].message}}</p>
              </div>
            </div>
<!--            <div class="row" v-if="answerErrors[index]">-->
<!--              <div class="col">-->
<!--                <p class="text-center text-danger fw-bold">{{answerErrors[index]}}</p>-->
<!--              </div>-->
<!--            </div>-->
          </div>

        </div>
      </div>
      <div class="row">
        <div class="col-12" v-if="errors.isOneCorrect">
          <p class="text-center text-danger fw-bold">{{errors.isOneCorrect.message}}</p>
        </div>
        <div class="col-12 mb-2">
          <button
              class="btn btn-primary w-100"
              type="button"
              @click="addNewAnswer"
          >
            Dodaj kolejną odpowiedź
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  name: 'ExerciseFormComponent',
  props: {
    errors: {
      type: Object
    }
  },
  computed: {
    ...mapState({
      answers: state=> state.exerciseModule.answers,
      exerciseContent: state=>state.exerciseModule.content
    }),
    content: {
      get(){
        return this.exerciseContent
      },
      set(val){
        this.setContent(val)
      }
    },
    answerErrors(){
      const answerErrors = {}
      for(let i=0; i<this.answers.length; i++){
        const text = `answers.${i}.text`
        if(this.errors.hasOwnProperty(text)){
          answerErrors[i] = 'Uzupełnij treść odpowiedzi.'
        }

      }
      return answerErrors
    }
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