/* eslint-disable no-undef */
const merge = require('webpack-merge');
const commonConfig = require('./build/webpack.common.js/index.js');

const prodConfig = {
    //配置打包模式：开发模式，生产模式
    mode: 'production',
    devtool: 'cheap-module-source-map', //存在映射关系，没有map映射文件，该映射函关系放到了打包中的js代码中。
}
module.exports = merge(commonConfig, prodConfig);