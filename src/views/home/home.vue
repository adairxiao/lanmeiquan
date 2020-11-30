<template>
  <div class="home">
    <div class="header-box"><router-view /></div>
    <div class="body-box">
      <div class="banner"><swipe /></div>
      <div class="card">
        <WaterFall>
          
        </WaterFall>
      </div>
    </div>
  </div>
</template>

<script>
import swipe from "@/views/home/swipe/swipe"
import WaterFall from "@/views/home/waterfall/waterfall"
export default {
  components: {
    swipe,
    WaterFall
  }
}
</script>


<style lang="less">
@import "index";
</style>