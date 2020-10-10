<template>
  <div class="btn">
    <van-button
      v-bind="$attrs"
      v-on="$listeners"
    />
  </div>

</template>

<script>
import {Button as vanButton} from "vant";


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