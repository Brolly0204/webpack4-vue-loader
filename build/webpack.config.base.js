const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name]-[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [new VueLoaderPlugin()]
}
