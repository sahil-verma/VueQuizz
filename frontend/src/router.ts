import Vue from 'vue';
import Router from 'vue-router';
import QuestionsQuiz from './views/QuestionsQuiz.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: QuestionsQuiz,
    }
  ],
});
