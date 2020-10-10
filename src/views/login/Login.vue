<template>
  <div class="login-article">
    <!-- <login :loginMethod="loginMethod" :btnText="btnText" />-->
    <!-- <router-link to="/"></router-link>-->
    <div class="login-tab-ber"><router-view /></div>
    <div class="login-content">
      <div class="login-content-top">
        <div>
          <span class="login-title-text">{{title}}</span>
          <p class="login-title-clause" v-show="isShow">
            登录注册表示同意
            <span class="font">用户协议</span>、
            <span class="font">隐私条款</span>
          </p>
        </div>
      </div>

      <div class="login-content-central">
        <div class="login-field" v-show="isShow">
          <van-field
            v-model="phone"
            :name="'phone'"
            :placeholder="'请输入手机号'"
            :type="'tel'"
            :label="'+86 Ⅴ'"
            :label-align="'center'"
            center
            :label-width="'50px'"
            :classLine="'field-line'"
          />
        </div>
        <div class="login-field" v-show="!isShow">
          <van-field
            v-model="phone"
            :name="'phone'"
            :placeholder="'请输入手机号'"
            :type="'tel'"
            :input-align="'left'"
            :label-width="'50px'"
            :classLine="'field-line'"
          />

          <pwdField :classLine="'field-line'" :placeholder="'请输入密码'" @sendVal="recVal" />
        </div>

        <div>
          <van-button :type="'info'" :size="'large'" @click="onClickButtonSubmit" :text="btnText" />
        </div>
      </div>

      <div class="login-content-footer font">
        <div @click="switchLoginMethod">
          <!-- 用短信验证码登录 -->
          <span class="footer-left">{{switchText}}</span>
        </div>
        <router-link to="/forget" tag="span" calss="footer-right">忘记密码</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PageLayout from "@/views/login/childcomponents/PageLayout";
import vanButton from "@/components/common/button/MainButton";
import vanField from "@/components/common/field/Mainfield";
import pwdField from "@/components/common/field/Pwdfield";

import { validator } from "./../../tools/validationStrategy";

export default {
  name: "Login",
  data() {
    return {
      isShow: true,
      title: "欢迎登录注册蓝莓圈", //请输入帐号密码
      btnText: "获取验证码登录",
      switchText: "用短信验证码登录",
      phone: "",
      pwd: "",
    };
  },
  components: {
    PageLayout,
    vanButton,
    vanField, 
    pwdField,
  },
  mounted() {},
  methods: {
    // 接受pwdfield的值
    recVal(val) {
      this.pwd = val; 
    },
    // 切换登录方式
    switchLoginMethod() {
      if (this.isShow) {
        this.isShow = false;
        this.title = "请输入账号密码";
        this.btnText = "确定";
        this.switchText = "用帐号密码登录";
      } else {
        this.isShow = true;
        this.title = "欢迎登录注册蓝莓圈";
        this.btnText = "获取验证码登录";
        this.switchText = "用短信验证码登录";
      }
    },
    //提交数据
    onClickButtonSubmit() {
      if (this.isShow) {
        // 提交phone
        // 1.验证内容
        validator
          .add([this.phone, "isNonEmpty", "手机号码不能为空!"])
          .add([this.phone, "maxLength", 11, "手机号码位数不正确!"])
          
        // validator
        //   .add([this.pwd, "isNonEmpty", "密码不能为空!"])
        //   .add([this.pwd, "minLength", 6, "密码不能小于6位!"])
        //   .start(this);

        // 2.提交数据
        this.$router.push("/sendcode");
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
.login-article {
  // width: 100%;
  // height: 100%;
  
  .login-content {
    .login-content-top {
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
  }
  // .input-box {
  //   margin: 80px 0 50px 0;
  // }
  .login-content-central {
    .login-field {
      margin-bottom: 40px;
    }
    .btn,
    .field {
      width: 320px;
      height: 48px;
      margin: 0 auto;
    }

    .field-line {
      border-bottom: 1px solid rgba(221, 220, 221, 1);
      padding: 0 0 10px 0;
    }
  }

  // 底部按钮
  .login-content-footer {
    margin: 20px 27px 0;
    display: flex;
    justify-content: space-between;
  }
  .font {
    font-family: "PingFang-SC-Medium";
    font-weight: Medium;
    color: #4f7cae;
  }
}
</style>