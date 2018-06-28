// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import axios from 'axios';
import Vue from 'vue';
import App from './App';
import router from './router';

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

(function loadFacebookSDK(d, s, id) {
  const fjs = d.getElementsByTagName(s)[0];

  if (d.getElementById(id)) {
    return;
  }

  const js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/ko_KR/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
