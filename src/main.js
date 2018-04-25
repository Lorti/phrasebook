// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import localforage from 'localforage';

import App from './App';
import router from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

const data = {
  entries: {
    456: {
      id: 456,
      english: 'Good afternoon.',
      japanese: 'こんにちは。',
      romaji: 'Konnichiwa.',
      pronunciation: 'Kohn-nee-chee-wah',
      sets: [123],
    },
  },
  sets: {
    123: { id: 123, name: 'basics' },
  },
};

localforage.setItem('data', data);
