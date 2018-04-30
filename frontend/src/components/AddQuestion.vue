<template>
  <section class="container" v-if="showAddQuestionForm">
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
        <div class="help is-dark is-pulled-left">
          <p>Please enter three wrong answers below:</p>
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Wrong answer 1" v-model="question.wrongAnswer1">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Wrong answer 2" v-model="question.wrongAnswer2">
        </div>
      </div>

      <div class="field">
        <div class="control">
          <input id="answer-input-box" class="input" type="text" placeholder="Wrong answer 3" v-model="question.wrongAnswer3">
        </div>
      </div>

      <div class="field add-button-container">
        <div class="control">
          <button v-on:click.stop="addButtonClick" class="button is-primary"><i class="fas fa-plus"></i>Add to Quiz</button>
        </div>
      </div>
    </div>
  </section>
  <section class="container" v-else-if="showSuccessMessage">
    <div class="box has-text-centered">
      <p><strong>Your question was added successfully!</strong></p>
      <router-link to="/quiz/questions" class="button is-success">All Questions</router-link>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Questions API Service handler
import { QuizApiService } from '../services/quiz.api'
import { fail } from 'assert';

@Component
export default class AddQuestion extends Vue {

  // declare class properties
  question: Object;
  quizApi: QuizApiService;
  showAddQuestionForm: boolean = true;
  showSuccessMessage: boolean = false;

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
    this.showAddQuestionForm = false;
    this.showSuccessMessage = true;
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
  background-color: rgba($color: #A59A84, $alpha: 0.2);
  border-radius: 3px;

  &:hover {
      box-shadow: 0px 0px 3px rgba($color: #000000, $alpha: 0.3);
    }

  & input {
    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: #666;
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: #666;
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
        color: #666
    }
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

