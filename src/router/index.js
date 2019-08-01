import Vue from 'vue'
import Router from 'vue-router'
import Page from '@/components/fy/Page'
import Home from '@/components/Home/Home'
import AlterUserInfo from '@/components/Alter-info/AlterInfo'
import AlterMailboxOrPassword from '@/components/Alter-info/AlterMailboxOrPassword'
import uploadcontent from '@/components/Release/uploadcontent'
Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/page',
			component: Page
		},
		{
			path: '/home',
			component: Home
		},
		{
			path: '/alterMyInfo',
			component: AlterUserInfo
		},
		{
			path: '/alterMailboxOrPassword',
			component: AlterMailboxOrPassword
		},
		{
			path: '/upcontent',
			component:uploadcontent
		},
	],
	mode: 'history'
})
