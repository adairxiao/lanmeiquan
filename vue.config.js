
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
    }
}