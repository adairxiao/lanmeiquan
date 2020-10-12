<script>
import ActionSheet from "@/components/common/actionsheet/actionsheet"

import Popup from "../../../components/common/popup/Popup"
import { EventBus } from "../../../router/eventBus"
export default {
  name: "UserDetailsPopup",

  data () {
    return {
      show: false,
      showCurrentTitle: "",
    }
  },
  render (h) {
    // 根据传入的title判断启用ActionSheet或者popup组件
    if (this.showCurrentTitle === "性别") {
      return h(ActionSheet, {
        props: {
          isShow: this.show,
          title: this.showCurrentTitle,
        },
        scopedSlots: {
          default: props => h('span',)
        },
      })

    } else {


      return h(
        Popup,
        {
          props: {
            show: this.show,
          },
        },
        [h("h1", {}, "askfjas")]
      )
    }


  },

  // components: {
  //   ActionSheet,
  //   Popup,
  // },

  mounted () {
    // 使用bus接受父组件中兄弟组件传的值
    let self = this
    EventBus.$on("showClass", function (title) {
      self.showCurrentTitle = title
      self.popupSex()
    })

  },
  updated: function () {
    console.log("update");
  },
  methods: {
    popupSex () {
      this.show = true
      // this.$set(this.ActionSheetProps,"")
    },
  },
};
</script>

<style>
</style>