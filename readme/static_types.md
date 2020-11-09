### lesson 2

静态类型 static type

### lesson 3

基础类型，对象类型， 类类型，数组类型，函数类型

怎么去定义常用的类型

### lesson 4

type annotation 类型注解

type inference 类型推断

### lesson 5

函数类型

函数的参数类型，函数的返回值类型

#### 参数类型（基本类型，对象类型）

对象类型

```
// 参数是对象类型时候，要注解整个对象，而不是参数对象的每个属性注解
function add({one, two}: {one:number, two:number}): number{
  return one + two
}
```

#### 返回类型

void 无返回类型
never 从不返回，如死循环，抛出异常，错误，Exception， Error

常用基本类型：number，Array， string
