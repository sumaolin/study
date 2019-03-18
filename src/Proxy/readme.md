# 代理

### Reference

1. [ES6 中的代理模式-----Proxy](https://www.wangyiming19950222.com/2018/01/07/ES6%E4%B8%AD%E7%9A%84%E4%BB%A3%E7%90%86%E6%A8%A1%E5%BC%8F-----Proxy/) 

   详细说明了可以代理的方法，get，set， delete，defined等访问属性操作时候的代理定义方法，以及constructor，apply创建类时new对象，调用对象的方法时的代理方法，并且列出来相应的触发函数，详细看cheetSheat

2. [从 C#到 TypeScript - Proxy](http://www.cnblogs.com/brookshi/p/6426741.html#undefined)

3. [从C#到TypeScript - Reflect](http://www.cnblogs.com/brookshi/p/6426732.html)  `tsconfig.json` 

   Typescript 中使用 Proxy，要在 tsconfig 文件中去定义

4. [「译」用 Proxy 追踪 JavaScript 类](https://juejin.im/post/5c8533e6e51d4561a0778a4c)  `trackProxy.js` 

   `getCaller`  通过`new Error()`  获取外代理被调用时的函数名称

   `trackClass`  代理新的Class类，通过constructor代理新new个实例，并代理实例中的属性的get，set，和函数的apply；

   `trackObject`  直接代理实例对象，直接设置代理属性的get，set和函数方法的apply代理

5. [拿Proxy可以做哪些有意思的事儿](https://segmentfault.com/a/1190000015009255) 

   讲到了，可以做构建函数new调用时候的判断，是直接调用函数 apply了还是使用new 调用了constructor；封装fetch；统计函数调用次数 apply；

   

### Question

默认配置下typescript是无法编译Proxy特性的，error: `Cannot find name 'Proxy'.` 

网上搜索`typescript proxy tsconfig.js` 找到的结果： [官网的编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html) 中  `—lib` 的选项中给出了具体的配置，同时写明了默认的配置是没有Proxy的：

> 注意：如果`--lib`没有指定默认注入的库的列表。默认注入的库为： 
> ► 针对于`--target ES5`：`DOM，ES5，ScriptHost` 
> ► 针对于`--target ES6`：`DOM，ES6，DOM.Iterable，ScriptHost` 

**要是改变动lib选项的话，注意要把上面默认的lib也加入进去** 





### CheetSheat

```js
handler.getPrototypeOf()
// 在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。
handler.setPrototypeOf()
// 在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。
handler.isExtensible()
// 在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。
handler.preventExtensions()
// 在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。
handler.getOwnPropertyDescriptor()
// 在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。
handler.defineProperty()
// 在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。
handler.has()
// 在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。
handler.get()
// 在读取代理对象的某个属性时触发该操作，比如在执行 proxy.foo 时。
handler.set()
// 在给代理对象的某个属性赋值时触发该操作，比如在执行 proxy.foo = 1 时。
handler.deleteProperty()
// 在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。
handler.ownKeys()
// 在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。
handler.apply()
// 在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。
handler.construct()
// 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。
```

