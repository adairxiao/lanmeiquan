<template>
  <div class="forget-upper-half" key="code">
    <PageLayout>
      <template #IconHint>
        <div class="froget-title-text">
          <span>请通过187*****526手机号获取6位数字验证码</span>
        </div>
      </template>
      <template #boxContent>
        <van-form v-on:submit="onSubmit">
          <van-field  :placeholder="'请输入短信验证码'" v-on:input="getData">
          </van-field>

          <div style="margin: 16px;">
            <van-button :type="'info'" :size="'large'" :native-type="'submit'" :text="'确定'" />
          </div>
        </van-form>
      </template>
    </PageLayout>
  </div>
</template>f
<script>
import PageLayout from "@/views/forget/childcomponents/PageLayout";
import vanButton from "@/components/common/button/MainButton";

import vanField from "@/components/common/field/Buttonfield";
import vanForm from "@/components/common/from/Mainfrom";
export default {
  name: "MainForget",
  data() {
    return { nextPage: "change", pattern: "", value: "" };
  },
  props: {},
  methods: {
    // 获取子组件的input值
    getData(newVal) {
      this.value = newVal;
    },
    onSubmit(values) {
      console.log("submit2", (values.code = this.value));
      this.$emit("updatePage", this.nextPage);
    }
  },
  components: {
    PageLayout,
    vanField,
    vanButton,
    vanForm
  }
};
</script>

<style lang="less">
</style>