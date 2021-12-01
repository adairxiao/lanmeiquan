import Vue from 'vue'
import Vuex from 'vuex'
import Public from "./Public"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Public,
    mode: 'hash'
  }
})
