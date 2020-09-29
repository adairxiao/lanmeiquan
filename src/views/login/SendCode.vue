<template>
  <div class="send-code-article">
    <PageLayout>
      <template #boxTop>
        <div>
          <span class="login-title-text">{{title}}</span>
          <p class="login-title-clause">
            验证码已通过短信发送至
            <span class="font">+{{phone}}</span>
          </p>
        </div>
      </template>
      <template #boxContent>
        <div class="login-field" :classLine="'field-line'">
          <vanField/>
        </div>
        <div>
          <van-button :type="'info'" :size="'large'" @click="onClickButtonSubmit" :text="'注册'" />
        </div>
      </template>

      <template #boxFooter>
        <div></div>
      </template>
    </PageLayout>
  </div>
</template>

<script>
import PageLayout from "@/views/login/childcomponents/PageLayout";
import vanButton from "@/components/common/button/MainButton";
import vanField from "@/components/common/field/Buttonfield";
export default {
  name: "SendCode",
  data() {
    return {
      title: "请输入验证码",
      phone: ""
    };
  },
  mounted() {},
  components: {
    PageLayout,
    vanButton,
    vanField
  },
  methods:{
    onClickButtonSubmit(){
      this.$router.push('/founduser')
      
    }
  }
};
</script>

<style>

</style>