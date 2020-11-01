<template>
  <div>
    <div class="user-details-tab-ber"><router-view /></div>
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
            <div class="user-base-details">
              <div
                v-for="(value, name) in userInfoItem"
                :class="{
                  'border-bottom': isSetItem(name, 'ture'),
                  'set-item ': isSetItem(name),
                  'margin-top': isSetItem(name),
                }"
                :key="name"
                @click="cellEvent(name, value)"
              >
                <van-cell is-link v-if="isSetItem(name, 'ture')">
                  <template #title>
                    <span class="custom-title">{{ name }}</span>
                    <span class="custom-value">{{
                      value | gt_ellipsis(name)
                    }}</span>
                  </template>
                </van-cell>
                <van-cell
                  :title="name"
                  is-link
                  :value="value | isSetUp"
                  v-else
                />
              </div>
            </div>
          </div>
        </section>
      </article>
      <buttom-popup v-model="PopupProps.open">
        <template>
          <div v-if="PopupProps.title === '性别'">性别</div>
          <div v-else>
            <picker
              :showToolbar="PopupProps.picker.showToolbar"
              :columns="PopupProps.picker.columns"
              :title="PopupProps.title"
              @confirm="pickerConfirm"
              @cancel="pickerCancel"
            />
          </div>
        </template>
      </buttom-popup>
    </div>
  </div>
</template>

<script>
import {
  cell as vanCell,
  image as vanImage,
  loading as vanLoading,
} from "vant";
// import buttomPopup from "./UserDetailsPopup"
import buttomPopup from "@/components/common/popup/Popup";
import picker from "@/components/common/picker/Picker.vue";

import { EventBus } from "../../../router/eventBus";
import { mapGetters } from "vuex";

import {getLoginUrl} from "@/network/api/api.js"

export default {
  name: "UserDetails",
  inject: ["reload"],
  data() {
    return {
      isEdit: false,
      bg_image: "https://img.yzcdn.cn/vant/cat.jpeg",
      // 给Popup组件传值
      PopupProps: {
        open: false,
        title: "",
        picker: { showToolbar: false, columns: [] },
      },
    };
  },
  computed: {
    ...mapGetters(["userInfo", "userInfoItem"]),
  },
  filters: {
    // 为空时显示已设置
    isSetUp(value) {
      value = value !== "" ? "已设置" : value;

      return value;
    },
    // 超出5个字符省略号显示
    gt_ellipsis(value, label) {
      let val = value || "";
      if (label === "个性签名") {
        if (val.length > 5) val = val.substring(0, 5) + "...";
      }
      return val;
    },
  },

  created() {
    this.$store.dispatch("upDateAsync");
  },
  mounted() {
    console.log(getLoginUrl().then(res=> console.log(res)));
    
    
  },
  methods: {
    //刷新当前页
    currentPage() {
      this.reload("run succes!");
    },
    isSetItem(name, Negate = false) {
      // 根据是否是设置项添加class，或者渲染不同的项
      let result =
        name === "认证信息" ||
        name === "设置会员订阅" ||
        name === "设置微信号打赏"
          ? true
          : false;
      if (Negate) {
        return !result;
      } else {
        return result;
      }
    },
    cellEvent(title, value) {
      // 弹出popup
      console.log();
      switch (title) {
        case "性别":
        case "生日":
        case "身高":
        case "体重":
        case "城市":
        case "设置会员订阅":
          this.usePopup(title);
          break;
        case "昵称":
        case "认证信息":
        case "设置微信号打赏":
          this.toPage(title, value);
          break;
      }
    },
    // 使用popup
    usePopup(title) {
      this.PopupProps.open = true;
      this.PopupProps.title = title;
      this.PopupProps.picker.showToolbar = true;
      this.PopupProps.picker.columns = [
        {
          values: ["周一", "周二", "周三", "周四", "周五"],
          defaultIndex: 2,
        },

        {
          values: ["上午", "下午", "晚上"],
          defaultIndex: 1,
        },
      ];
    },
    // 跳转二级页面
    toPage(title, value) {
      let path = { name: "" };
      if (title === "昵称") {
        path.name = "Name";
        path.query = { labelText: title, textType: "text", textval: "value" };
      } else if (title === "认证信息") {
      }

      this.$router.push(path);
    },
    // 处理picker发送过来的事件
    pickerConfirm(value) {
      console.log(value);
    },
    pickerCancel(value) {
      this.PopupProps.open = value;
    },
  },
  components: {
    vanImage,
    vanLoading,
    vanCell,
    buttomPopup,
    picker,
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

.edit-user-details,
.user-name {
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