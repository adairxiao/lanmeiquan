<template>
  <div>
    <div class="item-title">修改任务</div>

    <div class="page-body">
      <van-form @submit="onSubmit">
        <van-field
          readonly
          clickable
          name="picker"
          :value="datafrom"
          label="事件类型来源"
          placeholder="请选择事件类型来源"
          input-align="right"
          @click="openPopup('事件类型来源')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="rwlx"
          label="任务类型"
          placeholder="请选择任务类型"
          input-align="right"
          @click="openPopup('任务类型')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="qdlx"
          label="清单类型"
          placeholder="请选择清单类型"
          input-align="right"
          @click="openPopup('清单类型')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="type"
          label="事件类型"
          placeholder="请选择事件类型"
          input-align="right"
          @click="openPopup('事件类型')"
        />
        <van-field
          clickable
          name="picker"
          v-model="gis"
          label="位置信息"
          placeholder="请输入位置信息"
          autosize
          type="textarea"
          maxlength="500"
          show-word-limit
          input-align="right"
        />
        <van-field
          clickable
          name="picker"
          v-model="realname"
          label="反馈人姓名"
          placeholder="请输入反馈人姓名"
          input-align="right"
        />
        <van-field
          clickable
          name="picker"
          v-model="mobile"
          label="联系电话"
          placeholder="请输入联系电话"
          input-align="right"
        />
        <!-- <van-field
        readonly
        clickable
        name="picker"
        :value="blbm"
        label="处理部门"
        placeholder="请选择处理部门"
        input-align="right"
        @click="openPopup('处理部门')"
      /> -->
        <van-field
          readonly
          clickable
          name="picker"
          v-model="blbm"
          label="处理部门"
          placeholder="请选择处理部门"
          input-align="right"
          @click="openPopup('处理部门')"
        />
        <van-field
          readonly
          clickable
          name="picker"
          :value="blryname"
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
          v-model="content"
          rows="2"
          autosize
          label-width="130"
          label="事件问题描述:"
          type="textarea"
          maxlength="500"
          placeholder="请输入事件问题描述"
          show-word-limit
        />
        <div class="img-box ">
          <div style="margin-bottom:10px;font-size: 14px;">现场情况图片</div>
          <filesSelect ref="filesSelect" @sendFiles="onSendFiles" />
        </div>

        <!-- <van-image
          width="100%"
          height="170"
          :src="require('./../../assets/images/WechatIMG151.jpeg')"
        /> -->
        <template v-if="statetext === '完成'">
          <van-field
            clickable
            :value="result"
            label="处理内容："
            type="textarea"
            autosize
          />

          <div class="img-box ">
            <div style="margin-bottom:10px;font-size: 14px;">
              处理后现场情况图片
            </div>
            <filesSelect ref="filesSelectTow" @sendFiles="onSendFilesTow" />
          </div>
        </template>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
      <div style="height:80px"></div>
      <van-popup v-model="shoDtaPicker" position="bottom" :overlay="false">
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="选择完整时间"
          @confirm="onConfirm"
          @change="onChange"
          @cancel="shoDtaPicker = false"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>
      <van-popup v-model="showPicker" position="bottom" :overlay="false">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>

      <van-calendar v-model="showCalendar" @confirm="onCalendarConfirm" />
    </div>
  </div>
</template>

<script>
import { Form as VanForm } from "vant";
import { Field as VanField } from "vant";
import { Button as VanButton } from "vant";
import { Picker as VanPicker } from "vant";
import { Popup as VanPopup } from "vant";
import { Calendar as VanCalendar } from "vant";
import { Uploader as VanUploader } from "vant";
import { DatetimePicker as VanDatetimePicker, Popup as vanPopup } from "vant";
import { Image as VanImage } from "vant";
import filesSelect from "./filesSelect.vue";
import { mapMutations } from "vuex";
import {
  updateEvent,
  uploadBybase64,
  getEvenDetail,
  getSjlx,
  getSjly,
  getRwlx,
  getQdlx,
  getBlbm,
  getEventattList,
  getNodeList,
} from "@/network/api/api";
import { formatDate } from "@/util/data";
import { currentPage } from "@/util/buryingPoint";
import Schema from "async-validator";
export default {
  data() {
    return {
      id: null,
      title: "",
      showPicker: false,
      eventCol: [],
      eventTypeCol: [],
      taskCol: [],
      listCol: [],
      blbmCol: [],
      columns: [],
      isLoading: false,
      //
      datafrom: "",
      qdlx: "",
      rwlx: "",
      type: "",
      blbm: "",
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
      statetext: "",
      base642: [],
      // 处理后内容
      result: "",
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
    VanPicker,
    VanPopup,
    VanCalendar,
    VanUploader,
    VanImage,
    filesSelect,
    VanDatetimePicker,
    vanPopup,
  },
  mounted() {
    this.id = this.$route.query.id;
    getEvenDetail(this.id).then((res) => {
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
    getEventattList(this.id).then((res) => {
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

    getSjlx().then((res) => {
      this.eventCol = res.data.split(",");
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
    currentPage(6, "修改任务", "/editTask");
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
        case "完成时限":
          this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
          this.shoDtaPicker = false;
          break;
        case "处理部门":
          this.blbm = value;
          this.showPicker = false;
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
      } else if (name === "处理部门") {
        // dd.chooseDepartments({
        //   title: "请选择处理部门",
        //   multiple: false, //是否多选
        //   // maxDepartments: 1,
        // })
        //   .then((res) => {
        //     this.blbm = res.departments.map((item) => item.name).join(",");
        //     // dd.confirm({
        //     //   title: "authConfigsuss",
        //     //   message: JSON.stringify(res.departments),
        //     //   buttonLabels: ["ok", "cancel"],
        //     // });
        //   })
        //   .catch((e) => {});
        this.showPicker = true;
        this.columns = this.blbmCol;
      } else if (name === "处理人员") {
        dd.chooseContactWithComplexPicker({
          title: "请选择处理人员",
          multiple: false, //是否多选
          // responseUserOnly: false,
        }).then((res) => {
          // that.CoPersons = res.users;
          // dd.confirm({
          //   title: "authConfigsuss",

          //   message: JSON.stringify(res),
          //   buttonLabels: ["ok", "cancel"],
          // });
          this.blryuid = res.users.map((item) => item.userid).join(",");
          this.blryname = res.users.map((item) => item.name).join(",");
        });
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
      }
    },
    onSubmit() {
      const data = {
        eventid: this.id,
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
        // base64: this.base64,
        wcsx: this.currentDate,
        result: this.result,
      };

      const validator = new Schema(this.descriptor);
      validator.validate(data, (errors, fields) => {
        if (errors) {
          dd.toast({
            text: errors[0].message, //提示信息
          });
        } else {
          if (this.base64.length) data["base64"] = this.base64;
          if (this.base642.length) data["base64_2"] = this.base64;
          if (this.isLoading) return;

          dd.showLoading({
            text: "提交数据中", //提示信息
          }).then((res) => {
            this.isLoading = true;
          });
          this.isLoading = true;
          updateEvent(data).then((res) => {
            dd.hideLoading({}).then((res) => {});

            if (String(res.code) === "200") {
              dd.toast({
                text: "提交成功", //提示信息
              });
              this.$router.replace("/home");
            } else {
              dd.toast({
                text: "提交失败", //提示信息
              });
            }
            this.isLoading = false;
          });
        }
      });
    },
    onChange() {
      this.currentDate = formatDate(this.currentDate, "yyyy-MM-dd hh:mm");
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
  margin: 20px 0 0 30px;
}
</style>
