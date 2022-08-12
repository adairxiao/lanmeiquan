<template>
  <div style="width:100%">
    <van-image
      width="100%"
      height="190"
      :src="require('./../../assets/images/1hour.jpg')"
    />
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
    name:"moblie img",
    components: {
    VanImage,
  },
};
</script>

<style></style>
