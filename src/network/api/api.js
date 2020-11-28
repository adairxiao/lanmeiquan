import {get,post} from "@/network/request.js"


export const getLoginUrl = data => get('/qrcode/getLoginUrl',{a:1,b:2})