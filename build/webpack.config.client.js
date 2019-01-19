const path = require('path')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base.js')

const devMode = process.env.NODE_ENV === 'development'

const config = {
  entry: path.join(__dirname, '../src/main.js'),
  output: {
    filename: '[name].[chunkhash:8].js',
    path: path.join(__dirname, '..', 'dist')
  },
  devtool: devMode ? 'cheap-module-eval-source-map' : 'source-map',
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
  devServer: {
    overlay: {
      warnings: true,
      errors: true
    }
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
}

module.exports = merge(baseConfig, config)
