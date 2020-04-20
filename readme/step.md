## Step By Step 进度



## 手把手进度

### 2020.04.07

#### 1. [搭建项目开发环境](https://miyogurt.github.io/nodelover-books/#/koa-todo-api/%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83) 时 `tsc` 编译是报错

```bash
Type originates at this import. A namespace-style import cannot be called or constructed, and will cause a failure at runtime. Consider using a default import or import require here instead.
```

1. [A namespace-style import cannot be called or constructed, and will cause a failure at runtime](https://stackoverflow.com/questions/49256040/a-namespace-style-import-cannot-be-called-or-constructed-and-will-cause-a-failu) 

   是 `tsconfig.js`  中配置 `esModuleInterop:true`  造成的

2. [用 typescript 开发 npm 库，设置 esModuleInterop: true 的问题？ - 知乎](https://www.zhihu.com/question/304036559) 

   因为Es module 标准前面未实现造成的，一些公用模块并没有使用Es module 标准，设置   `esModuleInterop:true`   来兼容所有模块， [tsconfig.js 编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html) 

把`import * as Koa from 'koa'`  改成 `import Koa from 'koa'`  就可以解决了



#### 2. [Tuture](https://www.yuque.com/tuture/product-manuals) 写作工具文档

test 了下，每次 `tuture up`  都会切换到master 分支，并且已有的commit会提示 [过时步骤的处理](https://www.yuque.com/tuture/product-manuals/outdated-steps)  ，按文档处理并没有好转，应该是我多分支造成的吧



### 2020.04.09

#### 1. 完成了 koa-bodyparser 安装

#### 2. 数据库相关的package的安装



### 2020.04.10

#### 1. postman 测试了koa-bodyparser 中的接口

​	导出了postman文件到API目录下 



#### 2. tuture destroy 删除写作工具

​	测试下来发现的问题，运行tuture命令自动切换到master分支，所以先删除掉了



#### 3. new Sequelize() 错误

`[ts] Cannot use 'new' with an expression whose type lacks a call or construct signature.` 



1. [TypeScript: Cannot use 'new' with an expression whose type lacks a call or construct signature](https://stackoverflow.com/questions/31224392/typescript-cannot-use-new-with-an-expression-whose-type-lacks-a-call-or-const) 





### 2020.04.11

1. 安装package时候总是提示 npm Missing write access to

   卸载了cnpm 就解决了



2. Mac 上安装了sqlite3 和 sqlite studio 

   brew install sqlite3 安装，和 sqlit studio dmg安装包安装

   mac下重新建表了todo.db3





### 2020.04.20

[编写 Model 与 ava 测试文件](https://miyogurt.github.io/nodelover-books/#/koa-todo-api/模型与测试?id=编写-model-与-ava-测试文件) Issue

1. 测试的代码写完了，ava 运行不起来



参考资料： Reference

1. [Ava 中文文档](https://github.com/avajs/ava-docs/blob/master/zh_CN/readme.md)

2. [使用 AVA 做自动化测试](https://segmentfault.com/a/1190000010416900) 

   看过了，写的很逻辑清晰，写明了什么情况下用什么 API 和 Package

3. [ava-practice](http://i5ting.github.io/ava-practice/) 

   狼书的一个练习