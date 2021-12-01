<template>
  <div>
    <div class="item-title">基本信息</div>
    <div class="page-body">
      <van-form @submit="onSubmit">
         <van-field
          readonly
          clickable
          name="picker"
          :value="from.datafrom"
          label="事件类型来源"
          placeholder="请选择事件类型来源"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.rwlx"
          label="任务类型"
          placeholder="请选择任务类型"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.qdlx"
          label="清单类型"
          placeholder="请选择清单类型"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.type"
          label="事件类型:"
          input-align="right"
        />
        <van-field
      readonly
        clickable
        name="picker"
        v-model="from.gis"
        label="位置信息"
        placeholder="请输入位置信息"
        autosize
        type="textarea"
        maxlength="500"
        show-word-limit
        input-align="right"
      />
        <van-field
        readonly
          clickable
          name="picker"
          :value="from.realname"
          label="反馈人姓名:"
          input-align="right"
        />
        <van-field
        readonly
          clickable
          name="picker"
          :value="from.mobile"
          label="联系电话:"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.blbm"
          label="处理部门:"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.blryname"
          label="处理人员:"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="currentDate"
          label="完成时限"
          input-align="right"
        />
        <van-field
          readonly
          :value="from.content"
          rows="2"
          autosize
          label-width="130"
          label="事件问题描述:"
          type="textarea"
          maxlength="500"
          show-word-limit
        />
        <div class="img-box ">
          <div style="margin-bottom:10px;font-size: 14px;">现场情况图片:</div>
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="img in imgs" :key="img.id">
              <van-image
                width="95%"
                height="170"
                :src="'http://47.100.192.253:8100/files/' + img.attpath"
              />
            </van-swipe-item>
          </van-swipe>
        </div>

        <!-- <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div> -->
        <div class="img-box ">
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
          <van-field
            readonly
            clickable
            :value="item.content"
            label="处理内容："
            type="textarea"
            input-align="right"
            autosize
          />
        </div>
      </van-form>
      <div style="height:80px"></div>
    </div>
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
export default {
  data() {
    return {
      id: "",
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
      imgs: [],
      nodeList: [],
    };
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
    this.id = this.$route.query.id;

    getEvenDetail(this.id).then((res) => {
      this.from = res.data;
      this.currentDate = res.data.wcsx;
    });

    getEventattList(this.id).then((res) => {
      this.imgs = res.data;
    });

    getNodeList(this.id).then((res) => {
      this.nodeList = res.data;
    });
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
  margin: 20px 0 0 30px;
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
</style>
