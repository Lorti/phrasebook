import Vue from 'vue';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.min.css';

import App from './App';
import router from './router';
import store from './store';

import * as filters from './util/filters';
import title from './util/title';

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
});

Vue.mixin(title);

Vue.use(VueMaterial);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  mounted() {
    store.dispatch('FETCH_DATABASE').then(() => {
      document.dispatchEvent(new Event('render-event'));
    });
  },
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
