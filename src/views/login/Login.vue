<template>
  <div class="article">
    
    <login :loginMethod="loginMethod" :btnText="btnText" />

    <div class="login-second-half font">
      <div @click="switchLoginMethod">
        <div v-if="loginMethod==='用短信验证码登录'">
          <span class="login-second-half-left">用帐号密码登录</span>
        </div>
        <div v-else>
          <span class="login-second-half-left">用短信验证码登录</span>
        </div>
      </div>
      <router-link to="/forget" tag="span" calss="login-second-half-right">忘记密码</router-link>
    </div>

    <!-- <router-link to="/"></router-link> -->
  </div>
</template>

<script>
import login from "./../../components/content/mainlogin/Mainlogin";





export default {
  name: "Login",
  data() {
    return {
      loginMethod: "用短信验证码登录",
      btnText: "获取验证码登录"
    };
  },
  components: {
    login
  },
  methods: {

    // 切换登录方式
    switchLoginMethod() {
      this.loginMethod =
        this.loginMethod === "用短信验证码登录"
          ? "用帐号密码登录"
          : "用短信验证码登录";
      this.btnText =
        this.btnText === "获取验证码登录" ? "确定" : "获取验证码登录";
    }
  }
};
</script>

<style lang="less">
.article {
  .van-bavber {
    height: 50px;
  }

  .login-second-half {
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