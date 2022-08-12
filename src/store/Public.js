import { getToken } from "@/network/api/api";

const state = {
  user: {},
  taskFrom: {},
  status: false,
  platform: "mobile",
};

const getters = {
  hasLogin(state){
    return JSON.stringify(state.user)=== "{}"
  }
};

const mutations = {
  setUser(state, obj) {
    // obj.role=""
    // const date =new Date
    //  dd.confirm({
    //   title: "authConfigsuss",
    //   message: JSON.stringify(obj),
    //   buttonLabels: ["ok", "cancel"],
    // });

    
    state["user"] = obj;
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_hold", "BLOCK"],
    });

    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_user_nick", obj.realname],
    });
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_user_id", obj.userid],
    });
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["_hold", "START"],
    });
    // dd.setStorageItem({
    //   name: "user",
    //   value: JSON.stringify(obj),
    // });
    
  },
  setTaskFrom(state, obj) {
    // item {key,value}
    state["taskFrom"] = obj;
  },
  setPlatform(state, value) {
    state.platform = value;
  },
};

const actions = {
  async getCode() {
    return new Promise((resolve, reject) => {
      dd.getAuthCode({ corpId: "" })
        .then((result) => {
          if (result) {
            resolve(result);
          } else {
            reject(result);
          }
        })
        .catch((e) => {});
    });
  },
  async getUser({ commit, dispatch, state }) {
    // dd.removeStorageItem({
    //     name: "user",
    //   });
    //   return
    // 免登
    // const res = await dd.getStorageItem({ name: "user" });
    // 已有token情况下不在获取token

    // if (JSON.stringify(res) !== "{}") {
    //   const user = JSON.parse(res.value);

    //   commit("setUser", user);

    //   dd.authConfig({
    //     ticket: user.ticket,
    //     jsApiList: [
    //       "chooseDepartments",
    //       "chooseContactWithComplexPicker",
    //       "chooseImage",
    //       "uploadFile",
    //     ],
    //   })
    //     .then((res) => {})
    //     .catch((err) => {
    //       dd.confirm({
    //         title: "user",
    //         message: JSON.stringify(res),
    //         buttonLabels: ["ok", "cancel"],
    //       });
    //     });
    //   return;
    // }
    
    const code_res = await dispatch("getCode");
    
    code_res.code = code_res.hasOwnProperty("code")
      ? code_res.code
      : code_res.auth_code;
    const user_res = await getToken(code_res.code);
    
    if (String(user_res.code) === "200") {
      dd.hideLoading({});
      commit("setUser", user_res.data);
      
      dd.authConfig({
        ticket: user_res.data.ticket,
        jsApiList: [
          "chooseDepartments",
          "chooseContactWithComplexPicker",
          "chooseImage",
          "uploadFile",
        ],
      })
        .then((res) => {
          
        })
        .catch((err) => {
          
        });
      // dd.removeStorageItem({
      //   name: "user",
      // });
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
