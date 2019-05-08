# Decorator 装饰器



### Reference

1. [Javascript 中的装饰器](https://aotu.io/notes/2016/10/24/decorator/index.html) 

   > 当**装饰器作用于类本身**的时候，我们操作的对象也是这个类本身，而当**装饰器作用于类的某个具体的属性**的时候，我们操作的对象既不是类本身，也不是类的属性，而是它的描述符（descriptor），而描述符里记录着我们对这个属性的全部信息，所以，我们可以对它自由的进行扩展和封装，最后达到的目的呢，就和之前说过的装饰器的作用是一样的。

   作用于类的decorator

   作用于类属性和函数的decorator 时间作用于类属性的 descriptor 描述符上

   decorator 是 function ，其参数包括： target，name, descriptor, descriptor的stander code：

   ```js
   let descriptor = {
       value: function() {
           console.log("meow ~");
       },
       enumerable: false,
       configurable: true,
       writable: true
   };
   ```

2. [JS 装饰器（Decorator）场景实战](https://juejin.im/post/59f1c484f265da431c6f8940) 

   > 我们的确实现了一个可用的 Decorator，但是**这些 Decorator 可以叠加使用吗？另外可以和业界常用的一些 Decorator 混用吗？例如 mobx 中的 @ observable**
   >
   > 这两个 Decorator 都无法和 @observable 这个同时使用。
   > 为什么呢？问题就出在我们改写属性的 getter 和 setter 的实现原理上。首先，每次给一个属性定义 getter 和 setter 都会覆盖前一次的定义，也就是这个动作只能有一次。然后，mobx 的实现非常依赖对 getter 和 setter 的定义（可以参考我之前的文章：[如何自己实现一个 mobx - 原理解析](https://link.juejin.im?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F26559530)）
   >
   > 事实上，Decorator 本身叠加使用时没问题的，因为你的每次包装，都会将属性的 descriptor 返回给上一层的包装，最后就是一个函数包函数包函数的效果，最终返回的还是这个属性的 descriptor

   属性decorator 不要改写 setter & getter ，每次的改写都会覆盖其他decorator的改写，其他descriptor的改写是一层层的包裹的，不会相互影响

3. [ES Decorators简介](https://efe.baidu.com/blog/introduction-to-es-decorator/) 

   继续细分了四种decorator，同时decorator 函数的参数（target, key, descriptor）不同情况下的值

   | Decorator Type   | target                                                       | key    | descriptor           |
   | ---------------- | ------------------------------------------------------------ | ------ | -------------------- |
   | Class            | 只有`target`参数， `target`会变成`Bar`这个方法，而不是其`prototype` |        |                      |
   | Property         | Bar.prototype                                                | 属性名 | 1                    |
   | Method           | Bar.prototype                                                | 方法名 | `PropertyDescriptor` |
   | setter \| getter | Bar.prototype                                                |        | `PropertyDescriptor` |

   1. 当装饰器用于类属性时，`descriptor`将变成一个叫“类属性描述符”的东西，其区别在于没有`value`和`get`或`set`，且多出一个`initializer`属性，类型是函数，在类构造函数执行时，`initializer`返回的值作为属性的值

   > 1. 通过`descriptor.value`的修改直接给改成不同的值，适用于方法的装饰器。
   > 2. 通过`descriptor.get`或`descriptor.set`修改逻辑，适用于访问器的装饰器。
   > 3. 通过`descriptor.initializer`修改属性值，适用于属性的装饰器。
   > 4. 修改`configurable`、`writable`、`enumerable`控制属性本身的特性，常见的就是修改为只读。

   **decorator 什么时候执行？** 

   > - 装饰器是在声明期就起效的，并不需要类进行实例化。类实例化并不会致使装饰器多次执行，因此不会对实例化带来额外的开销。
   > - 按编码时的声明顺序执行，并不会将属性、方法、访问器进行重排序。



### Question

1. 写法上能像2中提到的那样直接在 Property decorator 中只写设置property 的访问器 setter | getter　？
2. 在执行时间上和 Proxy 有什么不同吗？



​	