// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import './element-variables.scss';
import Vuex from 'vuex'; 
Vue.use(Vuex); 
Vue.use(ElementUI);
Vue.config.productionTip = false
const store = new Vuex.Store({
	state:{
		
	},
	getters:{
		
	},
	mutations:{
		
	},
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

