<template>
<van-action-sheet v-model="show.isShow" >
  
</van-action-sheet>
  
</template>

<script>
import vanActionSheet from "vant/lib/action-sheet" 
import "vant/lib/action-sheet/style"
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