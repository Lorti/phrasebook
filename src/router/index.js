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
    {
      path: '/sets/:set/:slug',
      props: true,
      component: Phrases,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
