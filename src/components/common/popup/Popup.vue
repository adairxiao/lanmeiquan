<template>
  <van-Popup v-model="show" :title="title" @close="close" position="bottom">
    <div id="popupContainer"></div>
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
  created(){
    console.log("创建");
    
  },
  mounted () {
    
    console.log(this.component)

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