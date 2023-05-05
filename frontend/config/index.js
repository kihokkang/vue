'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    
    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    // Vue.js 애플리케이션의 진입점인 index.html 파일의 경로를 지정합니다. 이 경로는 빌드 후에 backend/public 폴더 내부에 위치합니다.
    index: path.resolve(__dirname, '../../backend/public/index.html'),

    // Paths
    // 빌드된 파일이 저장될 루트 디렉토리의 경로를 지정합니다. 위 설정에서는 backend/public 폴더를 지정하여 빌드된 파일이 해당 폴더에 저장됩니다.
    assetsRoot: path.resolve(__dirname, '../../backend/public'),
    // 정적 파일들이 저장될 폴더의 이름을 지정합니다. 아래 설정에서는 static 폴더에 저장되므로 backend/public/static 경로에 정적 파일들이 저장됩니다.
    assetsSubDirectory: 'static',
    // 빌드된 파일들이 서비스되는 경로를 지정합니다. 아래 설정에서는 빌드된 파일들이 루트 경로(/)에서 서비스되므로, index.html 파일에서 정적 파일들을 로드할 때 경로를 /static/파일이름과 같이 지정해야 합니다.
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
  }
}
