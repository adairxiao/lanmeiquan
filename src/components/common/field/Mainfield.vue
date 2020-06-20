<template>
  <div :class="fieldClassLine" class="field">
    <van-field
      v-model="tel"
      :name="fieldName"
      :placeholder="fieldPlaceholder"
      :type="textType"
      :label="fieldLabel"
      :rules="fieldRules"
      :label-align="fieldLabelAlign"
      :label-width="fieldLabelWidth"
    >
      <template #right-icon>
        <div v-if="isicon" @click="clickEvent">
          <div v-show="isiconShow">
            <van-icon :name="fieldRightIcon.currentIcon" />
          </div>
          <div v-show="!isiconShow">
            <van-icon :name="fieldRightIcon.newIcon" />
          </div>
        </div>
      </template>
    </van-field>
  </div>
</template>


<script>
import vanField from "vant/lib/field";
import "vant/lib/field/style";

import vanIcon from "vant/lib/icon";
import "vant/lib/icon/style";
import LoginVue from "../login/Login.vue";

export default {
  name: "Mainfield",
  data() {
    return {
      tel: "",
      isicon: false,
      isiconShow: true,
      textType:this.fieldType
    };
  },
  props: {
    fieldClassLine: {
      type: Object,
      default: function() {
        return {};
      }
    },
    fieldName: {
      type: String,
      default: "文本"
    },
    fieldPlaceholder: {
      type: String,
      default: "用户名"
    },
    fieldType: {
      type: String,
      default: ""
    },
    fieldLabel: {
      type: String,
      default: ""
    },
    fieldRules: {
      type: Array,
      default: [{ required: true, message: "请填写用户名" }]
    },
    fieldLabelAlign: {
      type: String,
      default: "left"
    },
    fieldLabelWidth: {
      type: String,
      default: "10px"
    },
    fieldRightIcon: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    vanField,
    vanIcon
  },
  watch: {
    //  fieldType: function (val, oldVal) {
    //   console.log('new: %s, old: %s', val, oldVal)
    //  }
  },
  created() {
    //   判断是否使用启用rightIcon插槽
    if (Object.keys(this.$props.fieldRightIcon).length >= 0 ) {
      this.isicon = true;
    }
  },
  mounted() {},
  methods: {
    // icon点击事件,必须使用v-on不能缩写
    clickEvent() {
        console.log(this.textType);
        
      if (this.fieldRightIcon.event === "switchlcon"){
        this.isiconShow = !this.isiconShow;
        this.textType= this.textType==="password" ? "text":"password"
      }

      console.log(this.textType);
      
    }
  }
};
</script>

<style>
</style>