import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

import recommend_store from './recommend_store'
import navigation_store from './navigation_store'
import management_store from './friend_management_store'
import waterfall_store from './waterfall_store'

export default new vuex.Store({
  modules: {
    'recommend': recommend_store,
    'navigation': navigation_store,
    'management': management_store,
    'waterfall': waterfall_store
  }
})