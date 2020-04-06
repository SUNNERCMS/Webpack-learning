## Development和Production模式的区分打包

##### 按照开发模式进行webpack配置
>开发模式和线上模式在打包时所使用的配置是有所差别的，可以通过设置不同的打包文件对二者执行区分化打包，同时也可以将二者共有的配置项提取到公共的配置文件中。

将webpack.config.js文件分成webpack.dev.js和webpack.prod.js   
对应的在package.json中将运行指令也进行划分：   
```js
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js",
  }
```
- 执行npm run dev 
>会打开一个浏览器，控制台输出6，因为index.js文件中使用了`add(1, 5)`;  
- 执行npm run build
>在目录中会生成一个dist文件夹，main.js是压缩之后的，这里的文件可以供服务器直接使用，main.js.map是对应的错误提醒映射关系文件  

![](https://github.com/SUNNERCMS/Webpack-learning/blob/master/Development%E5%92%8CProduction%E6%A8%A1%E5%BC%8F%E7%9A%84%E5%8C%BA%E5%88%86%E6%89%93%E5%8C%85/showpictures/1.png)

##### 提取公共的配置模块 
将webpack按照开发模式和生存模式一份为二合之后，可以发现二者之间是存在公用配置项的，提出出公共的配置项，然后将dev.js、prod.js文件和common.js文件合并作为输出的配置文件。   
- 安装 npm install webpack-merge -D
- 引入webpack-merge以及webpack.common.js,合并后输出完成的dev或者prod的webpack配置
```js
webpack.dev.js文件：

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
module.exports = merge(commonConfig, devConfig); //合并输出dev配置文件
```

