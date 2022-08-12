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
        <filesSelect @sendFiles="onSendFiles" />
      </div>

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
          :loading="isLoading"
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
  saveFromzzd,
  uploadBybase64,
  getSjlx,
  getSjly,
  getRwlx,
  getQdlx,
  getBlbm,
} from "@/network/api/api";
import { formatDate } from "@/util/data";
import Schema from "async-validator";

export default {
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
      isLoading: false,
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
      //
      currentCell: "",
      base64: [],
      currentDate: "",
      shoDtaPicker: false,
      minDate: new Date(),
      maxDate: new Date(2125, 10, 1),
      descriptor: {
        datafrom: [
          { type: "string", required: true, message: "数据来源不能为空" },
        ],
        rwlx: [{ type: "string", required: true, message: "任务类型不能为空" }],
        qdlx: [{ type: "string", required: true, message: "清单类型不能为空" }],
        type: [{ type: "string", required: true, message: "事件类型不能为空" }],
        gis: [{ type: "string", required: true, message: "位置信息不能为空" }],
        realname: [
          { type: "string", required: true, message: "反馈人员不能为空" },
        ],
        mobile: [
          {
            type: "string",
            pattern: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
            message: "手机号格式不正确",
          },
        ],
        blbm: [{ type: "string", required: true, message: "处理部门不能为空" }],
        blryname: [
          { type: "string", required: true, message: "处理人员不能为空" },
        ],
        wcsx: [{ type: "string", required: true, message: "完成时限不能为空" }],
        content: [
          { type: "string", required: true, message: "问题描述不能为空" },
        ],
      },
    };
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
      const data = {
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
      };

      const validator = new Schema(this.descriptor);

      validator.validate(data, (errors, fields) => {
        if (errors) {
          dd.toast({
            text: errors[0].message, //提示信息
          });
        } else {
          if (this.base64.length) data["base64"] = this.base64;
          if (this.isLoading) return;

          this.isLoading = true;
          saveFromzzd(data).then((res) => {
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
            this.isLoading = false;
          });
        }
      });

      // this.$router.push("/");
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
