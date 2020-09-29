<template>
  <van-Popup v-model="show.isShow" position="bottom" >
    <div>
      <slot></slot>
    </div>
  </van-Popup>
</template>

<script>
import vanPopup from "vant/lib/popup";
import "vant/lib/popup/style";
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