import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import login_store from './login_store'
import recommend_store from './recommend_store'
import navigation_store from './navigation_store'
import management_store from './friend_management_store'
import waterfall_store from './waterfall_store'
import chatroom_store from './chatroom_store'

export default new vuex.Store({
  modules: {
    'login': login_store,
    'recommend': recommend_store,
    'navigation': navigation_store,
    'management': management_store,
    'waterfall': waterfall_store,
    'chatroom': chatroom_store
  }
})