<template>
  <div class="child">
    <!-- 第一列 -->
    <div ref="column1">
      <template v-if="$slots['first-col']">
        <slot name="first-col"></slot>
      </template>
      <template v-for="(item, index) in columnList1">
        <!-- 第一列瀑布流内容... -->
      </template>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang = "less">
@import "index";
</style>