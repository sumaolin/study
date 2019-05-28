# 模块管理

### 常用的代码包模块管理方案

1. `commonjs` node 使用的 

2. `amd` 浏览器端使用

3. ES module 标准，旨在统一浏览器和服务器的代码包模块的管理

   > 自从 Node8.5 以后， Node 开始支持引入 ES 模块







### Reference

1. [NodeJS与模块系统](https://mp.weixin.qq.com/s/uDp0v_1hN0Uzg-EGr1yfgA) 

   common.js和es module的不同，在于前者是静态引入，后者是动态引入，引入后被引入模块值的修改，commonjs是无法感知的获取的

   commonjs 模块再es module模块中的引用：

   ```js
   / cjs.js
   module.exports = {
    "Hello": "你好",
    "World": "世界"
   }
   
   // main.mjs
   import cjsExport from './cjs.js'
   // 以下两种也可以
   /***
   * import {default as cjsExport} from './cjs.js'
   * import * as cjsExport from './cjs.js'	
   ***/
   const {Hello, World} = cjsExport
   ```

   ES module模块加载 commonjs模块

   ```js
   / es.mjs
   export default {
    "a" : 1,
    "b" : 2
   }
   
   // main.mjs
   (async _ => {
    const es = await import('./es.mjs');
    console.log(es);
   })() // 自执行函数，异步加载
   ```

   

2. [ES模块基础用法及常见使用问题](<https://github.com/verymuch/blog/issues/4>) 

   Nodejs 简介使用ES module的方法：

   > 1. 安装`babel-cli`和`babel-preset-env`，并将其保存为开发依赖。
   >
   > 2. 在根目录创建
   >
   >    ```
   >    .babelrc
   >    ```
   >
   >    文件，在其中添加如下配置。
   >
   >    ```
   >    {
   >        "presets": ["env"]
   >    }
   >    ```
   >
   > 3. 通过`./node_modules/.bin/babel-node index.js`或`npx babel-node index.js`执行脚本。其中`babel-node`为`babel-cli`自带。

   浏览器中使用es module 以及兼容方法：修改下proxy中遇到的问题

   ```html
   <script type="module">
     import myModule from './myModule.js'
   </script>
   
   <script nomodule>
     alert('你的浏览器不支持ES模块，请先升级！')
   </script>
   ```

   不建议修改export后的值，需要修改的时候，可以对import 后的值进行深度拷贝，deepclone