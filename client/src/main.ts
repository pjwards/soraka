import Vue from 'vue';
import './plugins/axios';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/registerServiceWorker';

import {
  loadSDK,
  asyncInit,
  subscribe,
} from '@/api/facebook';
import {
  InitParams,
  StatusResponse,
  EVENT,
} from '@/facebook.interfaces';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// load facebook sdk
window.fbAsyncInit = asyncInit({
  appId: process.env.VUE_APP_FACEBOOK_APP_ID,
  autoLogAppEvents: true,
  xfbml: false,
  version: process.env.VUE_APP_FACEBOOK_API_VERSION,
} as InitParams, () => {
  subscribe(
    EVENT.AUTH_AUTH_RESPONSE_CHANGE,
    (response?: StatusResponse) => console.log(response),
  );
});

loadSDK();
