<template>
  <div :class="classLine" class="field">
    <van-field v-model="value" :type="pwdType" :placeholder="placeholder" clearable>
      <template #right-icon>
        <div @click="onClickSwitchIcon">
          <div v-show="isiconShow">
            <van-icon name="eye-o" />
          </div>
          <div v-show="!isiconShow">
            <van-icon name="closed-eye" />
          </div>
        </div>
      </template>
    </van-field>
  </div>
</template>


<script>
import vanField from "vant/lib/field";
import "vant/lib/field/style";

import vanIcon from "vant/lib/icon";
import "vant/lib/icon/style";

export default {
  name: "Passwordfield",
  data() {
    return {
      value: "",
      isiconShow: true,
      pwdType: "password"
    };
  },
  props: {
    classLine: {
      type: String,
      default: ""
    },
    placeholder:{
      type: String,
      default: ""
    }
  },
  components: {
    vanField,
    vanIcon
  },
  watch: {
    value: function(val) {
      // 监听value值，传个父组件
      // console.log(val);
      this.$emit("sendVal", val);
    }
  },
  methods: {
    //切换密码输入框的icon
    onClickSwitchIcon() {
      if (this.pwdType === "password") {
        this.isiconShow = false;
        this.pwdType = "text";
      } else {
        this.isiconShow = true;
        this.pwdType = "password";
      }
    }
  }
};
</script>

<style>
</style>