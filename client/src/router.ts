import Vue from 'vue';
import Router from 'vue-router';
import MainComponent from '@/modules/nibble/components/main/main.component';
import SignUpComponent from '@/components/sign-up/sign-up.component';
import LogInComponent from '@/components/log-in/log-in.component';
import BaseComponent from '@/components/base/base.component';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LogInComponent,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpComponent,
    },
    {
      path: '/',
      component: BaseComponent,
      children: [
        {
          path: '',
          component: MainComponent,
        },
      ],
    },
  ],
});
