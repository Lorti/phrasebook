import Vue from 'vue';
import Router from 'vue-router';
import Sets from '@/components/Sets';
import Phrases from '@/components/Phrases';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Sets',
      component: Sets,
    },
    {
      path: '/sets/:set',
      props: true,
      name: 'Phrases',
      component: Phrases,
    },
  ],
});
