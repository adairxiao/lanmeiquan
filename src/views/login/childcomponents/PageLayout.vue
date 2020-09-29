<template>
  <div class="login-content">
    <div class="box-top">
      <slot name="boxTop">标题</slot>
    </div>
    <div class="box-content">
      <slot name="boxContent">内容</slot>
    </div>
    <div class="box-footer">
      <slot name="boxFooter">内容</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginContent"
};
</script>
<style lang="less" >

.login-content {
    .box-top {
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
  .input-box {
    margin: 80px 0 50px 0;
  }
  .box-content {
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
  .box-footer {
    margin: 20px 27px 0;
    display: flex;
    justify-content: space-between;
  }
  .font {
    font-family: "PingFang-SC-Medium";
    font-weight: Medium;
    color: #4f7cae;
  }

</style>