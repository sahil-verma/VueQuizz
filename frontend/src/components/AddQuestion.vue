<template>
  <section class="container">
    <div id="add-form">
      <div class="field">
        <div class="control">
          <input id="question-input-box" class="input" type="text" placeholder="Enter your question here" v-model="question.text">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Enter the correct answer here" v-model="question.correctAnswer">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Enter a wrong answer here">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Enter a wrong answer here">
        </div>
      </div>

      <div class="field add-button-container">
        <div class="control">
          <button v-on:click.stop="addButtonClick" class="button is-primary"><i class="fas fa-plus"></i>Add to Quiz</button>
        </div>
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
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-content: center;
}

#add-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  width: fit-content;
  padding: 1em;
  background-color: rgba($color: #ffffff, $alpha: 0.5);
  border-radius: 3px;

  &:hover {
      box-shadow: 0px 0px 3px rgba($color: #000000, $alpha: 0.3);
    }

  & #question-input-box {
      width: 50vw;
    }

  & #answer-input-box {
      width: 30vw;
    }

  & .add-button-container {
      width: 100%;
      & .control {
        text-align: right;
      }
    }

    & .field:not(:last-child) {
        width: 100%;
      }
}

i[class="fas fa-plus"] {
  padding-right: 10px;
}
</style>

