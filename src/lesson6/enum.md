## 枚举 enum

默认从 0 开始的自增类型的对象

```
enum enumDemo1{
  a,
  b,
}
```

可以直接给枚举元素赋值

```
enum enumDemo2{
  a=2,
  b
}
```

#### constont enum 常量枚举

```
const enum enumconstDemo{
  c,
  a=1,
  b
}
```

不能输出 常量变量整体会提示，只在 TS 中起作用
`[ts] 'const' enums can only be used in property or index access expressions or the right hand side of an import declaration or export assignment or type query.`

可以参考 对不 常量枚举和普通枚举 编译后代码的不同 进行理解，const enum 是不会有编译代码输出的



## Type 类型

### 官方文档

官方文档关于类型的，只能理解一部分，暂时放弃

1. [上下文类型](https://www.tslang.cn/docs/handbook/type-inference.html) 

2. [类型兼容性](https://www.tslang.cn/docs/handbook/type-compatibility.html)

3. [高级类型](https://www.tslang.cn/docs/handbook/advanced-types.html)



### 类型直接的兼容

#### 函数的类型兼容

1. 函数参数的兼容
2. 函数返回值的兼容



#### 类的类型兼容



### 类型直接的逻辑

交叉类型 &

联合类型 |

去除null 和 undefined  ` demo!` 表示去除了上面的两张类型

#### 类型别名

type 类型别名， 不支持继承 extends 和 implements，当无法用接口描述的时候，可以选择这种方式

```
interface a {
  name: string
}

interface b {
  age: number
}

type aAndB = a & b & { sayHello(name: string): any }

function some3(a: aAndB) {
  a.age
  a.name
  a.sayHello('bob')
}
```

或者直接给出类型别名的值，和枚举相似

```
type Easing = "ease-in" | "ease-out" | "ease-in-out";
```



### this

返回类型为class中的this，可以实现链式调用

```
class BasicCalculator {
    public constructor(protected value: number = 0) { }
    public currentValue(): number {
        return this.value;
    }
    public add(operand: number): this {
        this.value += operand;
        return this;
    }
    public multiply(operand: number): this {
        this.value *= operand;
        return this;
    }
    // ... other operations go here ...
}

let v = new BasicCalculator(2)
            .multiply(5)
            .add(1)
            .currentValue();
```



类型没有弄明白的太多，要回顾这块啦！



