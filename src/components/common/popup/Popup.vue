<template>
  <van-Popup v-model="show" position="bottom" >
    <div>
      <slot></slot>
    </div>
  </van-Popup>
</template>

<script>
import {popup as vanPopup} from "vant";

export default {
  name: "Popup",
  data() {
    return {};
  },
  props: {
    show: {
      type: Boolean,
      default:  false ,
    },
  },
  components: {
    vanPopup,
  },
};
</script>

<style>
</style>