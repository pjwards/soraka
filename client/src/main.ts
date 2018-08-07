import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import '@/vuetify';
import '@/registerServiceWorker';

import {
  loadSDK,
  asyncInit,
} from '@/api/facebook';
import {
  InitParams,
} from '@/facebook.interfaces';
import { currentUser } from '@/api/user';
import { User } from '@/models/user';

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
  currentUser().subscribe((user: User | null) => store.dispatch('login', user));
});

loadSDK();
