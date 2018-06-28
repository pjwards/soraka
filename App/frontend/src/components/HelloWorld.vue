<template>
  <div class='hello'>
    <h1 @click='test'>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href='https://vuejs.org'
          target='_blank'
        >
          Core Docs
        </a>
      </li>
      <li>
        <a
          href='https://forum.vuejs.org'
          target='_blank'
        >
          Forum
        </a>
      </li>
      <li>
        <a
          href='https://chat.vuejs.org'
          target='_blank'
        >
          Community Chat
        </a>
      </li>
      <li>
        <a
          href='https://twitter.com/vuejs'
          target='_blank'
        >
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a
          href='http://vuejs-templates.github.io/webpack/'
          target='_blank'
        >
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a
          href='http://router.vuejs.org/'
          target='_blank'
        >
          vue-router
        </a>
      </li>
      <li>
        <a
          href='http://vuex.vuejs.org/'
          target='_blank'
        >
          vuex
        </a>
      </li>
      <li>
        <a
          href='http://vue-loader.vuejs.org/'
          target='_blank'
        >
          vue-loader
        </a>
      </li>
      <li>
        <a
          href='https://github.com/vuejs/awesome-vue'
          target='_blank'
        >
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
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
      msg: 'Welcome to Your Vue.js App'
    };
  },
  methods: {
    test: () => {
      if (!window.FB) {
        return;
      }

      window.FB.getLoginStatus(response => {
        console.log(response);
        window.FB.login(function(response) {
          if (response.authResponse) {
            console.log('Welcome!  Fetching your information.... ');
            window.FB.api('/me', function(response) {
              console.log('Good to see you, ' + response.name + '.');
            });
          } else {
            console.log('User cancelled login or did not fully authorize.');
          }
        });
        // if (response.status === 'connected') {
        //   // The user is logged in and has authenticated your
        //   // app, and response.authResponse supplies
        //   // the user's ID, a valid access token, a signed
        //   // request, and the time the access token
        //   // and signed request each expire.
        //   const uid = response.authResponse.userID;
        //   const accessToken = response.authResponse.accessToken;
        // } else if (response.status === 'authorization_expired') {
        //   // The user has signed into your application with
        //   // Facebook Login but must go through the login flow
        //   // again to renew data authorization. You might remind
        //   // the user they've used Facebook, or hide other options
        //   // to avoid duplicate account creation, but you should
        //   // collect a user gesture (e.g. click/touch) to launch the
        //   // login dialog so popup blocking is not triggered.
        // } else if (response.status === 'not_authorized') {
        //   // The user hasn't authorized your application.  They
        //   // must click the Login button, or you must call FB.login
        //   // in response to a user gesture, to launch a login dialog.
        // } else {
        //   // The user isn't logged in to Facebook. You can launch a
        //   // login dialog with a user gesture, but the user may have
        //   // to log in to Facebook before authorizing your application.
        // }
      });
    }
  }
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
