import Vue from 'vue';
import Router from 'vue-router';
import Favorites from '@/components/Favorites';
import NotFoundComponent from '@/components/NotFoundComponent';
import Phrases from '@/components/Phrases';
import Sets from '@/components/Sets';

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
      path: '/sets/:set/:slug',
      props: true,
      component: Phrases,
    },
    {
      path: '*',
      component: NotFoundComponent,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});
