<template>
  <div class="van-bavber">
    <left-nav-ber v-on:clickTopLeft="clickLeftEvent">
      <template #left-content>
        <van-icon name="cross" size="20" />
      </template>
    </left-nav-ber>
  </div>
</template>

<script>
import leftNavBer from "components/common/navber/NavBer";
import VanIcon from "vant/lib/icon";

export default {
  data() {
    return {
      routerTo: null,
      routerFrom: null
    };
  },
  components: {
    leftNavBer,
    VanIcon
  },
  methods: {
    // 点击left事件
    clickLeftEvent() {
      // 获取当前path
      const path = this.$route.fullPath;

      if (path.includes("login", 1) || path === "/") {
        this.clickClose();
      }
    },

    clickClose() {
      // login顶部导航栏点击事件
      alert("关闭成功！");
    },
  }
};
</script>

<style>
</style>