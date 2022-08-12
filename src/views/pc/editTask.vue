<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="事件类型来源">
        <el-select v-model="datafrom" placeholder="请选择" style="width:100%">
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
        <el-select v-model="rwlx" placeholder="请选择" style="width:100%">
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
        <el-select v-model="qdlx" placeholder="请选择" style="width:100%">
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
        <el-select v-model="type" placeholder="请选择" style="width:100%">
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
          v-model="gis"
          type="textarea"
          :autosize="{
            minRows: 2,
          }"
          placeholder="请输入位置信息"
        ></el-input>
      </el-form-item>
      <el-form-item label="反馈人姓名">
        <el-input v-model="realname" placeholder="请输入反馈人姓名"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="mobile" placeholder="请输入联系电话"></el-input>
      </el-form-item>

      <el-form-item label="处理部门">
        <el-select v-model="blbm" placeholder="请选择" style="width:100%">
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
        <el-input disabled v-model="blryname" placeholder="请选择处理人员">
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
          style="width:100%"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="事件问题描述">
        <el-input
          v-model="content"
          type="textarea"
          :autosize="{
            minRows: 2,
          }"
          placeholder="请输入事件问题描述"
        ></el-input>
      </el-form-item>
      <div class="img-box ">
        <div style="margin-bottom:10px;font-size: 14px;">现场情况图片</div>
        <filesSelect ref="filesSelect" @sendFiles="onSendFiles" />
      </div>

      <template v-if="statetext === '完成'">
        <el-form-item label="处理描述">
          <el-input
            v-model="result"
            type="textarea"
            :autosize="{
              minRows: 2,
            }"
            placeholder="请输入处理描述"
          ></el-input>
        </el-form-item>
        <div class="img-box ">
          <div style="margin-bottom:10px;font-size: 14px;">
            处理后现场情况图片
          </div>
          <filesSelect ref="filesSelectTow" @sendFiles="onSendFilesTow" />
        </div>
      </template>
      <!-- <van-image
          width="100%"
          height="170"
          :src="require('./../../assets/images/WechatIMG151.jpeg')"
        /> -->
      <div style="margin: 16px;">
        <el-button
          type="primary"
          @click="onSubmit"
          style="width:100%"
          :loading="isClick"
          >提交</el-button
        >
      </div>
    </el-form>
    <div style="height:80px"></div>

    <van-calendar v-model="showCalendar" @confirm="onCalendarConfirm" />
  </div>
</template>

<script>
import { Form as VanForm } from "vant";
import { Field as VanField } from "vant";
import { Button as VanButton } from "vant";
import { Calendar as VanCalendar } from "vant";
import { Uploader as VanUploader } from "vant";
import { DatetimePicker as VanDatetimePicker, Popup as vanPopup } from "vant";
import { Image as VanImage } from "vant";
import filesSelect from "./filesSelect.vue";
import { mapMutations } from "vuex";
import {
  getEvenDetail,
  getEventattList,
  saveFromzzd,
  updateEvent,
  uploadBybase64,
  getSjlx,
  getSjly,
  getRwlx,
  getQdlx,
  getBlbm,
} from "@/network/api/api";
import { formatDate } from "@/util/data";
import config from "@/util/config";

const { imgPath } = config;
export default {
  props: {
    row: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      title: "",
      showPicker: false,
      eventCol: [],
      eventTypeCol: [],
      taskCol: [],
      listCol: [],
      columns: [],
      blbmCol: [],
      isClick: false,
      //
      datafrom: "",
      qdlx: "",
      rwlx: "",
      type: "",
      blbm: [],
      realname: "",
      mobile: "",
      blryuid: "",
      blryname: "",
      content: "",
      gis: "",
      // 处理后内容
      result: "",
      base642: [],
      // 当前表单状态
      statetext: "",

      //
      currentCell: "",
      base64: [],
      currentDate: "",
      shoDtaPicker: false,
      minDate: new Date(),
      maxDate: new Date(2125, 10, 1),
    };
  },
  watch: {
    row: {
      handler(row) {
        getEvenDetail(row.id).then((res) => {
          //   dd.confirm({
          //     title: "row",
          //     message: JSON.stringify({ 1: res.data }),
          //     buttonLabels: ["ok", "cancel"],
          //   });
          const {
            datafrom,
            qdlx,
            rwlx,
            type,
            blbm,
            realname,
            mobile,
            blryuid,
            blryname,
            content,
            gis,
            wcsx,
            statetext,
            result,
          } = res.data;
          this.datafrom = datafrom;
          this.qdlx = qdlx;
          this.rwlx = rwlx;
          this.type = type;
          this.blbm = blbm;
          this.realname = realname;
          this.mobile = mobile;
          this.blryuid = blryuid;
          this.blryname = blryname;
          this.content = content;
          this.gis = gis;
          this.currentDate = wcsx;
          this.statetext = statetext;
          this.result = result;
        });
        getEventattList(row.id).then((res) => {
          res.data.forEach((item) => {
            if (item.atttype === "上报") {
              this.base64.push(item.base64);
              this.$refs["filesSelect"].images = this.base64;
            } else {
              this.base642.push(item.base64);
              this.$refs["filesSelectTow"].images = this.base642;
            }
          });
        });
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    VanForm,
    VanField,
    VanButton,
    VanCalendar,
    VanUploader,
    VanImage,
    filesSelect,
    VanDatetimePicker,
    vanPopup,
  },
  mounted() {
    getSjlx().then((res) => {
      this.eventTypeCol = res.data.split(",");
    });
    getSjly().then((res) => {
      this.eventCol = res.data.split(",");
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
  methods: {
    ...mapMutations([, "setStatus"]),
    onSendFiles(flies) {
      this.base64 = flies;
    },
    onSendFilesTow(flies) {
      this.base642 = flies;
    },
    onConfirm(value) {
      switch (this.currentCell) {
        case "事件类型":
          this.type = value;
          this.showPicker = false;
          break;
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
        case "处理部门":
          this.blbm = value;
          this.showPicker = false;
          break;
        case "完成时限":
          this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
          this.shoDtaPicker = false;
          break;
        default:
          break;
      }
    },
    onCalendarConfirm(date) {
      const item = this.currentCell === "下达时间" ? "startTime" : "endTime";
      this.$data[item] = `${date.getMonth() + 1}/${date.getDate()}`;
      this.showCalendar = false;
    },
    openPopup(name) {
      this.currentCell = name;
      const that = this;
      if (name === "下达时间" || name === "完成时间") {
        this.showCalendar = true;
        return;
      }
      if (name === "事件类型") {
        this.showPicker = true;
        this.columns = this.eventCol;
      } else if (name === "处理人员") {
        dd.chooseContactWithComplexPicker({
          title: "请选择处理人员",
          multiple: false, //是否多选
          // responseUserOnly: false,
        })
          .then((res) => {
            // that.CoPersons = res.users;

            this.blryuid = res.users.map((item) => item.userid).join(",");
            this.blryname = res.users.map((item) => item.name).join(",");
          })
          .catch((err) => {});
      } else if (name === "完成时限") {
        this.shoDtaPicker = true;
      } else if (name === "事件类型来源") {
        this.showPicker = true;
        this.columns = this.eventTypeCol;
      } else if (name === "清单类型") {
        this.showPicker = true;
        this.columns = this.listCol;
      } else if (name === "任务类型") {
        this.showPicker = true;
        this.columns = this.taskCol;
      } else if (name === "处理部门") {
        this.showPicker = true;
        this.columns = this.blbmCol;
      }
    },
    onSubmit() {
      if (this.checkFrom()) {
        const data = {
          eventid: this.row.id,
          datafrom: this.datafrom,
          rwlx: this.rwlx,
          qdlx: this.qdlx,
          type: this.type,
          blbm: this.blbm,
          realname: this.realname,
          mobile: this.mobile,
          blryuid: this.blryuid,
          blryname: this.blryname,
          content: this.content,
          gis: this.gis,
          wcsx: this.currentDate,
          result: this.result,
        };

        if (this.base64.length) data["base64"] = this.base64;
        if (this.base642.length) data["base64_2"] = this.base64;
        if (this.isClick) return;

        this.isClick = true;
        updateEvent(data).then((res) => {
        //   dd.confirm({
        //     title: "updateEvent",
        //     message: JSON.stringify(res),
        //     buttonLabels: ["ok", "cancel"],
        //   });
          if (String(res.code) === "200") {
            dd.toast({
              text: "提交成功", //提示信息
            });

            this.$emit("closeDialog");
          } else {
            dd.toast({
              text: "提交失败", //提示信息
            });
          }
          this.isClick = false;
        });
        // dd.confirm({
        //   title: "authConfigsuss",
        //   message: JSON.stringify({ 1: 1 }),
        //   buttonLabels: ["ok", "cancel"],
        // });
      }
      // saveFromzzd();

      // this.$router.push("/");
    },
    checkFrom() {
      const mobileRx = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!this.datafrom) {
        dd.toast({
          text: "请选择事件类型来源", //提示信息
        });
      } else if (!this.rwlx) {
        dd.toast({
          text: "请选择任务类型", //提示信息
        });
      } else if (!this.qdlx) {
        dd.toast({
          text: "请选择清单类型", //提示信息
        });
      } else if (!this.type) {
        dd.toast({
          text: "请选择事件类型", //提示信息
        });
      } else if (!this.gis) {
        dd.toast({
          text: "请输入位置信息", //提示信息
        });
      } else if (!this.realname) {
        dd.toast({
          text: "请输入反馈人姓名", //提示信息
        });
      } else if (!this.mobile) {
        dd.toast({
          text: "请输入联系电话", //提示信息
        });
      } else if (!mobileRx.test(this.mobile)) {
        dd.toast({
          text: "请输入正确联系电话", //提示信息
        });
      } else if (this.blbm.length === 0) {
        dd.toast({
          text: "请选择处理部门", //提示信息
        });
      } else if (!this.blryname) {
        dd.toast({
          text: "请选择处理人员", //提示信息
        });
      } else if (!this.currentDate) {
        dd.toast({
          text: "请选择完成时限", //提示信息
        });
      } else if (!this.content) {
        dd.toast({
          text: "请输入事件问题描述", //提示信息
        });
      }
      // else if (this.base64.length === 0) {
      //   dd.toast({
      //     text: "请选择现场情况图片", //提示信息
      //   });
      // }
      else {
        return true;
      }
      return false;
    },
    onChange() {
      this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
    },
  },
};
</script>

<style scoped>
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

/deep/ .el-textarea.is-disabled .el-textarea__inner {
  background-color: #fff !important;
  border-color: #e4e7ed !important;
  color: black !important;
  cursor: pointer !important;
}
</style>
