module.exports = {
    devServer: {
        // open: true,
        // host: localhost,
        // https: false,
        // path
        // assetsSubDirectory: "static",
        // assetsPublicPath: "/",
        // 本地代理
        proxy: {
            "/apis": {
                target: "http://47.106.183.53:9090/", //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true, //是否跨域
                pathRewrite: {
                    "^/apis": "" //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        },
        // proxy: "http://47.106.183.53:9090/",
        // port: 8080
    },
}