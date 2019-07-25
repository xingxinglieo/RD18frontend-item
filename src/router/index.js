import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/fy/Page'
import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: 'HelloWorld',
			component: HelloWorld
		},
		{
			path: '/page',
			component: Page
		},
	],
	mode: 'history',
})
