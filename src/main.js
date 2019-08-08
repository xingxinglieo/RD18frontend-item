// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios';
import ElementUI from 'element-ui';
import './element-variables.scss';
import Vuex from 'vuex';
import store from './store/index'
import Qs from 'qs'
axios.defaults.baseURL = 'http://47.112.212.177:80/qinglv'; //配置全局URL 待写
axios.defaults.timeout = 5000;
Vue.prototype.$axios = axios;
Vue.prototype.$Qs = Qs;
Vue.use(Vuex); 
Vue.use(ElementUI);
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
	router,
	store,
  components: { App },
  template: '<App/>'
})
