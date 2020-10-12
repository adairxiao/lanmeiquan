<template>
  <div class="user-details-container">
    <article>
      <section v-if="isEdit">
        <div class="user-details">
          <div
            class="bg-image"
            v-bind:style="{ backgroundImage: 'url(' + bg_image + ')' }"
          ></div>
          <div class="user-details-avatar">
            <div class="avatar-img">
              <van-image
                width="100px"
                height="100px"
                :src="bg_image"
                round
                fit="cover"
              >
                <template v-slot:loading>
                  <van-loading type="spinner" size="20" />
                </template>
              </van-image>
            </div>
            <span class="user-id">ID:{{ user_id }}</span>
          </div>
        </div>

        <div class="user-name margin-top">
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title">昵称</span>
              <span class="custom-value">{{ name }}</span>
            </template>
          </van-cell>
        </div>
      </section>

      <section v-else>
        <div class="edit-user-details">
          <div class="user-base-details margin-top">
            <div
              class="border-bottom"
              v-for="(value, name) in retUserBase"
              :key="name"
            >
              <van-cell is-link @click="cellEvent(name)">
                <template #title>
                  <span class="custom-title">{{ name }}</span>
                  <span class="custom-value">{{ value }}</span>
                </template>
              </van-cell>
            </div>

            <div class="certification-info margin-top">
              <van-cell title="认证信息" is-link :value="setCertification" />
            </div>
            <div class="set-menber-price margin-top">
              <van-cell
                title="设置会员订阅"
                is-link
                :value="setCertification"
              />
            </div>
            <div class="set-wechat-price margin-top">
              <van-cell
                title="设置微信号打赏"
                is-link
                :value="setCertification"
              />
            </div>
          </div>
        </div>
      </section>
    </article>

    <buttom-popup />
  </div>
</template>

<script>
import { cell as vanCell, image as vanImage, loading as vanLoading } from "vant"
import buttomPopup from "./UserDetailsPopup"
import { EventBus } from "../../../router/eventBus"

export default {
  name: "UserDetails",
  data () {
    return {
      isEdit: false,
      user_id: 101566,
      bg_image: "https://img.yzcdn.cn/vant/cat.jpeg",
      userBase: [
        { '昵称': 'adair' },
        { '性别': '男' },
        { '生日': '1994-03-28 白羊座' },
        { '身高': '169' },
        { '体重': '48' },
        { '城市': '杭州' },
        { '个性签名': '我就是我，不一样的烟火哈哈哈...' },
      ],
      setCertification: '已设置', //已设置
    }
  },
  computed: {
    retUserBase () {
      let user = {}
      for (const value in this.userBase) {
        Object.assign(user, this.userBase[value])
      }
      return user
    }
  },
  methods: {
    cellEvent (title) {
      if (title !== "昵称" && title !== "个性签名") {
        EventBus.$emit("showClass", title)
      }

    },
  },
  components: {
    vanImage,
    vanLoading,
    vanCell,
    buttomPopup,
  },
};
</script>

<style lang="less" scoped>
.margin-top {
  margin-top: 15px;
}

// 下划线
.border-bottom {
  &::after {
    display: block;
    content: "";
    margin: 0 3px;
    border-bottom: 1px solid #cccccc;
  }
}
.user-details-container {
  width: 100%;
}
.user-details {
  position: relative;
  width: 100%;
  height: 185px;
  overflow: hidden;
  background-color: white;
  z-index: 1;

  .user-details-avatar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    text-align: center;
  }
  .user-id {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }
}

.bg-image {
  background-size: cover;
  filter: blur(5px);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;

  &::before {
    display: block;
    content: "";
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }
}

.edit-user-details {
  width: 100%;
  .custom-title {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #333;
  }
  .custom-value {
    margin-left: 35px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #666666;
  }
}
</style>