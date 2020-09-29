<template>
  <div class="forget-upper-half" key="phone">
    <PageLayout>
      <template #IconHint>
        <div class="froget-title-text">
          <span>请输入你注册蓝莓圈的手机号</span>
        </div>
      </template>
      <template #boxContent>
        <van-form v-on:submit="onSubmit">
          <van-field
            :name="'phone'"
            :placeholder="'请输入手机号'"
            v-on:input="getData"
          />
          <div style="margin: 16px;">
            <van-button :type="'info'" :size="'large'" :native-type="'submit'" :text="'下一步'" />
          </div>
        </van-form>
      </template>
    </PageLayout>
  </div>
</template>

<script>
import PageLayout from "@/views/forget/childcomponents/PageLayout";
import vanButton from "@/components/common/button/MainButton";
import vanField from "@/components/common/field/Mainfield.vue";
import vanForm from "@/components/common/from/Mainfrom";
export default {
  name: "MainForget",
  data() {
    return { nextPage: "code", pattern: "", value: "" };
  },
  props: {},
  mounted() {
    console.log(this.$route.matched);
    
  },
  methods: {
    // 获取子组件的input值
    getData(newVal) {
      this.value = newVal;
    },

    onSubmit(values) {
      console.log("submit2", (values.code = this.value));
      
      // 提交表单后执行
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

<style lang="less" scoped>
</style>