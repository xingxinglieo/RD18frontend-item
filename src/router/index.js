import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Interface from '@/components/Home/Interface'
import logincontain from '@/components/Login/LoginContain'
import WaterFall from '@/components/Home/WaterFall'
import Recommendation from '@/components/Recommendation/navigation_face/OfficialNavigation'
import Page from '@/components/PhotoWall/Page'
import uploadcontent from '@/components/Release/upload'
import cardNote from '@/components/CardNote/cardNote'
import onlyphoto from '@/components/Release/onlyphoto'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/', name: 'HelloWorld',
      redirect: '/interface'
    },
    {
      path: '/login',
      component: logincontain
    },
    {
      path: '/page',
      component: Page
    },
    {
      path: '/interface',
      component: Interface,  // 主界面
      children: [
        {
          path: '',
          name: 'fall',
          component: WaterFall
        },
        {
          path: '/interface/recommend',  // 大数据推荐
          name: 'Recommendation',
          component: Recommendation,
          children: [
            {
              path: '/interface/recommend/cate',
              name: 'cate',
              component: () => import('@/components/Recommendation/navigation_face/Cate')
            },
            {
              path: '/interface/recommend/route',
              name: 'route',
              component: () => import('@/components/Recommendation/navigation_face/Route')
            },
            {
              path: '/interface/recommend/spot',
              name: 'spot',
              component: () => import('@/components/Recommendation/navigation_face/Spot')
            }
          ]
        },
        {
          path: '/interface/chatroom',
          name: 'chatroom',
          component: () => import('@/components/ChatRoom/Navigation')
        },
        {
          path: '/interface/management', // 好友
          name: 'management',
          component: () => import('@/components/Friend_management/Navigation'),
          children: [
            {
              path: '/interface/management/allUser',
              name: 'allUser',
              component: () => import('@/components/Friend_management/ShowList')
            },
            {
              path: '/interface/management/friends',
              name: 'friends',
              component: () => import('@/components/Friend_management/ShowList')
            },
            {
              path: '/interface/management/fans',
              name: 'fans',
              component: () => import('@/components/Friend_management/ShowList')
            },
            {
              path: '/interface/management/attention',
              name: 'attention',
              component: () => import('@/components/Friend_management/ShowList')
            },
            {
              path: '/interface/management/blacklist ',
              name: 'blacklist',
              component: () => import('@/components/Friend_management/ShowList')
            }
          ]
        },
        {
          path: '/interface/travel',  // 游记
          name: 'travel',
          component: () => import('@/components/Travel/navigation')
        }
      ]
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('@/components/Recommendation/details/Details'),
    },
    {
      path: '/alterMyInfo',
      component: () => import('@/components/Alter_info/AlterInfo'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/alterMailboxOrPassword',
      component: () => import('@/components/Alter_info/AlterMailboxOrPassword')
    },
    {
      path: '/upcontent',
      component: uploadcontent
    },
    {
      path: '/cardnote',
      component: cardNote
    },
    {
      path: '/onlyphoto',
      component: onlyphoto
    }
  ],
  mode: 'history'
})
