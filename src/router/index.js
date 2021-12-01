import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: function() {
      return import(/* webpackChunkName: "about" */ "./../views/home/home.vue");
    },
  },
  {
    path: "/form",
    name: "Form",
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "./../views/home/taskForm.vue"
      );
    },
  },
  {
    path: "/solveTask",
    name: "SolveTask",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "./../views/home/solveTask.vue"
      );
    },
  },
  {
    path: "/taskDetails",
    name: "TaskDetails",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(
        /* webpackChunkName: "about" */ "./../views/home/taskDetails.vue"
      );
    },
  },
];
const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
