<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="事件类型来源">
        <el-select
          v-model="from.datafrom"
          placeholder="请选择"
          :disabled="row.state === '1'"
          style="width:100%"
        >
          <el-option
            v-for="item in eventCol"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务类型">
        <el-select
          v-model="from.rwlx"
          placeholder="请选择"
          :disabled="row.state === '1'"
          style="width:100%"
        >
          <el-option
            v-for="item in taskCol"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="清单类型">
        <el-select
          v-model="from.qdlx"
          placeholder="请选择"
          :disabled="row.state === '1'"
          style="width:100%"
        >
          <el-option
            v-for="item in listCol"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="事件类型">
        <el-select
          v-model="from.type"
          placeholder="请选择"
          disabled
          style="width:100%"
        >
          <el-option
            v-for="item in eventTypeCol"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="位置信息">
        <el-input
          v-model="from.gis"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder="请输入位置信息"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈人姓名">
        <el-input
          v-model="from.realname"
          placeholder="请输入反馈人姓名"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input
          v-model="from.mobile"
          placeholder="请输入联系电话"
          disabled
        ></el-input>
      </el-form-item>

      <el-form-item label="处理部门">
        <el-select
          v-model="from.blbm"
          placeholder="请选择"
          :disabled="row.state === '1'"
          style="width:100%"
        >
          <el-option
            v-for="item in blbmCol"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="处理人员">
        <el-input
          v-model="from.blryname"
          placeholder="请选择处理人员"
          :disabled="row.state === '1'"
        >
          <template slot="append"
            ><span @click="openPopup('处理人员')">选择</span></template
          >
        </el-input>
      </el-form-item>
      <el-form-item label="完成时限">
        <el-date-picker
          v-model="currentDate"
          type="datetime"
          placeholder="请输入完成时限"
          align="right"
          format="yyyy-MM-dd HH-mm"
          value-format="yyyy-MM-dd HH:mm"
          :disabled="row.state === '1'"
          style="width:100%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件问题描述">
        <el-input
          v-model="from.content"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder="请输入事件问题描述"
          disabled
        ></el-input>
      </el-form-item>
      <div class="img-box ">
        <div style="margin-bottom:10px;font-size: 14px;">现场情况图片</div>
        <van-swipe :autoplay="3000" indicator-color="white">
          <van-swipe-item v-for="(img, index) in spliImgs" :key="index">
            <el-image
              style="width: 100%; height: 300px"
              :src="img"
              fit="contain"
              :preview-src-list="spliImgs"
            >
            </el-image>
            <!-- <van-image width="95%" height="170" :src="img" /> -->
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
      <el-form-item label="处理描述">
        <el-input
          v-show="row.state === '1'"
          v-model="content"
          type="textarea"
          :autosize="{
            minRows: 2
          }"
          placeholder="请输入处理描述描述"
        ></el-input>
      </el-form-item>

      <div class="img-box" v-show="row.state === '1'">
        <div style="margin-bottom:5px;font-size: 14px;">
          处理现场情况图片
        </div>
        <filesSelect @sendFiles="onSendFiles" />
      </div>
      <div style="margin: 16px;">
        <van-button
          round
          block
          type="info"
          native-type="button"
          @click="onSubmit"
          >提交</van-button
        >
        <div style="width:100%;height:5px"></div>
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
    </el-form>
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
import filesSelect from "./filesSelect.vue";
import config from "@/util/config";
import { mapState } from "vuex";
import {
  getEvenDetail,
  getEventattList,
  getEventActive,
  eventCommit,
  getSjly,
  getRwlx,
  getQdlx,
  getBlbm,
} from "@/network/api/api";
import { formatDate } from "@/util/data";
const { imgPath } = config;
export default {
  data() {
    return {
      src: imgPath,
      // state: 0,
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
        datafrom: "",
        rwlx: "",
        qdlx: "",
      },
      base64: [],
      blryuid: "",
      imgs: [],
      content: "",
      currentDate: "",
      showPicker: false,
      showListPicker: false,
      columns: [],
      eventTypeCol: [],
      taskCol: [],
      listCol: [],
      currentCell: "",
      minDate: new Date(),
      maxDate: new Date(2125, 10, 1),
    };
  },
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
    tab: {
      type: String,
      default: "",
    },
  },
  watch: {
    row: {
      handler(row) {
        // dd.confirm({
        //   title: "hasLogin",
        //   message: JSON.stringify({ 1: ID }),
        //   buttonLabels: ["ok", "cancel"],
        // });
        getEvenDetail(row.id).then((res) => {
          this.from = res.data;
          this.currentDate = res.data.wcsx;
        });
        getEventattList(row.id).then((res) => {
          this.imgs = res.data;
        });

        getSjly().then((res) => {
          this.eventTypeCol = res.data.split(",");
        });
        getRwlx().then((res) => {
          this.taskCol = res.data.split(",");
        });
        getQdlx().then((res) => {
          this.listCol = res.data.split(",");
        });
        getBlbm().then((res) => {
          this.blbmCol = res.data.split(",");
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState("Public", ["user"]),
    spliImgs() {
      return this.imgs.map((img) => this.src + img.attpath);
    },
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
    VanPicker,
    filesSelect,
  },
  mounted() {
    // this.state = this.$route.query.state;
    // this.tab = this.$route.query.tab;

    // dd.confirm({
    //     title: "data",
    //     message: JSON.stringify({1:this.state}),
    //     buttonLabels: ["ok", "cancel"],
    //   });

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

      if (this.row.state !== "1") {
        const data = {
          eventid: this.row.id,
          accept: "同意",
          blbm: this.from.blbm,
          blryuid: this.blryuid,
          blryname: this.from.blryname,
          wcsx: this.currentDate,

          datafrom: this.from.datafrom,
          rwlx: this.from.rwlx,
          qdlx: this.from.qdlx,
          type: this.from.type,
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
        } else if (!data.rwlx) {
          dd.toast({
            text: "任务类型不能为空", //提示信息
          });
          return;
        } else if (!data.qdlx) {
          dd.toast({
            text: "清单类型不能为空", //提示信息
          });
          return;
        } else if (!data.type) {
          dd.toast({
            text: "事件类型不能为空", //提示信息
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
          this.$emit("closeDialog");
        });
      } else {
        if (!this.content) {
          dd.toast({
            text: "处理描述不能为空", //提示信息
          });
          return;
        }
        // else if (!this.base64.length) {
        //   dd.toast({
        //     text: "处理现场图片不能为空", //提示信息
        //   });
        //   return;
        // }

        const data = {
          eventid: this.row.id,
          content: this.content,
          // base64: this.base64,
        };
        if (this.base64.length) data["base64"] = this.base64;
        if (this.isClick) return;
        dd.showLoading({
          text: "提交数据中", //提示信息
        }).then((res) => {
          this.isClick = true;
        });
        eventCommit(data).then((res) => {
          // dd.confirm({
          //   title: "data",
          //   message: JSON.stringify(res),
          //   buttonLabels: ["ok", "cancel"],
          // });
          if (res.code !== "200") {
            dd.toast({
              text: "提交成功", //提示信息
            });
            return;
          }
          dd.hideLoading({}).then((res) => {
            dd.toast({
              text: "提交成功", //提示信息
            });
          });
          this.isClick = false;
          this.$emit("closeDialog");
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
            _that.$emit("closeDialog");
          });
        }
      });
    },
    openPopup(name) {
      this.currentCell = name;
      if (this.row.state === "1") return;
      if (name === "处理部门") {
        // dd.chooseDepartments({
        //   title: "请选择处理部门",
        //   multiple: true, //是否多选
        //   maxDepartments: 4000,
        // })
        //   .then((res) => {
        //     this.from.blbm = res.departments.map((item) => item.name).join(",");
        //     // dd.confirm({
        //     //   title: "authConfigsuss",

        //     //   message: JSON.stringify(res.departments),
        //     //   buttonLabels: ["ok", "cancel"],
        //     // });
        //   })
        //   .catch((e) => {});
        this.showListPicker = true;
        this.columns = this.blbmCol;
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
      } else if (name === "事件类型来源") {
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
    onSendFiles(flies) {
      this.base64 = flies;
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

    onListConfirm(value) {
      switch (this.currentCell) {
        case "事件类型来源":
          this.from.datafrom = value;
          this.showListPicker = false;
          break;
        case "清单类型":
          this.from.qdlx = value;
          this.showListPicker = false;
          break;
        case "任务类型":
          this.from.rwlx = value;
          this.showListPicker = false;
          break;
        case "处理部门":
          this.from.blbm = value;
          this.showListPicker = false;
          break;
      }
    },
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

