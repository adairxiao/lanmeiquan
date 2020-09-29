<template>
  <div class="van-bavber">
    <left-nav-ber v-on:clickTopLeft="clickLeftEvent">
      <template #left-content>
        <van-icon name="arrow-left" size="20" />
      </template>
      <template #title-content>{{title}}</template>
    </left-nav-ber>
  </div>
</template>

<script>
import leftNavBer from "@/components/common/navber/NavBer";
import VanIcon from "vant/lib/icon";
// import ForgetVue from "../Forget.vue";

export default {
  name: "navber",
  data() {
    return {
      title:"",
      routerTo: null,
      routerFrom: null
    };
  },
  props: {
  },
  mounted() {
    // 第一次创建组件时从router中mate取值去设置标题
    this.title=this.$route.meta.title
  },
  components: {
    leftNavBer,
    VanIcon
  },
  methods: {
    // 点击left事件
    clickLeftEvent() {
      const path = this.$route.fullPath;

      // 处理返回
      if (path.includes("forget", 1)) {
        this.Back(this.routerFrom).from();
      }

      if (path.includes("sendcode", 1)) {
        this.Back(this.routerFrom).from();
      }

    },
    Back(url) {
      // 处理返回
      const self = this;
      const obj = new Object();

      obj.from = function() {
        self.$router.push(url);
      };

      obj.KeepFrom = function() {
        // 处理保留数据返回
      };
      return obj;
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // 通过 `vm` 访问组件实例
      // vm.routerTo = to.fullPath;
      // vm.routerFrom = from.fullPath=== '/' && from.name ===null ? "/login": from.fullPath;
      vm.routerTo = to;
      vm.routerFrom = from;
      
    });
  },
  beforeRouterUpdata() {}
};
</script>

<style>
</style>