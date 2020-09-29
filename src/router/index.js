import Vue from 'vue'
import VueRouter from 'vue-router'

import Navbar from '@/views/navbar/Navbar'
import Login from '@/views/login/Login.vue'
import Forget from '@/views/forget/Forget.vue'
import sendCode from '@/views/login/SendCode.vue'
import foundUser from '@/views/login/FoundUser'

Vue.use(VueRouter)

const My = ()=>import("@/views/my/MyHome.vue")
const userDetails = ()=>import("@/views/my/userInfo/UserDetails.vue")
const editInfo=()=>import("@/views/my/userInfo/EditInfo.vue")


const routes = [

  
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/navbar',
    name: 'NavBer',
    components: {
      NavBer: Navbar,
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: {
      default: Login,
    }
  },

  {
    path: '/sendCode',
    name: 'sendCode',
    meta: { title: "" },
    components: {
      default: sendCode,

    }
  },
  {
    path: '/foundUser',
    name: 'foundUser',
    meta: { title: "" },
    components: {
      default: foundUser,
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: { title: "忘记密码" },
    components: {
      default: Forget,
    }
  },

  {
    path: '/home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/home/Home.vue')
  }
  ,
  {
    path: '/my',
    name: 'My',
    components: {
      default: My,
    }
  },

  {
    path: '/userDetails',
    name: 'UserDetails',
    components: {
      default: userDetails,
    }
  },

  {
    path: '/editInfo',
    name: 'EditInfo',
    components: {
      default: editInfo,
    }
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',


})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to);

  next()
})
export default router
