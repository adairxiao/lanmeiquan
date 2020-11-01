import axios from 'axios'
import { Toast } from 'vant';



/**
 * http
 * @param {Object} config 请求参数
 * @returns {Object} axios instance  axios实例
 */
const instance = axios.create({
    // baseURL: '/api',
    timeout: 1000 * 10,
    // `withCredentials` 表示跨域请求时是否需要使用凭证
    withCredentials: true, // default
})

// axios baseURL 
// instance.defaults.baseURL = process.env.VUE_APP_BASE_API
instance.defaults.baseURL = '/api'
// axios的全局配置
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'




//请求拦截
instance.interceptors.request.use(config => {

    // console.log("config",config);

    // const token = store.state.token
    // 在请求头中token不为空时加入Authoruizetion
    // Authorization请求标头包含用于向服务器认证用户代理的凭证，通常在服务器响应401 Unauthorized状态和WWW-Authenticate标题后
    // token && (config.headers.Authoruizetion = token)
    return config;
}, (error) => { Promise.reject(error) })









//响应拦截
instance.interceptors.response.use(res => {
    // console.log("res",res);
    return res
}, (error) => {

    if (error && error.response) {
        // Toast  未完成

        toast_fail(httpCode[String(error.response.status)])
    }
    return Promise.reject(error)
})



// 封装不同状态码对应不同的提示和信息
//这里我简单列出一些常见的http状态码信息，可以自己去调整配置
const httpCode = {
    400: '请求参数错误',
    401: '权限不足, 请重新登录',
    403: '服务器拒绝本次访问',
    404: '请求资源未找到',
    500: '内部服务器错误',
    501: '服务器不支持该请求中使用的方法',
    502: '网关错误',
    504: '网关超时'
}


//错误失败弹出框
const toast_fail = (message) => { Toast.fail(message) };


const toast_load = (message) => {
    Toast.loading({
        message,
        forbidClick: true
    });
};












export default instance
