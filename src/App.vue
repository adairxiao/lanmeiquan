<template>
  <div id="app" >
    <router-view v-if="isRouterAlive" />
  </div>
</template>


<script>
export default {
  name: "App",
  data(){
    return {
      isRouterAlive : true
    }
  },
  provide(){
    return{
      reload:this.reload
    }
  },
  methods:{
    reload(text){
      console.log(text);
      this.isRouterAlive = false
      this.$nextTick(function(){
        this.isRouterAlive = true
      })
    }
  }
  
};
</script>
<style lang="less">
// 引入base.css
@import "assets/css/base.css";

// background-color: #f2f2f2;
</style>
