let typeA = [1, 2]

let typeB = [1, 2, null]

let typeC = [1, 2, { a: 2 }]

/*
  对象的自动类型推导
*/
class BaseType {
  name: string = 'person'
}

class btA extends BaseType {
  a: string
}

class btB extends BaseType {
  b: string
}

class btC extends BaseType {
  c: string
}

let arrBT: BaseType[] = [new btA(), new btB(), new btC()]

/*
  上下文类型, 通过上下文归类，从左边推导出右边表达式函数的参数
*/
window.onmousedown = function(mouseEvent) {
  console.log(mouseEvent.button) //<- Error
}
/*
  函数参数的类型推导，从左往右推导类型，
  函数中还可以第一个参数this绑定提供代码提示，限于Class 和 Interface

*/
class EleDom {
  meanName: string
  age: number
  handleClick(this: EleDom): void {
    this.handleClick
  }
  handleDoubleClick: (this: EleDom) => void = function() {}
}

/*
  只是interface的属性name & type 一致是可以推导兼容的
  属性越多，约束越强，约束强的类型可以兼容约束弱的类型
*/

interface Named {
  name: string
}

class PersonType {
  name: string
  age: number
}

let p: Named
p = new PersonType()

/*
  Class 的类型推导兼容
  同上，所以 下面的参数用 约束弱的类型定义后，实际使用中直接传约束强的子类型，或者interface implement类型是不行的
*/

enum mEventType {
  Mouse,
  Keyboard
}

interface mEvent {
  timestamp: number
}
interface mMouseEvent extends mEvent {
  x: number
  y: number
}
interface mKeyEvent extends mEvent {
  keyCode: number
}
/*
  定义函数 listenEvent
*/
function listenEvent(eventType: mEventType, handler: (e: mEvent) => void) {}
/*
  回调中的参数 e 通过宽泛的mEvent定义的，传入mMouseEvent, 约束强的可以兼容约束弱的，约束弱的mEvent的没法兼容约束强的 eMouseEvent
  有点不明白这改怎么处理了？参数中传入mEvent的继承接口，或者实现implements的class 是常用的调用方法啊，为啥要报错呢？ 视频中也没有提到
*/
// listenEvent(mEventType.Mouse, (e: mMouseEvent) => console.log(e.x + ',' + e.y))

/*
  函数体中中转换成子接口类型
*/
listenEvent(mEventType.Mouse, (e: mEvent) =>
  console.log((<mMouseEvent>e).x + ',' + (<mMouseEvent>e).y)
)

/*
  泛型来描述 回调函数的参数
*/
listenEvent(mEventType.Keyboard, <(e: mEvent) => void>(
  ((e: mKeyEvent) => console.log(e.keyCode))
))

/* TS 检测属性是否匹配 */

/*
  类型之间的逻辑 & 与
*/
interface A {
  length: number
  name: string
}

interface B {
  length: number
  age: number
}

function getPerso(a: A & B): void {}

getPerso({ name: 's', age: 2, length: 10 })

/*
  联合类型只能提示 A 和 B 共有的熟悉
*/
function getP2(a: A | B): void {
  a.length
}
/*
  type 类型别名， 不支持继承 extends 和 implements
  当无法用接口描述的时候，可以选择这种方式
*/
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
/*
  this 链式调用
*/
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value
  }
  public add(operand: number): this {
    this.value += operand
    return this
  }
  public multiply(operand: number): this {
    this.value *= operand
    return this
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2)
  .multiply(5)
  .add(1)
  .currentValue()
