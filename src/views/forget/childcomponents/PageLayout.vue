<template>
  <div class="login-content">
    <div class="Icon-hint">
      <slot name="IconHint">标题</slot>
    </div>
    <div class="box-content">
      <slot name="boxContent">内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginContent"
};
</script>

<style lang="less">
</style>