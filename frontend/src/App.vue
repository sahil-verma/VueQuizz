<template>
  <div id="app">
    <div id="nav">
      <router-link to="/" class="route-link-item">Home</router-link>
      <router-link to="/quiz/questions" class="route-link-item">Questions</router-link>
      <router-link to="/quiz/add-question" class="route-link-item">Add Question</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  height: 100%;
}
body {
  font-family: 'Montserrat', sans-serif;
  background-position: center;
  background-image: url('/images/backgrounds/home/bench-accounting-49909-unsplash.jpg');
  background-repeat: no-repeat;
  background-size: cover;
}

#question-quiz h1.title {
  font-size: 3em;
  font-family: 'Cabin Sketch', 'Montserrat', sans-serif;
}

#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;
    // border-radius: 100%;
    // border: 3px solid rgba($color: #000, $alpha: 0.1);
    // padding: 20px 15px;
    // background-color: #fff; 
    &.router-link-exact-active {
      color: #42b983;
    }
    padding: 0 10px;
  }
}
</style>
