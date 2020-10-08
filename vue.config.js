
const path = require("path");
function resolve(dir) {
    return path.join(__dirname, dir);
}

// module.exports = {
//     chainWebpack: config => {
//         config.resolve.alias
//             .set("@", resolve("src"))
//             .set("assets", resolve("src/assets"))
//             .set("components", resolve("src/components"))
//             .set("network", resolve("src/network"))
//             .set("views", resolve("src/views"))
//             .set("router", resolve("src/router"))
//     },
// }



// 基础配置
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
                'assets': path.resolve(__dirname, './src/assets'),
                // 'components': 'src/components',
                // 'network': 'src/network',
                // 'views': 'src/views'
            }
        }
    }
}