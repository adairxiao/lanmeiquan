<template>
  <van-Popup v-model="show.isShow" position="bottom" >
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
      type: Object,
      default: { isShow: false },
    },
  },
  components: {
    vanPopup,
  },
};
</script>

<style>
</style>