import axios from "axios";
import app from "@/main.js";
import { getStorageItem } from "@/util/jsapi";
import config from "@/util/config.js";

const {host} = config
/**
 * axios
 * @param {Object} config 请求参数
 * @returns axios instance
 */

const instance = axios.create({
  timeout: 1000 * 6,
  // responseType:"blob",
  // 表示跨域请求时是否需要使用凭证
  // withCredentials: true, // default
});

// axios baseURL
// instance.defaults.baseURL = "/api";
instance.defaults.baseURL = host

// axios的全局配置
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
instance.defaults.headers["Referer"] = "https://zjzwfw.com";
//请求拦截
instance.interceptors.request.use(
  (config) => {
    // app.$toast.success('成功文案');
    // dd.confirm({
    //   title: "user3",
    //   message: JSON.stringify(config.headers),
    //   buttonLabels: ["ok", "cancel"],
    // });
    const res = getStorageItem({ name: "user" }, "Public");
    // const res = await dd.getStorageItem({ name: "user" });
    
    // config.headers["token"] = "123"
    if (JSON.stringify(res) !== "{}") {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      config.headers["token"] = res.token;
    //   dd.confirm({
    //   title: "user3",
    //   message: JSON.stringify({1:res.token}),
    //   buttonLabels: ["ok", "cancel"],
    // });
    }
    // dd.confirm({
    //   title: "user3",
    //   message: JSON.stringify({1:res,2:config.headers}),
    //   buttonLabels: ["ok", "cancel"],
    // });
    return config;
  },
  (error) => {
    return error;
  }
);

//响应拦截
instance.interceptors.response.use(
  (res) => {
    // dd.confirm({
    //   title: "user",
    //   message: JSON.stringify(res),
    //   buttonLabels: ["ok", "cancel"],
    // });
    // console.log("res",res);
    if (String(res.code) === "2001" || String(res.code) === "2000") {
      dd.removeStorageItem({
        name: "user",
      }).then(() => {
        app.$store.dispatch("Public/getUser");
      });
    }

    // const date =new Date
    // dd.confirm({
    //   title: "user",
    //   message: JSON.stringify(user_res),
    //   buttonLabels: ["ok", "cancel"],
    // });
    // if(app.$store.Public.date > Date.parse(data)){
    //   app.$store.dispatch("Public/getUser");
    // }

    return res;
  },
  (error) => {
    return error;
  }
);

// 封装不同状态码对应不同的提示和信息
//这里我简单列出一些常见的http状态码信息，可以自己去调整配置
const httpCode = {
  400: "请求参数错误",
  401: "权限不足, 请重新登录",
  403: "服务器拒绝本次访问",
  404: "请求资源未找到",
  500: "内部服务器错误",
  501: "服务器不支持该请求中使用的方法",
  502: "网关错误",
  504: "网关超时",
};

export default instance;
