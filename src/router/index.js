import Vue from "vue";
import VueRouter from "vue-router";
import mImg from "@/components/mImg/index.vue";
import pImg from "@/components/pImg/index.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
  },
];

export const pcRouter = [
  {
    path: "/home",
    name: "Home",
    components: {
      default: function() {
        return import(/* webpackChunkName: "about" */ "@/views/pc/home.vue");
      }
    },
  },
  ,
  {
    path: "/form",
    name: "Form",
    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/pc/taskForm.vue"
        );
      },
      headerImg: pImg,
    },
  },
  {
    path: "/solveTask",
    name: "SolveTask",
    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/pc/solveTask.vue"
        );
      },
      headerImg: pImg,
    },
  },
  {
    path: "/taskDetails",
    name: "TaskDetails",

    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/pc/taskDetails.vue"
        );
      },
      headerImg: pImg,
    },
  },
];

export const moblicRouter = [
  {
    path: "/home",
    name: "Home",
    components: {
      default: function() {
        return import(/* webpackChunkName: "about" */ "@/views/home/home.vue");
      },
      headerImg: mImg,
    },
  },
  {
    path: "/form",
    name: "Form",
    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/home/taskForm.vue"
        );
      },
      headerImg: mImg,
    },
  },
  {
    path: "/solveTask",
    name: "SolveTask",
    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/home/solveTask.vue"
        );
      },
      headerImg: mImg,
    },
  },
  {
    path: "/taskDetails",
    name: "TaskDetails",

    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/home/taskDetails.vue"
        );
      },
      headerImg: mImg,
    },
  },
  {
    path: "/editTask",
    name: "EditTask",

    components: {
      default: function() {
        return import(
          /* webpackChunkName: "about" */ "@/views/home/editTask.vue"
        );
      },
      headerImg: mImg,
    },
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
