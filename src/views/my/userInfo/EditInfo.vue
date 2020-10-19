<template>
  <div>
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
  data () {
    return {
      // textType:"text",
      textType: "textarea",
      labelText: "",
      value: "",
      placeholder: "请输入个性标签",
      maxlength: "23",
      // 显示清除按钮
      isClearable: true,

      // 显示字数统计
      isShowWordLimit: true,
      // 只对textarea有效
      height: { maxHeight: 275, minHeight: 137 }
    }
  },
  beforeRouteEnter (to, from, next) {

    next(vm => {
      console.log(to, from)
      // 根据上一个路由初始化
      if (to.params.textType === "text") {

        vm.textType = to.params.textType
        vm.maxlength = "7"
        vm.labelText = to.params.titleVal
        vm.placeholder = `请输入${to.params.titleVal}`

        vm.isShowWordLimit = false
        vm.value = to.params.textval
      } else if (to.params.textType === "textarea") {
        vm.textType = to.params.textType
        vm.maxlength = "23"
        vm.labelText = to.params.titleVal
        vm.placeholder = `请输入${to.params.titleVal}`
        vm.isShowWordLimit = true
        vm.value = to.params.textval
      }
      
    })
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if(to.name === "EditInfo"){
      from.name = "EditInfo"
    }
   
    next()
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