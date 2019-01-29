# 接口

## Cheat sheets

### 为什么需要接口 interface

描述结构形态

可以 extends 扩展



### 描述类

实现描述类的结构状态

1. 带构造器constructor() 的类 通过 implements

   ```
   interface DB {
     host: string;
     port: number
   }
   
   class MySQL implements DB {
     host: string;
     port: number;
     constructor() {
       
     }
   }
   ```

2. 字面量{} 通过：

   ```
   interface Person{
     readonly ID: string
   }
   
   const p: Person = {ID: '12345555`}
   ```




### 属性修饰符

1. readonly

   只读属性，初始化时候必须给他赋值

2. private

3. protected

4. public (默认修饰符)

5. 可选属性 `property ? : string`  



### 接口描述函数

```
interface DB{
  host: string;
  port: number
}

interface InitFun {
  (option: DB): string  // 只约束类型，不约束变量名，下面使用的opt
}

let initMysql: InitFun = function(opt: DB): string{
  return ''
}

```



### 接口描述可实例化

```js
interface myDate {
  year: string
  month: string
  day: string
}
interface MyDateInit {
  new (year: string, month: string, day: string): myDate
}

class DateClass implements myDate {
  year: string
  month: string
  day: string
  constructor(year: string, month: string, day: string) {
    this.year = year
    this.month = month
    this.day = day
    return this
  }
}

let d = new DateClass('2019', '01', '24')
```





### 接口描述混合类型

```js
interface Counter {
  (start: string): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: string) {
    console.log('start is ' + start)
  }

  counter.interval = 10
  counter.reset = function() {
    console.log('do you want reset you counter?')
  }

  return counter
}

let c = getCounter()
c('10')
c.reset()
c.interval = 1
console.dir(c)
```





## Question



1.  `tsc --config` 生产配置`tsconfig.js`





2. [ts] Property 'name' has no initializer and is not definitely assigned in the constructor



​	更改`tsconfig.js`  中 `"strictPropertyInitialization": false`  就可以解决了



3. `Index signature is missing in type 'Ergou'` 

   ```tsx
   interface PersonID {
     readonly IdCard: string
     [propsName: string]: string
   }
   
   class Ergou implements PersonID {
     readonly IdCard: string
     [propsName: string]: string   // 必须有，否则会报上面的错误，没有完整的实现interface的功能吧
     constructor() {}
   }
   ```

   ref：[Typescript: Index signature is missing in type](https://stackoverflow.com/questions/37006008/typescript-index-signature-is-missing-in-type) 


   解决： [官方文档： 接口](https://www.tslang.cn/docs/handbook/interfaces.html)  中的 **可索引的类型** 

   Index signature （可索引签名）： 

   ```tsx
   interface StringArray {
     [index: number]: string;  // index signature 可索引签名
   }
   ```

   定义了Object.property | Object['property'] ，所以接口中的property定义也要符合索引签名的结构描述



## 困惑

接口描述可实例化 和描述混合类的 没有理解



接口描述可实例化的结构状态