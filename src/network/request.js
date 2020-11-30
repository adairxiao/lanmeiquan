import instance from '@/network/axios.js'
import Qs from 'qs'


export const get = async (url, params = null,baseURL=null) => {
  
  if(baseURL!==null){
    instance.defaults.baseURL = baseURL
  }
  
  const res = await instance({
    url,
    // `params` 是即将与请求一起发送的 URL 参数
    // 必须是一个无格式对象(plain object)或 URLSearchParams 对象
    params,
    // `paramsSerializer` 是一个负责 `params` 序列化的函数
    // (e.g. https://www.npmjs.com/package/qs, http://api.jquery.com/jquery.param/)
    paramsSerializer: (params) => {
      return Qs.stringify(params, { indices: false })
    },
  }).catch((err)=>{
    return err
  });
  
  return res.data
}


export const post = async (url, data = null) => {
  const res = await instance({
    url,
    // `data` 是作为请求主体被发送的数据
    // 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
    // 在没有设置 `transformRequest` 时，必须是以下类型之一：
    // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
    // - 浏览器专属：FormData, File, Blob
    // - Node 专属： Stream
    data
  }).catch((err)=>{
    return err
  });
  
  return res.data
}