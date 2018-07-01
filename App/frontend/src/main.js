// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import Vue from 'vue';
import App from './App';
import router from './router';
import {
  loadSDK,
  asyncInit,
  subscribe,
} from './api/facebook';

Vue.config.productionTip = false;
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App,
  },
  template: '<App/>',
});

// load facebook sdk
window.fbAsyncInit = asyncInit({
  appId: process.env.FACEBOOK_APP_ID,
  autoLogAppEvents: true,
  xfbml: true,
  version: process.env.FACEBOOK_API_VERSION,
}, () => {
  subscribe('auth.authResponseChange', response => console.log(response));
});

loadSDK();
