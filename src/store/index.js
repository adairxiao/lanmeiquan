import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import My_userInfo from "@/store/my/userInfo"

export default new Vuex.Store({
  modules: {
    My_userInfo:My_userInfo,
  }
})
