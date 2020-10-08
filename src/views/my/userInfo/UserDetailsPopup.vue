<!-- <template>
  <div>
    <div v-if="showClass">
      <action-sheet v-bind="ActionSheetProps"></action-sheet>
    </div>
    <div v-else>
      <popup v-bind="ActionSheetProps">
        <template #default>
          <!-- <div>neir</div> 
        </template>
      </popup>
    </div>
  </div>
</template>-->

<script>
const ActionSheet = () => import("@/components/common/actionsheet/actionsheet");

import Popup from "../../../components/common/popup/Popup";
import { EventBus } from "../../../router/eventBus";
export default {
  name: "UserDetailsPopup",

  data() {
    return {
      ActionSheetProps: { show: { isShow: false } },
      showCurrentClass: "",
    };
  },
  computed: {
    showClass() {
      return ["性别"].includes(this.showCurrentClass);
    },
  },
  render(h) {
    // 根据传入的title判断启用ActionSheet或者popup组件
    return h(
      Popup,
      {
        props: {
          show: { isShow: true },
        },
      },
      [h("h1", {}, "askfjas")]
    );
  },

  // components: {
  //   ActionSheet,
  //   Popup,
  // },

  mounted() {
    // 使用bus接受父组件中兄弟组件传的值
    // let self = this;
    // EventBus.$on("showClass", function (title) {
    //   self.showCurrentClass = title;
    //   self.popupSex();
    // });
  },
  // methods: {
  //   popupSex() {
  //     this.ActionSheetProps.show.isShow = true;
  //     // this.$set(this.ActionSheetProps,"")
  //   },
  // },
};
</script>

<style>
</style>