<template>
  <div :class="classLine" class="field">
    <van-field v-bind="$attrs" v-on="$listeners">
      <template #button><slot name="button"></slot></template> 
    </van-field>
  </div>
</template>


<script>
import vanField from "vant/lib/field";
import "vant/lib/field/style";

import vanIcon from "vant/lib/icon";
import "vant/lib/icon/style";

export default {
  name: "Mainfield",
  data() {
    return {};
  },
  props: {
    classLine: {
      type: String,
      default:''
      
    }
  },
  components: {
    vanField,
    vanIcon
  },
  computed: {},
  watch: {
    //  fieldType: function (val, oldVal) {
    //   console.log('new: %s, old: %s', val, oldVal)
    //  }
  },
  created() {},
  mounted() {

    
    // console.log(`$attrs:`);
    // console.log(this.$attrs);
    // console.log(`$listeners:`);
    // console.log(this.$listeners);
  },
  methods: {}
};
</script>

<style>
</style>