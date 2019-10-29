## Development和Production模式的区分打包

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

![hah](./showpictures/1.png)