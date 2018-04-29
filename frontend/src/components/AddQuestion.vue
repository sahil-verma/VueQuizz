<template>
  <section class="container">
    <div class="columns">
      <div class="column is-three-fifths is-block-mobile">
        <input type="text" class="input" v-model="question.text" placeholder="Enter your question here" style="width:80%">
      </div>
      <div class="column is-block-mobile">
        <button v-on:click.stop="addButtonClick" class="button is-primary"><i class="fas fa-plus"></i>Add to Quiz</button>
      </div>
    </div>
    
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Questions API Service handler
import { QuizApiService } from '../services/quiz.api'

@Component
export default class AddQuestion extends Vue {

  // declare class properties
  question: Object;
  quizApi: QuizApiService;

  constructor() {
    super();
    // Instantiate the questions object to store the input text in 'text' field
    this.question = {
      text: ""
    };
    // initialize an instance of QuizApiService
    this.quizApi = new QuizApiService;
  }

  

  // onClick event handler for the AddQuestionButton
  addButtonClick (): void {
    this.quizApi.postQuestion(this.question);
  }
  
}
</script>

<style scoped lang="scss">
section > div > div:first-child {
  text-align: right;
}
section > div > div:nth-child(2) {
  text-align: left;
}
i[class="fas fa-plus"] {
  padding-right: 10px;
}
</style>

