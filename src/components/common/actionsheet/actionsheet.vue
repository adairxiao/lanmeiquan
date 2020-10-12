<template>
<van-action-sheet v-model="show" :title="title">
  <div>
    <slot></slot>
  </div>
</van-action-sheet>
  
</template>

<script>
import {ActionSheet as vanActionSheet} from "vant" 

export default {
  name:"ActionSheet",
  data(){
    return {show:this.isShow}
  },
  props:{
    isShow:{
      type:Boolean,
      default:false
    },
    title:{
      type:String,
      default:""
    }

  },
  computed:{

  },
  mounted(){

  },
  components:{
    vanActionSheet
  }

}
</script>

<style>

</style>