## 泛型<T>

### 为什么需要泛型

1. 组件化时，调用时候再限定类型
2. 限定后对应类型的提示

### 泛型的形式

#### 数组

```
function ad1<T>(a:T[]): T{

}
```

可以是`T[]` 或者 `Array<T>`

#### 接口泛型

函数的接口

```
interface funct1<T>{
  (a: T): T
}
```

#### 类泛型

```
class Person<T, U>{
  name: T,
  age: U
}
```

#### 泛型的继承

当泛型中要求必有有某个属性的时候怎么实现呢？

```
interface Person{
  age:number
}

class Student<T extends Person>{
  person: T
}
```

泛型是一种特使的类型，可以通过 extends 继承 interface

class 需要 implement 实现接口 interface

从另一方面来说是通过接口来描述泛型的结构状态

## Prototype 原型

1. 类的实例 class instance
2. class C 的实例 c, `c.__proto__ === C.prototype` true
3. class C 的`let c = new C()`编译器做的事情`C.prototype.constructor(); c.__proto__ = C.prototype;`
4. `let b = Object.creat(a)`作用是`b.__proto__ = a`
5. `let b = a = 1, a`中的`,`操作符的理解, `,`优先级高于赋值`=`操作符，操作顺序是 a 被赋值为 1，然后`,`后的 a 作为`a=1, a`的整体结果 赋值给 b; 另一种解释赋值操作符`=` 是右侧的值整体赋值给左侧的变量

### B 继承 A 的步骤分解

1. A 的自己的属性，A.hasOwnProperty 赋值给 B
2. 把 B 的构造器函数 constructor = B，这样 new B()时候就会调用 B 函数了
3. `_super.apply(this, arguments)` 调用 A 的构造函数，context 上下午为 this
4. 调用 2 中的构造器 new B()

### 泛型的继承

```
interface Argu<A, K>{
  new (): A;  // 可实例化的class
  keeper: K  // 必须有属性keeper
}

function findK<A, K>(a: Argu<A, K>): K{
  return a.keeper
}
```

泛型在函数名后面，()前面前面，在接口名后面

TS 类型的简写形式

```
class A{
  name: string
  constructor(name: string){
    this.name = name
  }
}
```

可以简写为

```
class A{
  constructor(public name: string)
}
```
