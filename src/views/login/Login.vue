<template>
  <div class="login-app-container">
    <div class="header-box"><router-view /></div>

    <div class="content-box">
      <div class="title-box">
        <span class="login-title">{{ currentConfig.title }}</span>
        <p class="login-text" v-show="!currentConfig.isCurrentPage">
          登录注册表示同意
          <span class="font">用户协议、</span>

          <span class="font">隐私条款</span>
        </p>
      </div>

      <div>
        <div class="form-group">
          <van-field
            v-model="phone"
            :name="'phone'"
            :placeholder="'请输入手机号'"
            maxlength="11"
            :type="'tel'"
            :label-align="'center'"
            center
            :classLine="'field-line'"
          />
        </div>

        <div class="form-group" v-show="!currentConfig.isCurrentPage">
          <ButtonField />
        </div>

        <div class="form-group" v-show="currentConfig.isCurrentPage">
          <pwdField
            :classLine="'field-line'"
            :placeholder="'请输入密码'"
            @sendVal="recVal"
          />
        </div>
      </div>

      <div class="btn-box">
        <van-button
          :type="'info'"
          :size="'large'"
          @click="onClickButtonSubmit"
          :text="currentConfig.btnText"
        />
      </div>

      <div class="login-content-footer">
        <div @click="switchPage">
          <!-- 用短信验证码登录 -->
          <span class="footer-left">{{ currentConfig.switchText }}</span>
        </div>
        <router-link to="/forget" tag="span" calss="footer-right"
          >忘记密码</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>

import ButtonField from "@/components/common/field/Buttonfield";


import vanButton from "@/components/common/button/MainButton";
import vanField from "@/components/common/field/Mainfield";
import pwdField from "@/components/common/field/Pwdfield";

import { validator } from "./../../tools/validationStrategy";

export default {
  name: "Login",
  data() {
    return {
      currentConfig: {
        isCurrentPage: false,//false.验证码登录 ttrue密码登录页面
        title: "欢迎登录注册蓝莓圈", //请输入帐号密码
        btnText: "获取验证码登录",
        switchText: "用帐号密码登录",
      },

      phone: "",
      pwd: "",
    };
  },
  components: {
    vanButton,
    vanField,
    pwdField,
    ButtonField
  },
  created() {
  },
  mounted() {
  },
  methods: {
    // 接受pwdfield的值
    recVal(val) {
      this.pwd = val;
    },
    // 切换登录方式
    switchPage() {
      if(this.currentConfig.isCurrentPage){
        this.currentConfig.title = "欢迎登录注册蓝莓圈";
          this.currentConfig.btnText = "获取验证码登录";
          this.currentConfig.switchText = "用帐号密码登录";
          this.currentConfig.isCurrentPage = false
      }else{
          this.currentConfig.title = "请输入帐号密码";
          this.currentConfig.btnText = "登录";
          this.currentConfig.switchText = "用短信验证码登录";
          this.currentConfig.isCurrentPage = true
      }
      
    },
    //提交数据
    onClickButtonSubmit() {
      if (this.isShow) {
        // 提交phone
        // 1.验证内容
        validator
          .add([this.phone, "isNonEmpty", "手机号码不能为空!"])
          .add([this.phone, "maxLength", 11, "手机号码位数不正确!"]).start(this)

        // validator
        //   .add([this.pwd, "isNonEmpty", "密码不能为空!"])
        //   .add([this.pwd, "minLength", 6, "密码不能小于6位!"])
        //   .start(this);

        // 2.提交数据
        // this.$router.push("/sendcode");
      } else {
        //提交phone and password
        // validator.add([ this.phone, ,"isNonEmpty","手机号码不能为空!"].start().toast(this)
        // { isNonEmpty: [this.pwd, "密码不能为空!"] },
        // { minLength: [this.phone, 11, "手机号码位数不正确！"] },
        // { minLength: [this.pwd, 6, "密码不能小于6位！"] },
        // { maxLength: [this.pwd, 16, "密码不能大于16位！"] },
        // { mobileFormat: [this.phone, "手机号码不符合规则！"] },
        // if (msg !== undefined) {
        //   this.$toast({ position: "top", message: msg });
        // } else {
        //   // 2.提交数据
        //   this.$router.push("/sendcode");
        // }
      }
    },
  },
};
</script>

<style lang="less">
@import "login";
</style>