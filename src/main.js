import Vue from 'vue'
import App from './App.vue'
import router from './router'

import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue);

import axios from 'axios'

import {bearerToken} from "./api";

axios.defaults.headers.common['Authorization'] = 'Bearer ' + bearerToken;

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
