import Vue from 'vue';
import Router from 'vue-router';
import Base from './components/base/base.component';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Base,
    },
  ],
});
