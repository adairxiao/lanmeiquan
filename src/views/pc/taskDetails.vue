<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="事件类型来源">
        <el-input disabled v-model="from.datafrom"></el-input>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-input disabled v-model="from.rwlx"></el-input>
      </el-form-item>
      <el-form-item label="清单类型">
        <el-input disabled v-model="from.qdlx"></el-input>
      </el-form-item>
      <el-form-item label="事件类型">
        <el-input disabled v-model="from.type"></el-input>
      </el-form-item>

      <el-form-item label="位置信息">
        <el-input
          disabled
          v-model="from.gis"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder="请输入位置信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈人姓名">
        <el-input
          disabled
          v-model="from.realname"
          placeholder="请输入反馈人姓名"
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          disabled
          v-model="from.mobile"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>

      <el-form-item label="处理部门">
        <el-input
          disabled
          v-model="from.blbm"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>

      <el-form-item label="处理人员">
        <el-input disabled v-model="from.blryname" placeholder="请选择处理人员">
        </el-input>
      </el-form-item>
      <el-form-item label="完成时限">
        <el-input
          disabled
          v-model="currentDate"
          placeholder="请输入联系电话"
        ></el-input>
      </el-form-item>
      <el-form-item label="事件问题描述">
        <el-input
          disabled
          v-model="from.content"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder="请输入事件问题描述"
        ></el-input>
      </el-form-item>
      <div class="img-box ">
        <div style="margin-bottom:10px;font-size: 14px;">现场情况:</div>
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(img,index) in spliCLImgs" :key="index">
            <el-image
              style="width: 100%; height: 300px"
              :src="img"
              fit="contain"
              :preview-src-list="spliCLImgs"
            >
            </el-image>
            <div class="down-btn" @click="handleDownImg(img)">下载</div>
          </van-swipe-item>
        </van-swipe>
        
      </div>

      <!-- <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div> -->
      <div class="img-box">
        <div style="margin-bottom:10px;font-size: 14px;">处理情况</div>
      </div>
      <!-- <van-steps direction="vertical" inactive-color="black">
        <van-step v-show="false">买家下单</van-step>
        <van-step v-for="item in nodeList" :key="item.id"> -->
      <!-- <div class="centent-box">
            <div class="content-box-left">
              <div v-show="item.state === '2'">
                处理时间：{{ item.updateTime || "2021/02/02 15:03:00" }}
              </div>
              <div>处理人：{{ item.realname || "姓名" }}</div>
              <div v-show="item.state === '2'">
                <div>处理内容：</div>
                <div>
                  {{ item.content }}
                </div>
              </div>
            </div>
            <div class="content-box-right">
              <van-tag :type="item.state === '1' ? 'danger' : 'primary'">{{
                item.state === "1" ? "处理中" : "已处理"
              }}</van-tag>
            </div>
          </div> -->
      <!--  -->

      <!-- </van-step>
      </van-steps> -->
      <div v-for="item in nodeList" :key="item.id">
        <van-field
          readonly
          clickable
          :value="item.state === '1' ? '处理中' : '已处理'"
          label="处理状态："
          input-align="right"
        />
        <van-field
          readonly
          clickable
          :value="item.updateTime"
          label="处理时间："
          input-align="right"
        />
        <van-field
          readonly
          clickable
          :value="item.realname"
          label="处理人："
          input-align="right"
        />
        <!-- <van-field
          readonly
          clickable
          :value="item.content"
          label="处理内容："
          type="textarea"
          input-align="right"
          autosize
        /> -->
        <el-form label-width="100px">
        <el-form-item label="处理内容：">
        <el-input
          disabled
          v-model="item.content"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder=""
        ></el-input>
      </el-form-item>
        </el-form>
      </div>
      <div class="img-box " v-show="from.state !== '1'">
        <div style="margin-bottom:10px;font-size: 14px;">处理后现场情况:</div>
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(img,index) in spliSBImgs" :key="index">
            <el-image
              style="width: 100%; height: 300px"
              :src="img"
              fit="contain"
              :preview-src-list="spliSBImgs"
            >
            </el-image>
            <div class="down-btn"  @click="handleDownImg(img)">下载</div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </el-form>
    <div style="height:80px"></div>
  </div>
</template>

<script>
import { Form as VanForm } from "vant";
import { Field as VanField } from "vant";
import { Button as VanButton } from "vant";
import { Image as VanImage } from "vant";
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";
import { Tag as vanTag } from "vant";
import { Steps as vanSteps, Step as vanStep } from "vant";
import { getEvenDetail, getEventattList, getNodeList } from "@/network/api/api";
import config from "@/util/config";
const { imgPath } = config;
export default {
  data() {
    return {
      src: imgPath,
      from: {
        type: "",
        gis: "",
        realname: "",
        mobile: "",
        blbm: "",
        blryname: "",
        content: "",
      },
      currentDate: "",
      clImgs: [],
      sbImgs: [],
      nodeList: [],
    };
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  watch: {
    row: {
      handler(row) {
        // dd.confirm({
        //   title: "row",
        //   message: JSON.stringify({ 1: row }),
        //   buttonLabels: ["ok", "cancel"],
        // });
        getEvenDetail(row.id).then((res) => {
          this.from = res.data;
          this.currentDate = res.data.wcsx;
        });

        getEventattList(row.id).then((res) => {
          // this.imgs = res.data;
          this.clImgs = res.data.filter((img) => img.atttype !== "处理");
          this.sbImgs = res.data.filter((img) => img.atttype !== "上报");
        });

        getNodeList(row.id).then((res) => {
          this.nodeList = res.data;
        });
      },
      deep: true,

      immediate: true,
    },
  },
  computed: {
    spliCLImgs() {
      return this.clImgs.map((img) => this.src + img.attpath);
    },
    spliSBImgs(){
      return this.sbImgs.map((img) => this.src + img.attpath);
    }
  },
  components: {
    VanForm,
    VanField,
    VanButton,
    VanImage,
    VanSwipe,
    VanSwipeItem,
    vanSteps,
    vanStep,
    vanTag,
  },
  mounted() {
    aplus_queue.push({
      action: "aplus.sendPV",
      arguments: [
        {
          is_auto: false,
        },
        {
          page_name: "查看事件详情",
        },
      ],
    });
  },

  methods: {
    onSubmit() {},
    handleDownImg(img){
      // dd.confirm({
      //     title: "img",
      //     message: JSON.stringify({1:img}),
      //     buttonLabels: ["ok", "cancel"],
      //   });
        const date =  new Date()
        const elink = document.createElement("a");
        elink.download = date.valueOf();
        elink.style.display = "none";
        elink.href = img
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    }
  },
};
</script>

<style scoped>
.item-title {
  border-bottom: 1px dashed #ccc;
  padding: 5px 30px;
  font-size: 32px;
}

.v-select {
  width: 100%;
}

.img-box {
  margin-left: 10px;
}

.centent-box {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.centent-box > .content-box-left {
  flex: 0 0 auto;
}
.centent-box > .content-box-left > div:last-child {
  display: flex;
  flex-flow: row nowrap;
  width: 500px;
}
.centent-box > .content-box-left > div:last-child > div:first-child {
  /* flex: 0 0 auto; */
  width: 150px;
}
.centent-box > .content-box-left > div:last-child > div:last-child {
  width: 300px;
  overflow-wrap: break-word;
}

.centent-box > .content-box-left {
  flex: 0 0 auto;
  /* width: 5px; */
}

.down-btn{
  margin:0 auto;
  width:30px;
  color:#5cadff;
  cursor:pointer;
  text-align: center;
}
/deep/ .el-input.is-disabled .el-input__inner {
    background-color: #fff !important;
    border-color: #e4e7ed !important;
    color: black !important;
    cursor: pointer !important;
}

/deep/  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff !important;
    border-color: #e4e7ed !important;
    color: black !important;
    cursor: pointer !important;
}
</style>
