<template>
  <div class="form">
    <van-form validate-first>
      <slot />
    </van-form>
  </div>
</template>

<script>
import vanForm from "vant/lib/form";
import "vant/lib/form/style";


export default {
  name: "MainFrom",
  data() {
    return {
      value3: ""
    };
  },
  components: {
    vanForm,
  }
};
</script>

<style>

</style>