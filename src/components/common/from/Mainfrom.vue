<template>
  <div class="form">
    <van-form v-on="$listeners">
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
  },
    mounted() {
    // console.log(`$attrs:`);
    // console.log(this.$attrs);
    // console.log(`$listeners:`);
    // console.log(this.$listeners);
  },
};
</script>

<style>

</style>