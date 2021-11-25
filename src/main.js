import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';

import _ from 'lodash';
import Axios from 'axios';

Vue.config.productionTip = false;

// Make axios available on globally
Vue.prototype.$http = Axios;

// Use underscore throughout the application
Vue.use(_);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
