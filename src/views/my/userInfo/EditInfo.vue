<template>
  <div>
    <div class="edit-tab-ber"><router-view /></div>
    <article class="edit">
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
import { field as vanField } from "vant"

export default {
  props:{
    textval:{
      type: String,
      default: ""
    },
    textType:{
      type: String,
      default: "text"
    },
    labelText:{
      type: String,
      default: ""
    },
  },
  data () {
    return {
      value:this.textval,
      // 显示清除按钮
      isClearable: true,
      // 只对textarea有效
      height: { maxHeight: 275, minHeight: 137 }
    }
  },
  computed: {
    
    placeholder () {
      return `请输入${this.labelText}`
    },
    // 显示字数统计
    isShowWordLimit () {
      return this.textType === "textarea" ? true : false

    },
    maxlength () {
      return this.textType === "textarea" ? "23" : "7"
    },

  },
  mounted(){
  },
  beforeRouteEnter (to, from, next) {
    
    next(vm => {
      if (from.name === null) vm.$router.push("UserDetails")
    })
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