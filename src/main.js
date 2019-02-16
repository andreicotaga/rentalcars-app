import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import BootstrapVue from 'bootstrap-vue'
import VueLodash from 'vue-lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '../src/assets/styles/input.scss';

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);
Vue.use(VueLodash);

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
