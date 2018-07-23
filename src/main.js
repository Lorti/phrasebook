import Vue from 'vue';
import VueMaterial from 'vue-material';

import 'vue-material/dist/vue-material.min.css';

import App from './App';
import router from './router';
import store from './store';

Vue.use(VueMaterial);
Vue.config.productionTip = false;

function setTitle(title) {
  if (title) {
    document.title = `${title} | 🇯🇵 Phrasebook`;
  } else {
    document.title = '🇯🇵 Phrasebook';
  }
}

Vue.directive('document-title', {
  inserted(el, binding) { setTitle(binding.value); },
  update(el, binding) { setTitle(binding.value); },
});

store.dispatch('FETCH_DATABASE')
  .then(() => {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App),
      mounted() {
        document.dispatchEvent(new Event('render-event'));
      },
    });
  });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}
