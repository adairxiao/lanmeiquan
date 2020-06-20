<template>
  <div class="login-upper-half">
    <loginContent>
      <template #IconHint>
        <div v-if="loginMethod==='用短信验证码登录'">
          <span class="login-title-text">欢迎登录注册蓝莓圈</span>
          <p class="login-title-clause">
            登录注册表示同意
            <span class="font">用户协议</span>、
            <span class="font">隐私条款</span>
          </p>
        </div>
        <div v-else>
          <span class="login-title-text">请输入帐号密码</span>
        </div>
      </template>

      <template #boxContent>
        <van-form>
          <template #default>
            <div v-if="loginMethod==='用短信验证码登录'">
              <van-field
                :fieldName="'asyncValidator'"
                :fieldPlaceholder="'请输入手机号'"
                :fieldType="'tel'"
                :fieldRules="[{pattern, message: '请输入正确内容' }]"
                :fieldLabel="'+86'"
                :fieldLabelAlign="'center'"
                :fieldLabelWidth="'50px'"
                :fieldClassLine="{'field-line':true}"
                key="login-upper-half"
              />
            </div>
            <div v-else>
              <van-field
                :fieldName="'asyncValidator'"
                :fieldPlaceholder="'请输入手机号'"
                :fieldType="'tel'"
                :fieldRules="[{pattern, message: '请输入正确内容' }]"
                :fieldLabelAlign="'center'"
                :fieldLabelWidth="'50px'"
              />
              <van-field
                :fieldName="'asyncValidator'"
                :fieldPlaceholder="'请输入登录密码'"
                :fieldType="'password'"
                :fieldRules="[{pattern, message: '请输入正确内容' }]"
                :fieldLabelAlign="'center'"
                :fieldLabelWidth="'50px'"
                :fieldRightIcon="{currentIcon:'eye-o',newIcon:'closed-eye',event:'switchlcon'}"
              />
            </div>
            <div style="margin: 16px;">
              <van-button
                :buttonType="'info'"
                :buttonSize="'large'"
                :buttonNativeType="'submit'"
                :buttonText="btnText"
              />
            </div>
          </template>
        </van-form>
      </template>
    </loginContent>
  </div>
</template>

<script>
import loginContent from "./../../common/login/Login";
import vanForm from "./../../common/from/Mainfrom";
import vanButton from "./../../common/button/MainButton";
import vanField from "./../../common/field/Mainfield";

import vanIcon from "vant/lib/icon";
import "vant/lib/icon/style";

export default {
  name: "MainLogin",
  data() {
    return {
      // buttonType: "primary",
      // buttonText: "获取验证码",
      // buttonSize: "large",
      // buttonColor: "#1DA1F1"


      pattern: /\d{6}/,
      iconShowValue: true
    };
  },
  props:{
    loginMethod:{
      type:String,
      default:"用短信验证码登录"
    },
    btnText:{
      type:String,
      default:"确定"
    }
  },
  components: {
    loginContent,
    vanForm,
    vanButton,
    vanField,
    vanIcon
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less">
.login-upper-half {
  .input-box {
    margin: 80px 0 50px 0;
  }
  .login-content {
    .Icon-hint {
      margin: 38px 0 70px 27px;
      line-height: 30px;
      .login-title-text {
        font-size: 29px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .login-title-clause {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
    }

    .box-content {
      .btn,
      .field {
        width: 320px;
        height: 48px;
        margin: 0 auto;
      }
      .field {
        margin-bottom: 40px;
      }

      .form {
        .field-line {
          border-bottom: 1px solid rgba(221, 220, 221, 1);
          padding: 0 0 10px 0;
        }
      }
    }
  }
}
</style>