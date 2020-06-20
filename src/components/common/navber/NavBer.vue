<template>
  <van-nav-bar @click-left="onClickLeft" @click-right="onClickRight">
    <template #left>
        <slot name="left-content"></slot>
    </template>
    <template #title>
        <slot name="title-content"></slot>
    </template>
    <template #right>
        <slot name="right-content"></slot>
    </template>
  </van-nav-bar>
</template>

<script>
import vanNavBar from "vant/lib/nav-bar";
import "vant/lib/nav-bar/style";

export default {
  name: "Topnavber",
  components: {
    vanNavBar
  },
  methods: {


    onClickLeft() {
      this.$emit("clickTopLeft")
    },
    onClickRight() {
      this.$emit("clickTopRight")
    },
  }
};
</script>

<style>
</style>