'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    assetsRoot: path.resolve(__dirname, "../dist"),
    // 静态资源文件夹
    assetsSubDirectory: "static",
    // 发布路径
    assetsPublicPath: "/",
    // Various Dev Server settings
    host: "localhost",
    // dev-server监听的端口
    port: 8080,
    autoOpenBrowser: true,
    proxyTable: {
        //综合收件
        '/api': {
            target: "http://47.112.212.177:80/qinglv", //开发环境
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''
            }
        },
    },
    //是否使用 cssSourceMap
    cssSourceMap: false
},
  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // proxyTable: {
  //   '/': {
  //     target: 'http://47.112.212.177:80/qinglv'
  //   }
  // }
}
