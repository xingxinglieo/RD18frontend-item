import Vue from 'vue'
import Router from 'vue-router'
import Interface from '@/components/Interface'
import Login from '@/components/Login'
import AlterUserInfo from '@/components/AlterInfo'

Vue.use(Router)

export default new Router({
  routes: [ 
    {
      path: '/',
      name: 'Interface',
      component: Interface
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/alterMyInfo',
      name: 'alter',
      component: AlterUserInfo
    }
  ],
  mode: 'history'
})
