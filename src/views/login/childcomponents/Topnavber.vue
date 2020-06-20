<template>
  <div class="van-bavber">
    <left-nav-ber v-on:clickTopLeft="clickLeft">
      <template #left-content>
        <van-icon name="cross" size="18" />
      </template>
      <template #title-content>
      </template>
    </left-nav-ber>
  </div>
</template>

<script>

import leftNavBer from "../../../components/common/navber/NavBer";
import VanIcon from "vant/lib/icon";

export default {
  name: "Topnavber",
  components: {
    leftNavBer,
    VanIcon
  },
  methods: {
    clickLeft() {
      // 顶部导航栏点击事件
      alert("关闭成功！");
    }
  }
};
</script>

<style>
</style>