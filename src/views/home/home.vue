<template>
  <div>
    <div class="header-box"><router-view /></div>
    <div class="banner"><banner /></div>
  </div>
</template>

<script>
import banner from "@/views/home/swipe/swipe"
export default {
  components: {
    banner
  }
}
</script>


<style lang="less">
@import "home";
</style>