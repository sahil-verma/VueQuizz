import Vue from 'vue';
import Router from 'vue-router';
import QuizHome from './views/QuizHome.vue';
import QuizQuestions from './views/QuizQuestions.vue';
import AddQuestion from "./components/AddQuestion.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: QuizHome,
    },
    {
      path: '/quiz/add-question',
      name: 'Add Question',
      component: AddQuestion
    },
    {
      path: '/quiz/questions',
      name: 'Questions',
      component: QuizQuestions
    }
  ],
});
