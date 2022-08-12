import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./permission.js";
import dd from "gdt-jsapi";
import { Toast } from "vant";
import {
  Table,
  TableColumn,
  Tabs,
  TabPane,
  Button,
  RadioGroup,
  RadioButton,
  Dialog,
  Pagination,
  Form,
  FormItem,
  Select,
  Option,
  Input,
  DatePicker,
  Image
} from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

var hacks = require("viewport-units-buggyfill/viewport-units-buggyfill.hacks");
require("viewport-units-buggyfill").init({
  hacks: hacks,
});

Vue.use(Toast);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Dialog);
Vue.use(Pagination);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Option);
Vue.use(Input);
Vue.use(Image);
Vue.use(DatePicker);
Vue.config.productionTip = false;
// 专有钉钉 JSAPI 的方法挂载到vue原型上
Vue.prototype.$dd = dd;
const app = new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");

export default app;
