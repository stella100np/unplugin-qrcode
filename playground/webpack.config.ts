// webpack.config.js

import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import Unplugin from "../src/webpack";
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './index.js')
  },

  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  plugins: [
    // 使用插件
    new HtmlWebpackPlugin({
      // 指明该插件需要处理的html模版
      template: path.resolve(__dirname, './index.html')
    }),
    Unplugin(),
  ],
  devServer: {
    hot: true, //热更新
    open: true, //编译完自动打开浏览器
    compress: true, //开启gzip压缩
    port: 3099, //开启端口号
    //托管的静态资源文件
    //可通过数组的方式托管多个静态资源文件
    static: {
      directory: path.join(__dirname, "../public"),
    },
  },

}