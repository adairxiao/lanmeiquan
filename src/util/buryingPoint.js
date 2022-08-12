// 埋点

export function currentPage(metaId, metaName, metaPath) {
  //单页应用或“单个页面”需异步补充PV日志参数还需进行如下埋点：
  //console.log('执行埋点')
  //基础埋点
  aplus_queue.push({
    action: "aplus.setMetaInfo",
    arguments: ["aplus-waiting", "MAN"],
  }); //
  // 单页应用路由切换后 或 在异步获取到pv日志所需的参数后再执行sendPV：
  aplus_queue.push({
    action: "aplus.sendPV",
    arguments: [
      {
        is_auto: false,
      },
      {
        //当前你的应用信息，此两行按应用实际参数修改，不可自定义。
        sapp_id: "21981",
        sapp_name: "dhglzdyxs",
        // 自定义PV参数key-value键值对（只能是这种平铺的json，不能做多层嵌套），如：
        page_id: metaId, //'页面ID，与page 参数配合使用，保证唯一性',
        page_name: metaName, //'页面中文名称'
        page_url: metaPath,
      },
    ],
  });
}
