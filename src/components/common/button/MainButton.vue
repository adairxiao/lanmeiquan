<template>
  <div class="btn">
    <van-button
      :type="buttonType"
      :size="buttonSize"
      :color="buttonColor"
      :native-type="buttonNativeType"
      v-bind="{round:isRound}"
    >{{buttonText}}</van-button>
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
    buttonType: {
      type: String,
      default: "default"
    },
    buttonSize: {
      type: String,
      default: "normal"
    },
    buttonColor: {
      type: String,
      default: "#1DA1F1"
    },
    buttonText: {
      type: String,
      default: "确定"
    },
    buttonNativeType: {
      type: String,
      default: null
    },
    isRound:{
      type:Boolean,
      default:false
    }
  }
};
</script>

<style>

</style>