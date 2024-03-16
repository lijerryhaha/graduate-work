const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    host:'localhost',
    port:8080,
    proxy:{
      '/api':{
       // target:'http://bashuli-25d-api.maiyuanwenhua.cn/rural-digital-server-admin',
        //target:'https://baishuli-25d-api.maiyuanwenhua.cn/rural-digital-server-admin',
        target:'https://qiansuo-25d-api.maiyuanwenhua.cn/rural-digital-server-admin',
        //target:'http://localhost:8081/rural-digital-server-admin',
        secure: false,  // 如果是https接口，需要配置这个参数
        ws: true,//是否代理websockets
        chageOrigin:true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: {
    //关闭 webpack 的性能提示
   

    //或者

    //警告 webpack 的性能提示
    performance: {
      hints:'warning',
      //入口起点的最大体积
      maxEntrypointSize: 50000000,
      //生成文件的最大体积
      maxAssetSize: 30000000,
      //只给出 js 文件的性能提示
      assetFilter: function(assetFilename) {
        return assetFilename.endsWith('.js');
      }
    }
  }



})
