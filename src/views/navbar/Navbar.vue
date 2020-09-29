<template>
  <div id="navber">
    <BaseNavbar>
      <template #title-content>123</template>
    </BaseNavbar>
  </div>
</template>

<script>
import BaseNavbar from "@/components/common/navbar/BaseNavBar";
export default {
  name: "Navbar",
  components: {
    BaseNavbar,
  },
};
</script>

<style>
</style>