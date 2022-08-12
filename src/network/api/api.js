import request from "./../request";
import qs from "qs";

// 获取管理员首页数据
export const getEventList = (data) => {
  return request
    .get(`/event/list?${qs.stringify(data)}`)
    .then((res) => res.data);
};
// 获取操作员处理数据
export const getEventTodo = (data) => {
  return request
    .get(`/event/todo?${qs.stringify(data)}`)
    .then((res) => res.data);
};
// 获取操作员处理完成数据
export const getEventDone = (data) => {
  return request
    .get(`/event/done?${qs.stringify(data)}`)
    .then((res) => res.data);
};
// 获取事件详细数据
export const getEvenDetail = (id) => {
  return request.get(`/event/detail?eventid=${id}`).then((res) => res.data);
};
// 工单对应的附件列表
export const getEventattList = (id) => {
  return request.get(`/eventatt/list?eventid=${id}`).then((res) => res.data);
};

// 受理请求
export const getEventActive = (data) => {
  return request
    .post(`/event/active`, JSON.stringify(data), {
      transformRequest: [
        function(data) {
          return data;
        },
      ],
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};
// 处理意见
export const eventCommit = (data) => {
  return request.post(`/event/commit`, data).then((res) => res.data);
};

// 处理节点信息列表
export const getNodeList = (id) => {
  return request.get(`/node/list?eventid=${id}`).then((res) => res.data);
};
export const getToken = (code) => {
  return request.post(`/zzdlogin?code=${code}`).then((res) => res.data);
};

// 保存浙政钉用户发起的申报，返回工单id
export const saveFromzzd = (data) => {
  return request.post(`/event/createFromzzd`, data).then((res) => res.data);
};

// 通过工单id，浙政厅上传图片会返回图片网络地址
export const uploadBybase64 = (data) => {
  return request.post(`/eventatt/uploadBybase64`, data).then((res) => res.data);
};

// 事件类型
export const getSjlx = () => {
  return request.get(`/sys/sjlx`).then((res) => res.data);
};
// 事件来源
export const getSjly = () => {
  return request.get(`/sys/sjly`).then((res) => res.data);
};
// 任务类型
export const getRwlx = () => {
  return request.get(`/sys/rwlx`).then((res) => res.data);
};
// 清单类型
export const getQdlx = () => {
  return request.get(`/sys/qdlx`).then((res) => res.data);
};

// 办理部门列表
export const getBlbm = () => {
  return request.get(`/sys/blbm`).then((res) => res.data);
};

// 催办按钮
export const cuiban = (id) => {
  return request.post(`/event/cuiban?eventid=${id}`).then((res) => res.data);
};

// state  0 待受理
// state  1 待处理
// state  2 处理完成
export const exportFile = (data={}) => {
  // return request.request({
  //   method: "post",
  //   url: "/event/excel",
  //   data,
  //   responseType: "blob",
  //   headers: { "content-type": "application/json" },
  // });
  return request.get(`/event/excel?${qs.stringify(data)}`, {
    // responseType: "blob",
    responseType: "arraybuffer",
    headers: { "content-type": "application/json" },
  });
};


// 修改
export const updateEvent = (data) => {
  return request
    .post(`/event/update`, JSON.stringify(data), {
      transformRequest: [
        function(data) {
          return data;
        },
      ],
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => res.data);
};