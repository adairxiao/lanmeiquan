<template>
  <div>
    <div class="files-box">
      <div
        class="box-item"
        v-for="(item, index) in images"
        :key="item.lastModified"
      >
        <img
          :style="{ width: '100%', height: '100%' }"
          :src="'data:image/png;base64,' + item"
        />
        <div class="box-Close" @click="onDelete(index)">x</div>
      </div>
      <div class="box-item" @click="onChooseImage">
        <div class="camera">
          <VanImage
            width="30"
            height="30"
            :src="require('./../../assets/images/dfdf.png')"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image as VanImage } from "vant";
export default {
  data() {
    return {
      images: [],
    };
  },
  components: {
    VanImage,
  },
  methods: {
    async onChooseImage() {
      const res = await dd.chooseImage({});

      const files = res.images.map((item) => {
        const reg = /\.(mp4)$/;
        if (!reg.test(item.path)) {
          return item.path;
        }else{
          dd.toast({
            text: "不支持上传视频文件",
            delay: 2000,
          });
        }
      });
      // dd.confirm({
      //   title: "authConfigsuss",

      //   message: JSON.stringify({ 1: !reg.test(item.path)}),
      //   buttonLabels: ["ok", "cancel"],
      // });
      // files.forEach((file) => {
      //   const reg = /\.(mp4)$/;
      //   if (reg.test(file.path)) {
      //     dd.toast({
      //       text: "仅支持tif|bmp|png|jpg|gif|jpeg|webp的图片格式",
      //       delay: 2000,
      //     });
      //   }
      // });
      for (const file of files) {
        const res = await dd.readImageToBase64({ filePath: file });
        this.images.push(res.base64);
      }
      this.$emit("sendFiles", this.images);
    },

    onDelete(index) {
      this.images.splice(index, 1);
    },
  },
};
</script>

<style>
.files-box {
  display: flex;
  flex-flow: row wrap;
}

.box-item {
  /* flex: 1 0 auto; */
  padding: 10px;
  width: 80px;
  height: 80px;
  position: relative;
}

.box-Close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 10px;
  height: 10px;
  line-height: 10px;
  border-bottom-left-radius: 50%;
  background-color: black;
  color: white;
  text-align: center;
}

.camera {
  background-color: rgb(247, 248, 250);
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
