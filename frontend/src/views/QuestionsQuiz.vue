<template>
  <div id="question-quiz" class="containter has-text-centered">
    <h1 class="title">VueQuizz</h1>
    <h2 class="subtitle">An Aamazingly Awesome Quiz</h2>
    <AddQuestion />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import AddQuestion from '@/components/AddQuestion.vue'; // @ is an alias to /src

@Component({
  components: {
    AddQuestion,
  },
})
export default class QuestionsForm extends Vue {}
</script>


