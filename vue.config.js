'use strict'
const path = require('path')
const settings = require('./src/settings.js')

// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const GitRevisionPlugin = require('git-revision-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = settings.title // page title
const publicPath = `/${settings.name}/`
const outputDir = 'dist'
const assetsDir = 'static'

const port = process.env.port || process.env.npm_config_port || 9527 // dev port

module.exports = {
  publicPath,
  outputDir,
  assetsDir,
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    before: require('./mock/mock-server.js'),
    proxy: {
      // [process.env.VUE_APP_BASE_API]: {
      //   target: `http://localhost:${port}`, // 外网测试服务
      //   changeOrigin: true
      // }
      '/asset_management': {
        target: 'http://192.168.0.62:8000',
        changeOrigin: true
      }
    }
  },
  configureWebpack: (config) => {
    const plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins.push(
        // gzip压缩
        new CompressionPlugin({
          test: /\.js$|\.html$|.\css/, // 匹配文件名
          threshold: 10240, // 对超过4k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        }),
        // 获取git提交记录
        new GitRevisionPlugin()
      )
    }
    return {
      name,
      plugins
    }
  },
  chainWebpack(config) {
    // 测量webpack构建速度
    // config
    //   .when(process.env.NODE_ENV !== 'development',
    //     config => {
    //       config.plugin('speed')
    //         .use(SpeedMeasureWebpackPlugin)
    //     })
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // CopyWebpackPlugin插件
    config
      .plugin('copy')
      .tap(args => {
        args[0][0].ignore.push('**/*/**')
        args[0].push({
          from: resolve('public'),
          to: resolve(`${outputDir}/${assetsDir}`),
          toType: 'dir',
          ignore: ['.jpg', '.jpeg', '.png', '.ico', 'index.html']
        })
        return args
      })

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  maxInitialRequests: 5,
                  maxSize: 450 * 1024,
                  reuseExistingChunk: true,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
                  maxSize: 300 * 1024,
                  priority: 20
                },
                icons: {
                  name: 'chunk-icons',
                  test: resolve('src/icons'),
                  priority: 40
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 2, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV !== 'development',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      // 注意：在 sass-loader v8 中，这个选项名是 "prependData", 更高版本使用additionalData
      scss: {
        // prependData: `@import "~@/styles/variables.scss";@import "~@/styles/mixin.scss";`
      }
    }
  }
}
