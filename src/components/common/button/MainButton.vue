<template>
  <div class="btn">
    <van-button
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>

</template>

<script>
import vanButton from "vant/lib/button";
import "vant/lib/button/style";

export default {
  name: "Mainbutton",
  components: {
    vanButton
  },
  props: {
    
  },
  mounted(){

  },
  methods: {

  }
};
</script>

<style>
</style>