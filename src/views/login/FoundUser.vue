<template>
  <div>
    <PageLayout>
      <template #boxTop>
        <div>111</div>
      </template>

      <template #boxContent>
        <div>222</div>
      </template>
      <template #boxFooter>
        <div></div>
      </template>
    </PageLayout>
  </div>
</template>

<script>
import PageLayout from "@/views/login/childcomponents/PageLayout";
export default {
  components: {
    PageLayout,
  },
};
</script>

<style>
</style>