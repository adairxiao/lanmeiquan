import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const TabBar = () => import('components/content/Tabbar/TabBar')
const Login = () => import('@/views/login/Login')
const Forget = () => import('@/views/forget/Forget')
const sendCode = () => import('@/views/login/SendCode')
const foundUser = () => import('@/views/login/FoundUser')

const login = [
  {
    path: '/login',
    name: 'Login',
    meta:{title:''},
    component: Login,
    children: [
      {
        path: '',
        component: TabBar,
      },
    ],
  },

  {
    path: '/sendCode',
    name: 'sendCode',
    meta: { title: '' },
    components: {
      default: sendCode,
    },
  },
  {
    path: '/foundUser',
    name: 'foundUser',
    meta: { title: '' },
    components: {
      default: foundUser,
    },
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: { title: '忘记密码' },
    component:  Forget,
    children:[
      {
        path:'',

      }
    ]
  },
]

const My = () => import('@/views/my/MyHome')
const userDetails = () => import('@/views/my/userInfo/UserDetails')
const editInfo = () => import('@/views/my/userInfo/EditInfo')
const my = [
  {
    path: '/my',
    name: 'My',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ '@/views/home/Home'),
    component:{
      My
    }
  },

  {
    path: '/userDetails',
    name: 'UserDetails',
    component:{
      userDetails
    }
    
  },

  {
    path: '/editInfo',
    name: 'EditInfo',
    component:{
      editInfo
    }
   
  },
]

const baseRoute = [
  {
    path: '/',
    redirect: '/login',
  },
]

const router = new VueRouter({
  routes: [...baseRoute, ...login, ...my],
  mode: 'history',
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // ...
  // console.log(to);

  next()
})
export default router
