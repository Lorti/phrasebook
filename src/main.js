import Vue from 'vue';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.min.css';

import App from './App';
import router from './router';
import store from './store';

import * as filters from './util/filters';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.use(VueMaterial);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  async created() {
    await store.dispatch('FETCH_DATABASE');
  },
});
