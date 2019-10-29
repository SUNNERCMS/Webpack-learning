/* eslint-disable no-undef */
//引入node的一个path核心模块，用来定义路径
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
//commonjs的语法，向外暴露一个配置对象
module.exports = {
    //配置打包模式：开发模式，生产模式
    mode: 'development',
    // devtool: 'none', //没有映射关系
    // devtool: 'source-map', //存在映射关系，有map映射文件
    devtool: 'cheap-moudle-eval-source-map', //存在映射关系，没有map映射文件，该映射函关系放到了打包中的js代码中。
    devServer: {
        contentBase: './dist', //起一个位于当前目录下的服务器。
        open: true,  //打开默认浏览器
        // openPage: 'different/page'  //打开具体的路径下的页面
    },
    //入口文件，从哪里下手开始打包
    // entry: './src/index.js', 
    //等价于上面的写法,main是index.js文件对应的名字，入口文件名字
    entry: {
        main: './src/index.js',
        // sub: './src/index.js'
    },
    // 出口文件，用来设置打包之后的代码放在哪里
    output: {
        // publicPath: 'http://cdn.com.cn',
        // filename: 'bundle.js',
        // publicPath: '/',
        filename: '[name].js',  //会根据entry的键名来生成打包后的文件名
        path: path.resolve(__dirname,'dist') //生成了bundle的绝对路径，位于webpack.config.js的所在当前目录的路径
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'  //根据这个路径下的模版来生成打包结束后的html模版。
        }),
        new CleanWebpackPlugin() //打包之前清理输出文件夹中的内容
    ],
    //moudle打包模块时要使用的loader
    module:{
        rules:[
            {
                test: /\.(jpg|png|gif)$/,
                use: {
                    loader: 'url-loader' ,
                    options: {
                        name: '[name].[ext]', //打包出来的文件名和原来文件名相同，占位符设置
                        outputPath: 'images/',
                        limit: 40960  //图片小于40kb打包成base64格式，否则自动打包成图片。
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                },{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 2, //通过@import './other.scss'文件时，要使用该loader之前的两个loader
                        modules: true //设置为true就意味着使用样式的模块化，若是设置了该配置项，在代码中没有使用样式代码块的写法，那么之前的样式不会生效。
                    }
                },{
                    loader: 'postcss-loader'  //添加厂商前缀
                },{
                    loader: 'sass-loader'
                }]
            },
            {
                test: /\.js$/, 
                exclude: /node_modules/,  //在node_module模块以外的js文件中使用babel-loader
                loader: 'babel-loader',
                // options: {
                //     presets: [['@babel/preset-env', {
                //         useBuiltIns: 'usage'
                //     }]]
                // }
            }
        ]
    }
}