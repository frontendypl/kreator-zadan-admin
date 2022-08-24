<template>
  <div class="c-ExerciseFormComponent">
    <form>
      <div class="row mb-5">
        <div class="col-12 mb-3">
          <h5>Treść zadania:</h5>
        </div>
        <div class="col-12">
          <textarea
              type="text"
              class="form-control form-control-lg fs-1"
              :class="{'border-danger': errors.content && content===''}"
              placeholder="5 + 5 = __"
              v-model="content"
          ></textarea>
          <div class="row" v-if="errors.content && content===''">
            <div class="col">
              <p class="text-center text-danger fw-bold">{{errors.content.message}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 mb-1">
          <h5>Odpowiedzi:</h5>
          <p>Dodaj kilka odpowiedzi. Zaznacz jedną prawidłową.</p>
        </div>
        <div class="col-12 mb-2">
          <div class="input-group input-group-lg mb-3" v-for="(answer, index) in answers" :key="answer.id">
            <div class="input-group-text" title="Zaznacz jeśli to prawidłowa odpowiedź">
              <input
                  class="form-check-input mt-0"
                  :class="{'border-danger': !isAnyAnswerOptionCorrect && errors.anyCorrect}"
                  type="checkbox"
                  data-type="answerCheckbox"
                  @change="e=>setAnswer({id: answer.id, isCorrect: e.target.checked ? e.target.checked:false})"
                  :checked="answer.isCorrect"
                  title="Zaznacz jeśli to prawidłowa odpowiedź"
              >
            </div>
            <input
                type="text"
                class="form-control"
                :class="{'border-danger': errors.anyEmpty && !answers[index].text}"
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
            <div class="row" v-if="errors.anyEmpty && !answers[index].text">
              <div class="col">
                <p class="text-center text-danger fw-bold">{{errors.anyEmpty.message}}</p>
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
        <div class="col-12" v-if="errors.anyCorrect && !isAnyAnswerOptionCorrect">
          <p class="text-center text-danger fw-bold">{{errors.anyCorrect.message}}</p>
        </div>
        <div class="col-12 mb-2">
          <button
              class="btn btn-primary btn-lg w-100"
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
import {mapState, mapActions, mapGetters} from "vuex";

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
      exerciseContent: state=>state.exerciseModule.content,
    }),
    ...mapGetters({
      isAnyAnswerOptionCorrect:'exerciseModule/isAnyAnswerOptionCorrect'
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