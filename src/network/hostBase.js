// 接口域名配置
const path = require('path')


const interfaceDate = require(path.join('e:/','host.json'))

// console.log();

const base= {
    develop:interfaceDate.public.host,
    release:'',
    master:''
}

// export default base