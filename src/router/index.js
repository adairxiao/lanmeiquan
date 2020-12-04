import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const TabBar = () => import('components/content/Tabbar/TabBar')
const Login = () => import('@/views/login/Login')
const Forget = () => import('@/views/forget/Forget')

const login = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '' },
    component: Login,
    children: [
      {
        path: '',
        component: TabBar,
      },
    ],
  },
  {
    path: '/forget',
    name: 'Forget',
    meta: { title: '忘记密码' },
    component: Forget,
    children: [
      {
        path: '',
      },
    ],
  },
]
const Home = () => import('@/views/home/home')
const home = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{ path: '', component: TabBar }],
  },
]

const Find = () => import('@/views/find/find')
const find = [
  {
    path: '/find',
    name: 'Find',
    component: Find,
    children: [{ path: '', component: TabBar }],
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
    component: My,
  },
  {
    path: '/userDetails',
    name: 'UserDetails',
    component: userDetails,
    children: [
      {
        path: '',
        props: { title: '编辑个人主页' },
        component: TabBar,
      },
    ],
  },

  {
    path: '/editInfo',
    name: 'EditInfo',
    meta: { title: 'EditInfo' },
    component: editInfo,
    props: (route) => ({
      labelText: route.query.labelText,
      textType: route.query.textType,
      textval: route.query.textval,
    }),
    children: [
      {
        path: '',
        name: 'Name',
        props: { title: '修改昵称' },
        component: TabBar,
      },
    ],
  },
]

const baseRoute = [
  {
    path: '/',
    redirect: '/login',
  },
]

const routes = [...baseRoute, ...login, ...my,...home,...find]
const router = new VueRouter({
  routes,
  mode: 'history',
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 输入路由不正确重定向到login页面（已实现）
  // 未登录跳转login（未实现）
  // 以登录跳转找不到页面或者当前页（未实现）
  const rs = routes.map((e) => {
    return e.name
  })
  if (!rs.includes(to.name)) next({ name: 'Login' })
  else next()
})
export default router
