import Vue from 'vue';
import Router from 'vue-router';
import Sets from '@/components/Sets';
import Phrases from '@/components/Phrases';
import Favorites from '@/components/Favorites';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: 'sets',
    },
    {
      path: '/sets',
      component: Sets,
    },
    {
      path: '/sets/favorites',
      props: true,
      component: Favorites,
    },
    {
      path: '/sets/:set',
      props: true,
      component: Phrases,
    },
  ],
});
