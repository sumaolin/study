## Step By Step 进度



## 手把手进度

### 2020.04.07

####  [搭建项目开发环境](https://miyogurt.github.io/nodelover-books/#/koa-todo-api/%E6%90%AD%E5%BB%BA%E9%A1%B9%E7%9B%AE%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83) 时 `tsc` 编译是报错

```bash
Type originates at this import. A namespace-style import cannot be called or constructed, and will cause a failure at runtime. Consider using a default import or import require here instead.
```

1. [A namespace-style import cannot be called or constructed, and will cause a failure at runtime](https://stackoverflow.com/questions/49256040/a-namespace-style-import-cannot-be-called-or-constructed-and-will-cause-a-failu) 

   是 `tsconfig.js`  中配置 `esModuleInterop:true`  造成的

2. [用 typescript 开发 npm 库，设置 esModuleInterop: true 的问题？ - 知乎](https://www.zhihu.com/question/304036559) 

   因为Es module 标准前面未实现造成的，一些公用模块并没有使用Es module 标准，设置   `esModuleInterop:true`   来兼容所有模块， [tsconfig.js 编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html) 

把`import * as Koa from 'koa'`  改成 `import Koa from 'koa'`  就可以解决了