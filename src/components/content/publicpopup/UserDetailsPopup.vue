<template>
  <div>
    <div v-if="isShow">
      <action-sheet v-bind="$attrs"></action-sheet>
      1
    </div>
    <div v-else>
      2
      <popup v-bind="$attrs">
        <template #default>
          <div>{{ isShow }}{{ cell }}</div>
        </template>
      </popup>
    </div>
  </div>
</template>

<script>
import ActionSheet from "../../common/actionsheet/actionsheet";
import Popup from "../../common/popup/Popup";

export default {
  name: "SexSelector",
  props: {
    //根据传入的showClass调用合适的内容
    showClass:{
      type:String,
      default:""
    }
  },
  data() {
    return {
      
      description: "",
    };
  },
  computed: {
    isShow() {
      switch (this.showClass){
        case 'sex':
          return true;
          break
        
      }
      
    },
  },
  components: {
    ActionSheet,
    Popup,
  },
  beforeCreate() {
    this.$attrs.position = "bottom";
    this.description = this.$attrs.description;
    
  },
  mounted() {
    
  },
};
</script>

<style>
</style>