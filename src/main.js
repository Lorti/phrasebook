import Vue from 'vue';
import VueMaterial from 'vue-material';
import 'vue-material/dist/vue-material.min.css';
import App from './App.vue';
import router from './router';
import store from './store';
import PhrasebookDirectives from './directives';
import './registerServiceWorker';

Vue.use(VueMaterial);
Vue.use(PhrasebookDirectives);

Vue.config.productionTip = false;

function main() {
  // eslint-disable-next-line no-new
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    mounted() {
      document.dispatchEvent(new Event('rendered'));
    },
  });
}

store.dispatch('FETCH_DATABASE').then(main);
