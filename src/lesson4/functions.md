# 函数

### 声明方式

1. 匿名函数

   ```js
   let func2 = function() {}
   ```

2. 具名函数

   ```js
   function fun2() {}
   ```

3. 匿名函数 优先级大于具名函数

   ```js
   let fun3 = function fun4() {}

   fun4() // cannt find name 'fun4'
   ```

### 结构描述

1. 匿名函数

   ```js
   let func1: (x: string, y: string) => string
   ```

2. 具名函数

   ```js
   function func2(a: number, b: number): number {
     return a - b
   }
   ```

3. 使用接口

   ```js
   interface Add {
     (a: string, b: string): string;
   }

   let a: Add
   ```

### 参数

1. 可选参数不可以放第一位
2. 参数的默认值
3. 剩余参数
4. ... 解构操作的进阶用法，Array | Object 中的拷贝

### This 绑定问题

> 在 js 中，你只需要记住谁调用的，this 就指向谁，也就是.前面的对象，假如没有.，默认补一个 window.;

> 对于()=>{}的匿名函数来说，this 会提前绑定，看此刻是谁调用的它。而不是等调用的时候，去看谁调用的它，在去指定 this

> 讲道理()=>{}里面是没有 this 的，它的 this 是从上一个作用域（父作用域）里面拿到的。

重点理解下，箭头函数中的 this 问题和 js 中是否相同

### 函数重载

联合类型 `|`
