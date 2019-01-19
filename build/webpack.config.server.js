const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const nodeExternals = require('webpack-node-externals')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base.js')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')

const devMode = process.env.NODE_ENV === 'development'

const config = {
  target: 'node', // 打包目标 node环境
  entry: path.join(__dirname, '../src/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2', // 打包后的代码 模块化类型（commonjs）
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // node环境下 不需要将依赖的包打包到一起 直接require就行
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: [
          devMode ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'stylus-loader', options: { sourceMap: true } }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      // 默认打包node_modules到venders.js
      chunks: 'all'
    },
    // 打包webpack运行时代码到runtime.js
    runtimeChunk: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRServerPlugin()
  ]
}

module.exports = merge(baseConfig, config)
