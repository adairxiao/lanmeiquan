import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dd from 'gdt-jsapi';
import { Toast } from 'vant'

var hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks: hacks,
})

Vue.use(Toast)

Vue.config.productionTip = false
// 专有钉钉 JSAPI 的方法挂载到vue原型上
Vue.prototype.$dd = dd

const app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')


export default app