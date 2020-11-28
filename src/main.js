import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Toast } from 'vant'

var hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks: hacks,
})

Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
