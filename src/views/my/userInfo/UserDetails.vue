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
      </section>

      <section>
        <div class="user-name margin-top" v-if="isEdit">
          <van-cell is-link>
            <!-- 使用 title 插槽来自定义标题 -->
            <template #title>
              <span class="custom-title">昵称</span>
              <span class="custom-value">{{ userInfo.name }}</span>
            </template>
          </van-cell>
        </div>
        <div class="edit-user-details" v-else>
          <div class="user-base-details margin-top">
            <div
              v-for="(value, name) in userInfoBase"
              :class="{
                'border-bottom': isSetItem(name, 'ture'),
                'set-item ': isSetItem(name),
                'margin-top': isSetItem(name),
              }"
              :key="name"
            >
              <van-cell
                is-link
                @click="cellEvent(name)"
                v-if="isSetItem(name, 'ture')"
              >
                <template #title>
                  <span class="custom-title">{{ name }}</span>
                  <span class="custom-value">{{ value }}</span>
                </template>
              </van-cell>
              <van-cell :title="name" is-link :value="value" v-else />
            </div>
          </div>
        </div>
      </section>
    </article>

    <buttom-popup v-model="PopupProps.open" :title="PopupProps.title">
      <template>
        <component v-bind:is="currentPopupComponent"></component>
      </template>
    </buttom-popup>
  </div>
</template>

<script>
import { cell as vanCell, image as vanImage, loading as vanLoading } from "vant"
// import buttomPopup from "./UserDetailsPopup"
import buttomPopup from "@/components/common/popup/Popup"
import picker from "@/components/common/picker/Picker.vue"
import { EventBus } from "../../../router/eventBus"

export default {
  name: "UserDetails",
  data () {
    return {
      isEdit: false,
      bg_image: "https://img.yzcdn.cn/vant/cat.jpeg",
      userInfo: {
        user_id: '101566',
        name: 'adair',
        sex: '男',
        birthday: '1994-03-28 白羊座',
        height: '169',
        weight: '48',
        city: '杭州',
        Signature: '我就是我，不一样的烟火哈哈哈...',
        certification_information: "已设置",
        set_subscription: "",
        set_WeChat: ""
      },
      PopupProps: { open: false, title: "" },
      currentPopupContentComponent: "",
      PopupContentComponent: ["picker",]
    }
  },
  computed: {
    userInfoBase () {
      let i = {
        name: '昵称',
        sex: '性别',
        birthday: '生日',
        height: '身高',
        weight: '体重',
        city: '城市',
        Signature: '个性签名',
        certification_information: '认证信息',
        set_subscription: '设置会员订阅',
        set_WeChat: '设置微信号打赏'
      }
      let item = {}
      for (const [key, value] of Object.entries(this.userInfo)) {
        let newKey = i[key] || key
        console.log(newKey, value)
        if (newKey !== "user_id") item[newKey] = value
      }
      return item
    }
  },
  methods: {
    isSetItem (name, Negate = false) {
      // 根据是否是设置项添加class，或者渲染不同的项
      let result = name === '认证信息' || name === '设置会员订阅' || name === '设置微信号打赏' ? true : false
      console.log(result)
      if (Negate) {
        return !result
      } else {
        return result
      }
    },
    cellEvent (title) {
      // 弹出popup
      if (title !== "昵称" && title !== "个性签名") {
        this.PopupProps.open = true
        this.PopupProps.title = title

      }


    },
  },
  components: {
    vanImage,
    vanLoading,
    vanCell,
    buttomPopup,
    picker
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