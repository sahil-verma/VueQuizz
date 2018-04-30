<template>
  <section class="container">
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th class="has-text-centered">
            <nav class="level">
              <div class="level-item">
                <h1>Questions</h1>
              </div>
              <div class="level-right" v-if="questions.length > 0">
                <router-link to="/quiz/add-question" class="button is-primary" title="Add a new question"><i class="fas fa-plus" style="padding-right:0 !important"></i></router-link>
                <button class="button is-danger" v-on:click.stop.prevent="editMode = !editMode" title="Edit question"><i class="fas fa-edit" style="padding-right:0 !important"></i></button>
              </div>
            </nav>
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" v-if="questions.length > 0">
          <td>
            <form id="addQuestionForm" @submit="editQuestion">
              <div class="card">
                <div class="card-header">
                  {{(showEditForm != question.id) ? question.text : ""}}
                  <input name="questionText" class="input" type="text" v-bind:value="question.text" v-if="showEditForm == question.id">
                </div>
                <div class="card-content">
                  <div class="field">
                    <div class="control" style="width:60%">
                      <div class="columns is-multiline">
                        <div class="column is-half">
                          <label class="radio">
                            <input type="radio" name="question" v-if="showEditForm != question.id" v-on:click="setAnswer(question.id, question.correctAnswer)">
                            {{showEditForm != question.id ? question.correctAnswer : ""}}
                            <input type="text" name="correctAnswer" class="input" v-bind:value="question.correctAnswer" v-if="showEditForm == question.id">
                          </label>
                        </div>
                        <div class="column is-half">
                          <label class="radio">
                            <input type="radio" name="question" v-if="showEditForm != question.id" v-on:click="setAnswer(question.id, question.wrongAnswer1)">
                            {{showEditForm != question.id ? question.wrongAnswer1 : ""}}
                            <input type="text" name="wrongAnswer1" class="input" v-bind:value="question.wrongAnswer1" v-if="showEditForm == question.id">
                          </label>
                        </div>
                        <div class="column is-half">
                          <label class="radio">
                            <input type="radio" name="question" v-if="showEditForm != question.id" v-on:click="setAnswer(question.id, question.wrongAnswer1)">
                            {{showEditForm != question.id ? question.wrongAnswer2 : ""}}
                            <input type="text" name="wrongAnswer2" class="input" v-bind:value="question.wrongAnswer2" v-if="showEditForm == question.id">
                          </label>
                        </div>
                        <div class="column is-half">
                          <label class="radio">
                            <input type="radio" name="question" v-if="showEditForm != question.id" v-on:click="setAnswer(question.id, question.wrongAnswer1)">
                            {{showEditForm != question.id ? question.wrongAnswer3 : ""}}
                            <input type="text" name="wrongAnswer3" class="input" v-bind:value="question.wrongAnswer3" v-if="showEditForm == question.id">
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer" v-if="editMode">
                <div class="field is-grouped" v-if="showEditForm != question.id">
                  <div class="control">
                    <button class="button is-link" v-on:click.stop.prevent="displayEditForm(question.id)"><i class="fas fa-edit"></i>Edit</button>
                  </div>
                  <div class="control">
                    <button class="button is-danger" v-on:click.stop.prevent="deleteForm(question)"><i class="fas fa-trash-alt"></i>Delete</button>
                  </div>
                </div>
                <div v-else>
                  <div class="field is-grouped" v-if="showEditForm == question.id">
                    <div class="control">
                      <button class="button is-info" type="submit" v-on:click="questionEdited.id = question.id"><i class="fas fa-edit"></i>Submit</button>
                    </div>
                    <div class="control">
                      <button class="button is-danger" v-on:click.stop.prevent="showEditForm = -1; editMode = false"><i class="fas fa-trash-alt"></i>Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </td>
        </tr>
        <tr v-if="questions.length > 0">
          <td>
            <div class="field is-pulled-right">
              <p class="control">
                <button class="button is-success" v-on:click.stop.prevent="checkScore">
                  Done
                </button>
              </p>
            </div>
          </td>
        </tr>
        <tr v-if="questions.length === 0">
          <td>
            <div class="is-block content">
              <p>
                Oops! no questions.
              </p>
              <router-link to="/quiz/add-question" class="route-link-item"><i class="fas fa-plus"></i>Add New Question</router-link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div id="scoreModal" class="modal">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box content">
          <h1>{{userScore}}</h1>
        </div>
        
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="closeModal"></button>
    </div>
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Questions API Service handler
import { QuizApiService } from '../services/quiz.api';
import AddQuestion from '@/components/AddQuestion.vue';

@Component
export default class QuizQuestions extends Vue {

  // declare class properties
  quizApi: QuizApiService;
  questions: any = [];
  editMode: boolean = false;
  showAddQuestionForm = false;
  showEditForm: number = -1;
  questionEdited: any = {
    id: -1,
    text: "",
    correctAnswer: "",
    wrongAnswer1: "",
    wrongAnswer2: "",
    wrongAnswer3: ""
  }
  answersSelected: Array<Object> = [];
  userScore: string = "";

  constructor() {
    super();
    // initialize an instance of QuizApiService
    this.quizApi = new QuizApiService;
  }

  created(): void {
    // get the list of questions
    this.updateQuestionsList();
  }

  updateQuestionsList(): void {
    this.quizApi.getQuestions()
      .then((response: any) => this.questions = response.data)
      .catch((error: any) => this.quizApi.handleRequestErrors(error));
  }

  editQuestion(e: any): void {
    e.preventDefault();
    let form: any = e.target;

    this.questionEdited.text = form.questionText.value;
    this.questionEdited.correctAnswer = form.correctAnswer.value;
    this.questionEdited.wrongAnswer1 =form.wrongAnswer1.value;
    this.questionEdited.wrongAnswer2 =form.wrongAnswer2.value;
    this.questionEdited.wrongAnswer3 =form.wrongAnswer3.value;

    this.quizApi.putQuestion(this.questionEdited)
    .then((res: any) => {
      this.editMode = false;
      this.showEditForm = -1;
      this.updateQuestionsList();
    });
  }

  deleteForm(question: any): void {
    this.quizApi.deleteQuestion(question)
    .then((res: any) => this.updateQuestionsList());
  }

  setAnswer(id: number, answer: string) {
    if(!this.answersSelected.hasOwnProperty(id)) {
      Object.defineProperty(this.answersSelected, id, { value: answer, writable: true, enumerable: true});
    } else {
      this.answersSelected[id] = answer;
    }
  }

  checkScore(): void {

    // if done is pressed without completing the quiz
    if (this.answersSelected.length - 1 === this.questions.length) {

      let correctAnswers: number = 0;

      this.questions.map((question: any) => {

        if (question.correctAnswer === this.answersSelected[question.id]) {
          // if answer selected is correct
          correctAnswers++;
        }

      });

      this.userScore = (correctAnswers === this.questions.length) ? 
      `Hurray!!! You answered all questions correctly :D` : 
      (correctAnswers !== 0) ? 
      `You answered ${correctAnswers} out of ${this.questions.length} questions correctly!` : 
      `Sorry! no answers were correct :( \n Please try again.`;

      correctAnswers = 0;

      let modal = document.getElementById('scoreModal');
      if(modal != null) {
        modal.classList.add("is-active");
      }
      
    } else {
      alert("Please complete all questions before submission.");
    }

    
        
  }

  displayEditForm(id: number): void {
    if(this.showEditForm != -1) {
      alert("Please save changes to proceed.");
    } else {
      this.showEditForm = id;
    }
  }

  closeModal(): void {
    let modal = document.getElementById('scoreModal');
    if(modal != null) {
      modal.classList.remove("is-active");
    }
  }
  
}
</script>

<style scoped lang="scss">
section.container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 2em auto;
}
table {
  border-radius: 5px;
  max-width: 70vw;

  & .card-header {
      padding: 1em;
    }

  & .card-body {
      padding: 1em;
    }

  & .card-footer {
      padding: 1em;
    }
}
i {
  padding-right: 10px;
}
</style>

