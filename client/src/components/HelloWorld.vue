<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Test Functions</h2>
    <ul>
      <li @click='getLoginStatus'>
        Login Status
      </li>
      <li @click='login'>
        Login
      </li>
      <li @click='logout'>
        Logout
      </li>
      <li @click='signin'>
        Sign In
      </li>
    </ul>

    <ul>
      <li @click='getUser'>
        Get User
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { getLoginStatus, login, logout, getUser } from '../api/facebook';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  public created() {
    // this.$http
    //   .get('/api')
    //   .then(response => response.data)
    //   .then((data) => {
    //     this.msg = data.message;
    //   });
  }

  public getLoginStatus(): void {
    getLoginStatus().subscribe((response) => console.log(response));
  }

  public login(): void {
    login().subscribe((response) => console.log(response));
  }

  public logout(): void {
    logout().subscribe((response) => console.log(response));
  }

  public signin(): void {
    getLoginStatus().subscribe((response) => console.log(response));
  }

  public getUser(): void {
    getUser().subscribe((response) => console.log(response));
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
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
