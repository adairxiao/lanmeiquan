<template>
  <div id="BaseNavber">
    <nav-bar @click-left="onClickLeft" @click-right="onClickRight" :title="title">
      <template #left>
        <slot name="left-content"></slot>
      </template>
      <template #title>
        <slot name="title-content"></slot>
      </template>
      <template #right>
        <slot name="right-content"></slot>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import {NavBar} from "vant";


export default {
  name: "BaseNavbar",
  components: {
    NavBar,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    isLeft: {
      type: Boolean,
      default: false,
    },
    isright: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClickLeft() {},
    onClickRight() {
      this.$emit("clickTopRight");
    },
  },
};
</script>

<style>
</style>