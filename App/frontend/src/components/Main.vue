<template>
  <div class='hello'>
    <h1>{{ msg }}</h1>
    <h2>Test Functions</h2>
    <ul>
      <li @click='getLoginStatus'>
        Login Status
      </li>
      <li @click='login'>
        Login
      </li>
    </ul>
  </div>
</template>

<script>
import {
  getLoginStatus,
  login,
} from '../utils/facebook';

export default {
  created() {
    // this.$http
    //   .get('/api')
    //   .then(response => response.data)
    //   .then((data) => {
    //     this.msg = data.message;
    //   });
  },
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  methods: {
    getLoginStatus: () => {
      getLoginStatus();
    },
    login: () => {
      login();
    },
  },
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
88
