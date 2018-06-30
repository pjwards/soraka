// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import Vue from 'vue';
import App from './App';
import router from './router';
import {
  loadSDK,
} from './utils/facebook';

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
window.fbAsyncInit = function fbAsyncInit() {
  window.FB.init({
    appId: '1621617961401149',
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v3.0',
  });
};

loadSDK();
