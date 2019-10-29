const express = require('express');
const webpack =require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
const complier = webpack(config); //webpack的编译器，使用webpack和配置项可以对代码进行编译

const app = express(); //使用express创建一个app的服务器实例。
app.use(webpackDevMiddleware(complier, {
    publicPath: config.output.publicPath
}));
app.listen(3000, () => {
    console.log('server is running');
})