<template>
  <section class="container">
    <h1>Questions</h1>
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

  constructor() {
    super();
    // initialize an instance of QuizApiService
    this.quizApi = new QuizApiService;
  }

  created(): void {
    // get the list of questions
    this.quizApi.getQuestions().then((response: any) => {
        console.log(response.data);
    });
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
</style>

