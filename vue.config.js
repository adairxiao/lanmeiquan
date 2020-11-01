
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}



// 基础配置
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('./src'),
                'assets': resolve('./src/assets'),
                'components': resolve('./src/components'),
                // 'network': resolve('./src/network'),
                // 'views': resolve('./src/views'),
            }
        }
    },
    devServer: {
        // 配置服务器代理
        proxy: {
            "/api": { // 代理接口前缀为/apis的请求
                "target": 'http://passport.bilibili.com1', // 对应的代理地址
                "secure": false, // 接受运行在https上，默认不接受
                "changeOrigin": true, // 如果设置为true,那么本地会虚拟一个服务器接收你的请求并代你发送该请求，这样就不会有跨域问题（只适合开发环境）
                "pathRewrite": { //重写路径 比如'/apis/aaa/ccc'重写为'/aaa/ccc'
                    '^/api': ''
                }
            },
            // 配置多个代理
            "/service": {
                "target": 'https://www.google.com/',
                "secure": false,
                "changeOrigin": true,
            },
        }
    }


}