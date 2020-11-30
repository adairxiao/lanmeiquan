import {get,post} from "@/network/request.js"


export const getLoginUrl = data => get('/qrcode/getLoginUrl',{a:1,b:2})


export const getImages = data=>get('/mock/5cff89e36c54457798010709/shop/finderlist',null,'/images')