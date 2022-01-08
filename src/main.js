import Vue from 'vue';
import {router} from './router';
import App from './App.vue';
import store from './store';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

import ApiService from './services/api.service';

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

//Snotify
import Snotify from 'vue-snotify';
import 'vue-snotify/styles/material.css';
import GoogleAuth from '@/config/google_auth.js'
const gauthOption = {
  clientId: '962530387564-6kg2v2jgug4r8gb259r6h6fkd9to3s0g.apps.googleusercontent.com',  
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

ApiService.init();
// Vue.use(VueRouter)

Vue.use(Vuex);
Vue.use(Snotify);

Vue.config.productionTip = false;

export var vue_instance = new Vue({
  store: store,
  router: router,
  nameL: 'App',
  render: h => h(App)
}).$mount('#app');
