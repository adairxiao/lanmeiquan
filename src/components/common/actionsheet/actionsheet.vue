<template>
  <div>
    <van-action-sheet v-model="show" :title="title" @close="close">
      <div>
        <slot></slot>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { ActionSheet as vanActionSheet } from "vant"

export default {
  name: "ActionSheet",
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
  watch:{
    value(val){
      this.show = val
    },
  },
  mounted () {
    // 使用bus接受父组件中兄弟组件传的值
    // let self = this
    // EventBus.$on("showClass", function (title) {
      
    // })
  },
  methods:{
    close(){
      // 关闭popup时，发送给父组件
      this.$emit('input', this.show)
    }
  },
  components: {
    vanActionSheet
  }

}
</script>

<style>
</style>