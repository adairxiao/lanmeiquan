<template>
  <div id="app">
    <van-image
      width="100%"
      height="190"
      :src="require('./assets/images/1hour.jpg')"
    />

    <router-view v-if="roleLoading" />
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
import { mapActions } from "vuex";

// import { getToken } from "@/network/api/api";
export default {
  name: "App",
  data() {
    return {
      timeID: "",
      roleLoading: false,
    };
  },
  // computed: {
  //   ...mapState("Public", ["user"]),
  // },
  mounted() {
    dd.showLoading({
      text: "加载中", //提示信息
    });
    this.timeID = setTimeout(() => {
      dd.ready(() => {
        this.getUser().then((res) => {
          this.roleLoading = true;
          dd.hideLoading({});
        });
      });
      clearTimeout(this.timeID);
    }, 200);
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["aplus-waiting", "MAN"],
    });
    
  },
  methods: {
    ...mapActions("Public", ["getUser"]),
  },
  components: {
    VanImage,
  },
};
</script>
<style lang="less">
// 引入base.css
@import "assets/css/base.css";
.page-body {
  width: 100%;
  height: 80vh;
  padding-bottom: 50px;
  overflow-y: scroll;
}
</style>
