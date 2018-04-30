<template>
  <div id="question-quiz" class="containter has-text-centered">
    <h1 class="title">VueQuizz</h1>
    <h2 class="subtitle">An Aamazingly Awesome Quiz</h2>
    <AddQuestion />
    <QuizQuestions />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import QuizQuestions from '@/views/QuizQuestions.vue'; // @ is an alias to /src
import AddQuestion from '@/components/AddQuestion.vue';

@Component({
  components: {
    AddQuestion,
    QuizQuestions
  },
})
export default class QuizHome extends Vue {}
</script>


