# 从零搭建Vue开发环境
> webpack v4 + vue-loader + babel-loader v8 + Babel v7 + eslint + git hooks + editorconfig

## Vue Loader配置

> Vue Loader 是一个 webpack 的 loader，它允许你以一种名为单文件组件 (SFCs)的格式撰写 Vue 组件：

webpack config

```
// webpack.config.js
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件！
    new VueLoaderPlugin()
  ]
}
```

### Vue Loader配置参考文档
[Vue Loader](https://vue-loader.vuejs.org/zh/)

## babel配置
webpack 4.x | babel-loader 8.x | babel 7.x

 ```
 npm install babel-loader @babel/core @babel/preset-env webpack

 ```

.babelrc

```
{
  "presets": [
    "@babel/preset-env"
  ]
}

```
[@babel/preset-stage-0这些预设在babelv7中已被移除](https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets)

### babel参考配置文档
[babel-loader](https://www.npmjs.com/package/babel-loader/v/8.0.0-beta.1)

## css提取（webpack v4.0）

```
npm install -D mini-css-extract-plugin
```

 webpack mini-css-extract-plugin配置

```
// webpack.config.js
var MiniCssExtractPlugin = require('mini-css-extract-plugin')

const devMode = process.env.NODE_ENV === 'development'

module.exports = {
  // 其它选项...
  module: {
    rules: [
      // ... 忽略其它规则
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
  plugins: [
    // ... 忽略 vue-loader 插件
    new MiniCssExtractPlugin({
      filename: [name].css
    })
  ]
}
```

### mini-css-extract-plugin 参考配置文档
[mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin)

## eslint代码校验

安装
```
npm install -D eslint eslint-plugin-vue vue-eslint-parser
```

```
npm i -D babel-eslint eslint-loader eslint-config-standard
```

安装eslint插件

```
npm i eslint-plugin-standard eslint-plugin-import eslint-plugin-node eslint-plugin-pormise
```

安装 eslint在命令行中友好功能
```
npm i eslint-friendly-formatter -D
```

webpack config配置
```
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
    }
  ]
}
```

配置.eslintrc文件
```
{
  "root": true,
  "env": {
    node: true
  },
  "extends": [
    "eslint:recommended",
    "standard"
  ],
  "parser": "vue-eslint-parser",
  "plugins": [
    "vue"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "rules": {}
}
```

配置package.json scripts

```
"scripts": {
  "lint": "eslint --ext .js, .vue, .jsx src", // 代码检查
  "lint-fix": "eslint --fix --ext .js,.vue,.jsx src" // 修补代码
}
```
### eslint配置参考文档
[eslint-loader](https://www.npmjs.com/package/eslint-loader)
[eslint-config-standard](https://www.npmjs.com/package/eslint-config-standard)
[eslint-plugin-vue](https://vuejs.github.io/eslint-plugin-vue/user-guide/#installation)
[vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser)

## git hooks

使用git钩子自动eslint校验

```
npm i husky pre-commit -D
```

package.json
```
"scripts": {
  "lint": "eslint --ext .js,.vue,.jsx src",
  "lint-fix": "eslint --fix --ext .js,.vue,.jsx src"
}
```

创建.huskyrc文件
```
{
  "hooks": {
    "pre-commit": "npm run lint"
  }
}

```
> git commit时 会触发pre-commit钩子 从而进行eslint代码检查

### husky配置参考文档
[git hooks](https://www.git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)
[husky](https://www.npmjs.com/package/husky)

## 编辑器配置

创建.editorconfig

```
root = true

[*]
charset = utf-8
end_of_line = lf
indent_size = 2
indent_style = space
insert_final_newline = true
trim_trailing_whitespace = true

```

### editor配置参考文档
[editorConfig](https://editorconfig.org/)
