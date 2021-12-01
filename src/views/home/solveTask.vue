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
          @click="openPopup('事件类型来源')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.rwlx"
          label="任务类型"
          placeholder="请选择任务类型"
          input-align="right"
          @click="openPopup('任务类型')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.qdlx"
          label="清单类型"
          placeholder="请选择清单类型"
          input-align="right"
          @click="openPopup('清单类型')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.type"
          label="事件类型"
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
          label="反馈人姓名"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.mobile"
          label="联系电话"
          input-align="right"
        />
        <!-- <van-field
        readonly
        clickable
        name="picker"
        :value="from.blbm"
        label="处理部门"
        placeholder="请选择处理部门"
        input-align="right"
        @click="openPopup('处理部门')"
      /> -->
        <van-field
          :readonly="state === '1'"
          clickable
          name="picker"
          v-model="from.blbm"
          label="处理部门"
          placeholder="请选择处理部门"
          input-align="right"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.blryname"
          label="处理人员"
          placeholder="请选择处理人员"
          input-align="right"
          @click="openPopup('处理人员')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="currentDate"
          label="完成时限"
          placeholder="请输入完成时限"
          input-align="right"
          @click="openPopup('完成时限')"
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
          <div style="margin-bottom:10px;font-size: 14px;">现场情况图片</div>
          <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="img in imgs" :key="img.id">
              <van-image
                width="95%"
                height="170"
                :src="'http://47.100.192.253:8100/files/' + img.attpath"
              />
            </van-swipe-item>
            <!-- http://192.168.0.243:8100/files/ -->
            <!--  :src="'http://47.100.192.253:8100/files/' + img.attpath"-->
          </van-swipe>
        </div>

        <!-- <van-image
          width="100%"
          height="170"
          :src="require('./../../assets/images/WechatIMG151.jpeg')"
        /> -->
        <van-field
          v-show="state === '1'"
          v-model="content"
          rows="2"
          autosize
          label="处理描述:"
          type="textarea"
          maxlength="500"
          show-word-limit
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
          <div style="width:100%;height:10px"></div>
          <van-button
            round
            block
            type="danger"
            native-type="button"
            v-show="tab === '待受理'"
            @click="onBack"
            >退回</van-button
          >
        </div>
        <div style="height:80px"></div>
      </van-form>
    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        title="选择完整时间"
        @confirm="onConfirm"
        @change="onChange"
        @cancel="showPicker = false"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>
    <van-popup v-model="showListPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onListConfirm"
          @cancel="showListPicker = false"
        />
      </van-popup>

  </div>
</template>

<script>
import { Form as VanForm } from "vant";
import { Field as VanField } from "vant";
import { Button as VanButton } from "vant";
import { Image as VanImage } from "vant";
import { Picker as VanPicker } from "vant";
import { Swipe as VanSwipe, SwipeItem as VanSwipeItem } from "vant";
import { DatetimePicker as VanDatetimePicker, Popup as vanPopup } from "vant";
import { mapState } from "vuex";
import {
  getEvenDetail,
  getEventattList,
  getEventActive,
  eventCommit,
  getSjly,
  getRwlx,
  getQdlx,
} from "@/network/api/api";
import { formatDate } from "@/util/data";
export default {
  data() {
    return {
      id: "",
      state: 0,
      isClick: false,
      tab: "",
      from: {
        type: "",
        gis: "",
        realname: "",
        mobile: "",
        blbm: "",
        blryname: "",
        content: "",
      },
      blryuid: "",
      imgs: [],
      content: "",
      currentDate: "",
      showPicker: false,
      showListPicker:false,
      columns:[],
      eventTypeCol:[],
      taskCol:[],
      listCol:[],
      currentCell:'',
      minDate: new Date(),
      maxDate: new Date(2125, 10, 1),
    };
  },
  computed: {
    ...mapState("Public", ["user"]),
  },
  components: {
    VanForm,
    VanField,
    VanButton,
    VanImage,
    VanSwipe,
    VanSwipeItem,
    VanDatetimePicker,
    vanPopup,
    VanPicker
  },
  mounted() {
    this.state = this.$route.query.state;
    this.id = this.$route.query.id;
    this.tab = this.$route.query.tab;

    // dd.confirm({
    //     title: "data",
    //     message: JSON.stringify({1:this.state}),
    //     buttonLabels: ["ok", "cancel"],
    //   });

    getEvenDetail(this.id).then((res) => {
      this.from = res.data;
      dd.confirm({
        title: "data",
        message: JSON.stringify(this.from ),
        buttonLabels: ["ok", "cancel"],
      });
      this.currentDate = res.data.wcsx;
    });
    getEventattList(this.id).then((res) => {
      this.imgs = res.data;
    });

    getSjly().then((res) => {
      this.eventTypeCol = res.data.split(",");
    });
    getRwlx().then((res) => {
      this.taskCol = res.data.split(",");
      // dd.confirm({
      //   title: "data",
      //   message: JSON.stringify({2:this.taskCol}),
      //   buttonLabels: ["ok", "cancel"],
      // });
    });
    getQdlx().then((res) => {
      this.listCol = res.data.split(",");
    });

    aplus_queue.push({
      action: "aplus.sendPV",
      arguments: [
        {
          is_auto: false,
        },
        {
          page_name: "处理任务",
        },
      ],
    });
  },

  methods: {
    onSubmit() {
      // dd.confirm({
      //   title: "data",
      //   message: JSON.stringify(data),
      //   buttonLabels: ["ok", "cancel"],
      // });

      if (this.state !== "1") {
        const data = {
          eventid: this.id,
          accept: "同意",
          blbm: this.from.blbm,
          blryuid: this.blryuid,
          blryname: this.from.blryname,
          wcsx: this.currentDate,
        };
        if (!data.blbm) {
          dd.toast({
            text: "处理部门不能为空", //提示信息
          });
          return;
        } else if (!data.blryname) {
          dd.toast({
            text: "处理人员不能为空", //提示信息
          });
          return;
        } else if (!data.wcsx) {
          dd.toast({
            text: "完成时限不能为空", //提示信息
          });
          return;
        }
        //   dd.confirm({
        //   title: "data",
        //   message: JSON.stringify(data),
        //   buttonLabels: ["ok", "cancel"],
        // });
        if (this.isClick) return;
        dd.showLoading({
          text: "提交数据中", //提示信息
        }).then((res) => {
          this.isClick = true;
        });

        getEventActive(data).then((res) => {
          dd.hideLoading({}).then((res) => {
            dd.toast({
              text: "提交成功", //提示信息
            });
          });
          this.isClick = false;
          this.$router.replace("/");
        });
      } else {
        if (!this.content) {
          dd.toast({
            text: "处理描述不能为空", //提示信息
          });
          return;
        }

        const data = {
          eventid: this.id,
          content: this.content,
        };
        if (this.isClick) return;
        dd.showLoading({
          text: "提交数据中", //提示信息
        }).then((res) => {
          this.isClick = true;
        });
        eventCommit(data).then((res) => {
          dd.hideLoading({}).then((res) => {
            dd.toast({
              text: "提交成功", //提示信息
            });
          });
          this.isClick = false;
          this.$router.replace("/");
        });
      }
    },
    onBack() {
      const _that = this;
      dd.confirm({
        title: "温馨提示",
        message: "是否退回",
        buttonLabels: ["确认退回", "取消"],
      }).then((res) => {
        if (!res.buttonIndex) {
          getEventActive({ eventid: _that.id, back: true }).then((res) => {
            dd.toast({
              text: "提交成功", //提示信息
            });
            _that.$router.replace("/");
          });
        }
      });
    },
    openPopup(name) {
      this.currentCell = name;
      if (this.state === "1") return;
      if (name === "处理部门") {
        dd.chooseDepartments({
          title: "请选择处理部门",
          multiple: true, //是否多选
          maxDepartments: 4000,
        })
          .then((res) => {
            this.from.blbm = res.departments.map((item) => item.name).join(",");
            // dd.confirm({
            //   title: "authConfigsuss",

            //   message: JSON.stringify(res.departments),
            //   buttonLabels: ["ok", "cancel"],
            // });
          })
          .catch((e) => {});
      } else if (name === "处理人员") {
        dd.chooseContactWithComplexPicker({
          title: "请选择处理人员",
          multiple: false, //是否多选
          // responseUserOnly: true, d
        }).then((res) => {
          // that.CoPersons = res.users;
          this.blryuid = res.users.map((item) => item.userid).join(",");
          this.from.blryname = res.users.map((item) => item.name).join(",");
          // dd.confirm({
          //   title: "authConfigsuss",

          //   message: JSON.stringify({ 1: this.blryname }),
          //   buttonLabels: ["ok", "cancel"],
          // });
        });
      } else if (name === "完成时限") {
        this.showPicker = true;
      }else if (name === "事件类型来源") {
        this.showListPicker = true;
        this.columns = this.eventTypeCol;
      } else if (name === "清单类型") {
        this.showListPicker = true;
        this.columns = this.listCol;
      } else if (name === "任务类型") {
        this.showListPicker = true;
        this.columns = this.taskCol;
      }
    },
    onConfirm(value) {
      // dd.confirm({
      //   title: "authConfigsuss",

      //   message: JSON.stringify({ 1: data }),
      //   buttonLabels: ["ok", "cancel"],
      // });
      this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
      this.showPicker = false;
    },
    onChange() {
      this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
    },

    onListConfirm(value){
      switch (this.currentCell) {
        case "事件类型来源":
          this.datafrom = value;
          this.showPicker = false;
          break;
        case "清单类型":
          this.qdlx = value;
          this.showPicker = false;
          break;
        case "任务类型":
          this.rwlx = value;
          this.showPicker = false;
          break;
      }
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
  margin: 20px 0 0 30px;
}
</style>
