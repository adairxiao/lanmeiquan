<template>
  <div id="app">
    <div class="app-article">
      <div class="app-header">
        <router-view class='navber' name="NavBer" />
      </div>
      <div class="app-body">
        <router-view />
      </div>
      <div class="app-footer"></div>
    </div>
  </div>
</template>


<script>
export default {
  name: "App",
  components: {}
};
</script>
<style lang="less">
@import "assets/css/base.css";

.app-article {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;

  .app-body {
    flex-grow: 1;
    background-color: #f2f2f2;
  }
}
</style>
