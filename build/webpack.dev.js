/* eslint-disable no-undef */
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const devConfig = {
    //配置打包模式：开发模式，生产模式
    mode: 'development',
    devtool: 'cheap-moudle-eval-source-map', //存在映射关系，没有map映射文件，该映射函关系放到了打包中的js代码中。
    devServer: {
        contentBase: './dist', //起一个位于当前目录下的服务器。
        open: true,  //打开默认浏览器
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() 
    ]
}
module.exports = merge(commonConfig, devConfig);