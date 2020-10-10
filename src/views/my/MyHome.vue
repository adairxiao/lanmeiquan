<template>
  <div class="my-user-container">
    <div class="user-center">
      <article class="user-center-info">
        <section class="user-center-info-show clearfix">
          <div class="avatar">
            <div>
              <!-- <img src="@/assets/images/bg.png" alt /> -->
            </div>
          </div>
          <div class="base-info">
            <span class="nick-name">name</span>
            <p class="introduction">简介: 平面模特、歌手、直播网红。</p>
            <div class="btn-user-edit">
              <van-icon name="arrow" />
            </div>
          </div>
        </section>
        <section class="personal-operate-annal-show">
          <ul>
            <li v-for="item in operateAnnal" :key="item.title">
              <span v-show="isUser">{{ item.number }}</span>
              <span :class="{ vertical: !isUser }">{{ item.title }}</span>
            </li>
          </ul>
        </section>
      </article>
      <article class="user-certification">
        <section class="user-not-certified" v-show="!isUser">
          <div class="model-certified">
            <i class="icon-model"></i>
            <span>模特认证</span>
            <i class="btn-certified-edit">
              <van-icon name="arrow" />
            </i>
          </div>
          <div class="photographer-certified">
            <i class="icon-photographer"></i>
            <span>摄影师认证</span>
            <i class="btn-certified-edit">
              <van-icon name="arrow" />
            </i>
          </div>
        </section>
        <section class="user-pass-certified" v-show="isUser">
          <div class="user-exclusive-function">
            <div class="exclusive-function-title">
              <i class="icon-exclusive-function"></i>
              <span>专属功能</span>
            </div>
            <div class="exclusive-function-item">
              <ul>
                <li>
                  <i class="icon-my-wallet"></i>
                  <span>我的钱包</span>
                </li>
                <li>
                  <i class="icon-my-works"></i>
                  <span>我的作品</span>
                </li>
                <li>
                  <i class="icon-publish-works"></i>
                  <span>发布作品</span>
                </li>
                <li>
                  <i class="icon-info-settings"></i>
                  <span>信息设置</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </article>
      <article class="user-function-list">
        <ul>
          <li v-for="item in needFunctionList" :key="item.title">
            <div>
              <span>{{ item.title }}</span>
              <i v-if="item.title === '客服中心'">{{
                customerServiceWeChat
              }}</i>
              <i v-else>
                <van-icon name="arrow" />
              </i>
            </div>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>

<script>
import {icon as vanIcon} from "vant";

export default {
  name: "MyHome",
  data() {
    return {
      isUser: false, // 判断用户角色
      operateAnnal: [
        { title: "关注", number: 0 },
        { title: "收藏", number: 0 },
        { title: "订阅", number: 0 },
        { title: "打赏过的", number: 0 },
      ],
      functionList: [
        { title: "充值", link: "" },
        { title: "口令码", link: "" },
        { title: "交易记录", link: "" },
        { title: "分成计划", link: "" },
        { title: "客服中心", link: "" },
        { title: "设置", link: "" },
      ],
      customerServiceWeChat: "客服微信38913591",
    };
  },

  computed: {
    needFunctionList() {
      if (this.isUser) {
        return this.functionList;
      } else {
        return this.functionList.slice(1);
      }
    },
  },
  components: {
    vanIcon,
  },
};
</script>

<style lang="less">
/* 公用属性 start*/

/* 公用属性 end*/
.my-user-container {
  width: 100vw;
  background-color: #f2f2f2;
}

.user-center {
  width: 100%;
}
/* 基本信息展示 start*/
.user-center-info {
  width: 100%;
  margin: 10px 0;
  background: #ffffff;

  .user-center-info-show {
    width: 100%;
    padding: 12px;

    box-sizing: border-box;
    .avatar {
      display: block;
      float: left;
      overflow: hidden;
      div {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        background-color: aqua;
      }
    }
    .base-info {
      position: relative;
      margin-left: 58px;
      padding-left: 10px;
      height: 58px;
      text-align: left;
      overflow: hidden;
      .nick-name {
        display: block;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #14181a;
        line-height: 30px;
      }

      .introduction {
        margin: 0;
        font-size: 12px;
        font-family: PingFang SC;
        font-weight: 500;
        color: #667886;
        line-height: 18px;
      }

      .btn-user-edit {
        position: absolute;
        top: 50%;
        right: 31px;
        transform: translateY(-50%);
        width: 9px;
        height: 16px;
      }
    }
  }
  .personal-operate-annal-show {
    border-top: 1px solid #e5e4e4;
    height: 54px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      flex-direction: row;
      flex-flow: nowrap;
      justify-content: space-around;
      list-style: none;
    }

    li {
      padding: 0 10px;
      text-align: center;
      height: 54px;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #333333;

      span {
        display: block;
        line-height: 27px;
      }

      .vertical {
        line-height: 54px;
      }
    }
  }
}

/* 基本信息展示 end */

/* 认证展示 start */
.user-certification {
  width: 100%;
  background: #ffffff;

  .user-not-certified {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;
    line-height: 30px;

    // 未认证
    .model-certified,
    .photographer-certified {
      position: relative;
      height: 43px;
      line-height: 43px;

      .icon-photographer,
      .icon-model {
        display: inline-block;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 29px;
        height: 29px;
        margin: 0 7px 0 12px;
        background: url("~@/assets/images/images/myHome/photographer-icon.png")
          no-repeat center;
        background-size: 29px, 29px;
      }

      .icon-model {
        background-image: url("~@/assets/images/images/myHome/model-icon.png");
      }
      span {
        margin-left: 48px;
      }
      .btn-certified-edit {
        position: absolute;
        top: 50%;
        right: 12px;
        transform: translateY(-50%);
      }
    }

    // 下划线
    .model-certified::after {
      display: block;
      content: "";
      margin: 0 3px;
      border-bottom: 1px solid #ccc;
    }
  }

  //主播功能
  .user-pass-certified {
    height: 104px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333333;

    .user-exclusive-function {
      width: 100%;
      height: 105px;
      overflow: hidden;
      .icon-exclusive-function {
        display: block;
        float: left;
        width: 25px;
        height: 25px;
        background: url("~@/assets/images/images/myHome/model-icon.png")
          no-repeat center;
        background-size: 22px, 22px;
      }
      .exclusive-function-title {
        height: 25px;
        line-height: 25px;
      }
    }

    .exclusive-function-item {
      // background-color: red;
      ul {
        display: flex;
        flex-direction: row;
        flex-flow: nowrap;
        justify-content: space-around;
        align-items: center;
        li {
          flex-grow: 1;
          text-align: center;
          white-space: nowrap;
          margin-top: 14px;

          .icon-my-wallet,
          .icon-my-works,
          .icon-publish-works,
          .icon-info-settings {
            display: block;
            width: 29px;
            height: 29px;
            margin: 0 auto;
            background: no-repeat center;
            background-size: 29px, 29px;
          }

          .icon-my-wallet {
            background-image: url("~@/assets/images/images/myHome/my-wallet.png");
          }
          .icon-my-works {
            background-image: url("~@/assets/images/images/myHome/my-works.png");
          }
          .icon-publish-works {
            background-image: url("~@/assets/images/images/myHome/publish-works.png");
          }
          .icon-info-settings {
            background-image: url("~@/assets/images/images/myHome/info-settings.png");
          }
        }
      }
    }
  }
}
/* 认证展示 end */

/* 列表 start */
.user-function-list {
  margin-top: 11px;
  background-color: white;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #333333;
  overflow: hidden;
  ul {
    li {
      div {
        position: relative;
        height: 43px;
        line-height: 43px;
        margin: 0 20px;

        i {
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
        }
      }
    }

    // 下划线
    li::after {
      display: block;
      content: "";
      margin: 0 3px;
      border-bottom: 1px solid #ccc;
    }
  }
}
/* 列表 end */
</style>