<template>
  <van-Popup v-model="show" :title="title" @close="close" :position="position">
    <div>
      <slot></slot>
    </div>
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
    },
    position: {
      type: String,
      default: "bottom"
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
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