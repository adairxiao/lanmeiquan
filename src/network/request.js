import axios from 'axios'
import base from './hostBase'
import store from '@/store/index'

import {Toast,Dialog} from 'vant';





// 封装错误提示



export function request(config) {

    const instance = axios.create({
        baseURL: base.develop,
        timeout: 1000 * 12
    })

    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


    let httpCode = {        //这里我简单列出一些常见的http状态码信息，可以自己去调整配置
        400: '请求参数错误',
        401: '权限不足, 请重新登录',
        403: '服务器拒绝本次访问',
        404: '请求资源未找到',
        500: '内部服务器错误',
        501: '服务器不支持该请求中使用的方法',
        502: '网关错误',
        504: '网关超时'
    }

    //请求拦截
    instance.interceptors.request.use(config => {
        
        
        
        const token = store.state.token
        // 在请求头中token不为空时加入Authoruizetion
        // Authorization请求标头包含用于向服务器认证用户代理的凭证，通常在服务器响应401 Unauthorized状态和WWW-Authenticate标题后
        token && (config.headers.Authoruizetion = token)
        return config;
    }, error => Promise.error(error))



    // 封装不同状态码对应不同的提示和信息
    // 使用工厂对象实现


    //响应拦截
    instance.interceptors.response.use(config => {
        return config
    }, error => Promise.error(error))



    return instance(config)
}