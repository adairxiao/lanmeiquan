import router, { pcRouter, moblicRouter } from "./router";
import store from "./store";
let timeID;

router.beforeEach((to, from, next) => {
  // dd.confirm({
  //   title: "hasLogin",
  //   message: JSON.stringify({1:store.getters["Public/hasLogin"]}),
  //   buttonLabels: ["ok", "cancel"],
  // });
  // dd.confirm({
  //   title: "hasLogin",
  //   message: JSON.stringify({ 1: to }),
  //   buttonLabels: ["ok", "cancel"],
  // });
  if (store.getters["Public/hasLogin"]) {
    const userAgent = /Android|webOS|iPhone|iPod|BlackBerry/i.test(
      navigator.userAgent
    )
      ? "mobile"
      : "PC";
    store.commit("Public/setPlatform", userAgent);
    const asyncRouter = userAgent === "mobile" ? moblicRouter : pcRouter;
    router.addRoutes(asyncRouter);

    timeID = setTimeout(() => {
      dd.ready(() => {
        dd.showLoading({
          text: "加载中", //提示信息
        });

        store.dispatch("Public/getUser").then((res) => {
          
          next({ replace: true, path: "/home" });
        });
      });
      clearTimeout(timeID);
    }, 200);
    aplus_queue.push({
      action: "aplus.setMetaInfo",
      arguments: ["aplus-waiting", "MAN"],
    });
  } else {
    next();
  }
});
