<template>
  <div :class="classLine">
    <van-field
      v-model="code"
      name="code"
      placeholder="请输入短信验证码"
      type="number"
      input-align="left"
      label-width="50px"
    >
      <template #button>
        <van-button
          size="small"
          type="info"
          :text="text"
          :disabled="disabled"
          @click="clickCodeButtonEvent"
        />
      </template>
    </van-field>
  </div>
</template>

<script>
import vanField from "vant/lib/field";
import "vant/lib/field/style";

import vanButton from "vant/lib/button";
import "vant/lib/button";

export default {
  data() {
    return {
      code: "",
      text: "发送验证码",
      disabled: null
    };
  },
  props: {
    classLine: {
      type: String,
      default: ""
    }
  },
  methods: {
    clickCodeButtonEvent() {
      this.countDown();
    },
    // 倒计时
    countDown() {
      let i = 59,
        nIntervId = null;

      this.fn = function() {
        if (i !== 0) {
          this.text = i + "秒后可重新获取";
          i--;
        } else {
          this.disabled = null;
          this.text = "发送验证码";
          clearInterval(nIntervId);
        }
      };

      this.text = "60秒后可重新获取";
      this.disabled = "disabled";
      nIntervId = setInterval(this.fn.bind(this), 1000);
    }
  },
  components: {
    vanField,
    vanButton
  }
};
</script>

<style>
</style>