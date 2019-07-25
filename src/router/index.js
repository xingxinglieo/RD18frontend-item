import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home/Home'
import logincontain from '@/components/Login/LoginContain'
import AlterUserInfo from '@/components/Alter-info/AlterInfo'
import AlterMailboxOrPassword from '@/components/Alter-info/AlterMailboxOrPassword'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/login',
      component:logincontain
    },
    {
      path:'/home',
      component: Home
    },
    {
      path:'/alterMyInfo',
      component: AlterUserInfo
    },
    {
      path:'/alterMailboxOrPassword',
      component: AlterMailboxOrPassword
    }
    
  ],
  mode: 'history'
})
