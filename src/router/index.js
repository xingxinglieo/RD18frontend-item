import Vue from 'vue'
import Router from 'vue-router'
<<<<<<< HEAD
/*import HelloWorld from '@/components/HelloWorld'*/

import Page from '@/components/fy/Page'

=======
import HelloWorld from '@/components/HelloWorld'
import logincontain from '@/components/Login/LoginContain'
>>>>>>> 55360c9fdffad5670d0e128250a1524911481692
Vue.use(Router)

export default new Router({
  routes: [
<<<<<<< HEAD
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/

    {
      path: '/page',
      component: Page
    }
  ],
  mode: 'history'
=======
    {path: '/',name: 'HelloWorld',component: HelloWorld},
	{path:'/login',component:logincontain},
  ]
>>>>>>> 55360c9fdffad5670d0e128250a1524911481692
})
