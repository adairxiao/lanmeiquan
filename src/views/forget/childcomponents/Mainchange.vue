<template>
  <div class="forget-upper-half" key="change">
    <PageLayout>
      <template #IconHint>
        <div class="froget-title-text">
          <span>请为你的帐号187*****685设置密码，以保证下次正常登录</span>
        </div>
      </template>
      <template #boxContent>
        <van-form v-on:submit="onSubmit">
          <van-field
            :name="'phome'"
            :placeholder="'请输入手机号'"
            :rules="[{pattern, message: '请输入正确内容' }]"
            v-on:input="getData"
          />
          <div style="margin: 16px;">
            <span>密码为6~16位数字或字母</span>
            <van-button :type="'info'" :size="'large'" :native-type="'submit'" :text="'下一步'" />
          </div>
        </van-form>
      </template>
    </PageLayout>
  </div>
</template>
<script>
// :buttonNativeType="'submit'"
import PageLayout from "@/views/forget/childcomponents/PageLayout";
import vanButton from "@/components/common/button/MainButton";
import vanField from "@/components/common/field/Mainfield.vue";
import vanForm from "@/components/common/from/Mainfrom";
export default {
  name: "MainForget",
  data() {
    return { page: "change", pattern:'', value:"" };
  },
  props: {},
  methods: {
    // 获取子组件的input值
    getData(newVal) {
      this.value = newVal;
    },
    onSubmit(values) {
      console.log("submit2", (values.code = this.value));
      // this.$router.push("login");
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

<style lang="less" scoped>
// .froget-title-text {
  
// }
</style>