<template>
  <van-Popup v-model="show" :title="title" @close="close" position="bottom">
      <slot></slot>
  </van-Popup>
</template>

<script>
import { popup as vanPopup } from "vant"

export default {
  name: "Popup",
  data () {
    return { show: this.value }
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }

  },
  watch: {
    value (val) {
      this.show = val
    },
  },
  mounted () {
    // 使用bus接受父组件中兄弟组件传的值
    // let self = this
    // EventBus.$on("showClass", function (title) {

    // })
  },
  methods: {
    close () {
      // 关闭popup时，发送给父组件
      this.$emit('input', this.show)
    }
  },
  components: {
    vanPopup,
  },
};
</script>

<style>
</style>