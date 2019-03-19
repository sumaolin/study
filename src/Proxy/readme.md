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

   `trackPropertySet(), trackPropertyGet(), trackFunctionCall()` 使用的工厂模式，return ` set(target, prop, value, receiver), get(target, prop, receiver), apply(target, thisArg, arguments)` 

   ```js
   trackFunctionCall(opts){
     return apply(target, thisArg, arguments){
       let retVal = target.apply(thisArg, arguments) // 获取被代理函数的执行结果，前后加上时间，开源统计执行时间
     }
   }
   ```

   

5. [拿Proxy可以做哪些有意思的事儿](https://segmentfault.com/a/1190000015009255) 

   讲到了，可以做构建函数new调用时候的判断，是直接调用函数 apply了还是使用new 调用了constructor；封装fetch；统计函数调用次数 apply;

6. [ES6 Proxy/Reflect 浅析](https://segmentfault.com/a/1190000008326517)  `demo3.js` 

   提出了代理对象 和被代理对象之间的关系，是浅拷贝关系，评论提到了是操作同一地址值

   ```js
   let target = {
     _prop: 'foo',
     prop: 'foo2'
   }
   let handler = {
     get: function(target, prop, receiver) {
       return Reflect.get(target, prop, receiver)
     },
     set: function(target, prop, value, receiver) {
       let originVal = target[prop]
       // let argeVal = value
       console.log(`originValue : ${originVal}`)
       console.log(`will set value : ${value}`)
       target[prop] = value // 这个是改变 值的设置，不写不获取不到新赋值的属性值
       // return false
       // return value
       return true // 测试写不写都没问题
     }
   }
   
   let proxy = new Proxy(target, handler)
   /*
     对target 的添加新属性，proxy也会有
     对proxy设置新属性，target属性也会更新
   */
   proxy._prop = 'bar'
   target.name = 'su'
   
   console.log(target._prop)
   console.log(proxy._prop)
   console.log(proxy.name)
   
   ```

   set中要再设置target[prop] 的值，否则新的更新赋值不起作用

7. [实例解析ES6 Proxy使用场景](https://www.w3cplus.com/javascript/use-cases-for-es6-proxies.html) 

   [Proxy.revocable](http://es6.ruanyifeng.com/#docs/proxy#Proxy-revocable) 可以中断代理  `revocable.js` ，实现可控制的开发者权限；

   `validator.js`  Class属性赋值时候的类型检测，和Class分离，避免耦合，类型检测可以无限扩展

   `checkArgs.js`  检测函数的参数数量，以及类型; 实际上不能检测参数数量，想下怎么实现数量的检测？

8. [阮一峰 ES6 proxy](http://es6.ruanyifeng.com/#docs/proxy) 



先看的上面的文章，遇到不懂的才去察看8中标准相关的文章，并没有深入看ES中的标准文章，得看下《深入理解ES6》中的相关章节



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

