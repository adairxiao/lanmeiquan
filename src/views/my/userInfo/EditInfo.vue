<template>
  <div>
    <article  class="edit">
      <section>
        <van-field
          v-model="value"
          :clearable="isClearable"
          :label="labelText"
          :placeholder="placeholder"
          :show-word-limit="isShowWordLimit"
          :autosize="height"
          :type="textType"
          :maxlength="maxlength"
        ></van-field>
      </section>
    </article>
  </div>
</template>

<script>
import {field as vanField} from "vant";

export default {
  data() {
    return {
      value: "",
      // isShowWordLimit: false,
      isShowWordLimit: true,
      height: { maxHeight: 275, minHeight: 137 },
      // labelText: "昵称",
      labelText:"",
      // isClearable: true,
      isClearable: false,
      // placeholder: "请输入昵称",
      placeholder:"请输入个性标签",
      maxlength:"23",
      // textType:"text",
      textType:"textarea"
    };
  },
  components: {
    vanField,
  },
};
</script>

<style lang="less" scoped>
.edit {
  width: 100%;
  height: 100%;
  margin-top: 15px;
}


</style>