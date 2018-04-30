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
                <button class="button is-danger" v-on:click.stop.prevent="editMode = !editMode"><i class="fas fa-edit" style="padding-right:0 !important"></i></button>
              </div>
            </nav>
            
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="question in questions" v-if="questions.length > 0">
          <td>
            <div class="card">
              <div class="card-header">
                {{question.text}}
              </div>
              <div class="card-content">
                <div class="field">
                  <div class="control" style="width:60%">
                    <div class="columns is-multiline">
                      <div class="column is-half">
                        <label class="radio">
                          <input type="radio" name="question">
                          {{question.correctAnswer}}
                        </label>
                      </div>
                      <div class="column is-half">
                        <label class="radio">
                          <input type="radio" name="question">
                          {{question.wrongAnswer1}}
                        </label>
                      </div>
                      <div class="column is-half">
                        <label class="radio">
                          <input type="radio" name="question">
                          {{question.wrongAnswer2}}
                        </label>
                      </div>
                      <div class="column is-half">
                        <label class="radio">
                          <input type="radio" name="question">
                          {{question.wrongAnswer3}}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-footer" v-if="editMode">
                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link"><i class="fas fa-edit"></i>Edit</button>
                  </div>
                  <div class="control">
                    <button class="button is-danger"><i class="fas fa-trash-alt"></i>Delete</button>
                  </div>
                </div>
              </div>
            </div> 
          </td>
        </tr>
        <tr v-if="questions.length > 0">
          <td>
            <div class="field is-pulled-right">
              <p class="control">
                <a class="button is-success">
                  Done
                </a>
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
  </section>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
// import Questions API Service handler
import { QuizApiService } from '../services/quiz.api';

@Component
export default class QuizQuestions extends Vue {

  // declare class properties
  quizApi: QuizApiService;
  questions: any = [];
  editMode: boolean = false;

  constructor() {
    super();
    // initialize an instance of QuizApiService
    this.quizApi = new QuizApiService;
  }

  created(): void {
    // get the list of questions
    this.quizApi.getQuestions()
      .then((response: any) => this.questions = response.data)
      .catch((error: any) => this.quizApi.handleRequestErrors(error));
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

