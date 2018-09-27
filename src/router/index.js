import Vue from 'vue';
import Router from 'vue-router';
import Favorites from '@/components/Favorites.vue';
import NotFoundComponent from '@/components/NotFoundComponent.vue';
import Phrases from '@/components/Phrases.vue';
import Privacy from '@/components/Privacy.vue';
import Sets from '@/components/Sets.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Sets,
    },
    {
      path: '/sets/favorites/',
      props: true,
      component: Favorites,
    },
    {
      path: '/sets/:set/:slug/',
      props: true,
      component: Phrases,
    },
    {
      path: '/privacy/',
      component: Privacy,
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
