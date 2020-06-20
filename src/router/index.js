import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },

  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login,
      topNavber: () => import(/* webpackChunkName: "about" */ './../views/login/childcomponents/Topnavber.vue')
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    components:{
      default: import(/* webpackChunkName: "about" */ '../views/login/Forget.vue'),
      topNavber: () => import(/* webpackChunkName: "about" */ './../views/login/childcomponents/Topnavber.vue')
    } 
  },
  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/home/Home.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: 'history',


})


router.beforeEach((to, from, next) => {
  // ...
  console.log(to);

  next()
})
export default router
