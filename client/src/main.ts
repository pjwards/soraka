import Vue from 'vue';
import AppComponent from '@/app.component';
import router from '@/router';
import store from '@/store';
import '@/vuetify';
import '@/registerServiceWorker';
import '@/axios';
import {
  currentUser,
} from '@/api/user';
import { User } from '@/models/user';
import { UserInterface } from '@/types/domain/inteface/user';

Vue.config.productionTip = false;

/* tslint:disable:no-unused-expression */
new Vue({
  el: '#app',
  components: {
    AppComponent,
  },
  router,
  store,
  render: (h) => h(AppComponent),
});
/* tslint:enable:no-unused-expression */

currentUser().subscribe((user: UserInterface) => store.dispatch('login', new User(user)));
