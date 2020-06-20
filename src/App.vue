<template>
  <div id="app">
    <div>
      <router-view name="topNavber" />
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>


<script>


export default {
  name: "App",
  components: {
  }
};
</script>
<style>
@import "assets/css/base.css";
</style>
