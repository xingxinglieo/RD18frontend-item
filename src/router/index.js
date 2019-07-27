import Vue from 'vue'
import Router from 'vue-router'
/*import HelloWorld from '@/components/HelloWorld'*/
import Page from '@/components/fy/Page'
import PublishPhoto from '@/components/fy/PublishPhoto'
import HelloWorld from '@/components/HelloWorld'
import logincontain from '@/components/Login/LoginContain'
Vue.use(Router)
export default new Router({
  routes: 
    /*{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }*/
    [
    {path: '/',name: 'HelloWorld',component: HelloWorld},
    {path:'/login',component:logincontain},
    {path: '/page',component: Page},
    {path: '/publishphoto',component: PublishPhoto}
    ],
  mode: 'history'
 
})
