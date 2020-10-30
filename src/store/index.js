import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


import userInfo from "@/store/my/userInfo"

export default new Vuex.Store({
  state:{
    toast:null
  },
  modules: {
    userInfo,
  }
})
