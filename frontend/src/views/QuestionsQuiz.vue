<template>
  <div class="home">
    <img src="../assets/logo.png">
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
