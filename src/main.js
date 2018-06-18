// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import localforage from 'localforage';

import App from './App';
import router from './router';
import store from './store';

import data from './assets/data.json';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  async created() {
    await localforage.setItem('data', data);
    await store.dispatch('SET_PHRASES');
    await store.dispatch('SET_SETS');
  },
});
