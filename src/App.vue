<template>
  <div id="app">
    <router-view  name="headerImg"></router-view>
    <router-view />
  </div>
</template>

<script>


export default {
  name: "App",
  data() {
    return {
    };
  },
  
  mounted() {
    
    
  },
  methods: {
    
  },
  
};
</script>
<style lang="less">
// 引入base.css
@import "assets/css/base.css";
.page-body {
  width: 100%;
  height: 80vh;
  padding-bottom: 50px;
  overflow-y: scroll;
}


</style>
