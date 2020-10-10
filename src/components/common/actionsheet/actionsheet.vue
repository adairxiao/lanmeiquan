<template>
<van-action-sheet v-model="show.isShow" >
  
</van-action-sheet>
  
</template>

<script>
import {ActionSheet as vanActionSheet} from "vant" 

export default {
  name:"ActionSheet",
  data(){
    return {}
  },
  props:{
    show:{
      type:Object,
      default:{isShow:false}
    },
    

  },
  components:{
    vanActionSheet
  }

}
</script>

<style>

</style>