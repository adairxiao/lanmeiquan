import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import {Toast} from 'vant';


Vue.use(Toast);
// 给vue提供一个提示弹框
store.state.toast = Toast

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)

}).$mount('#app')

