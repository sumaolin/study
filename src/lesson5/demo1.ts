/*
  函数中参数或者返回值的类型，再调用时候再约定起类型
*/
function demof1<T>(a: T[]): T {
  return a[0]
}

function demof2<T>(a: Array<T>): T {
  return a[0]
}

let demof3: <T>(a: T[]) => T = function(a) {
  return a[0]
}
/*
  函数接口泛型
*/
interface demof4<T> {
  (a: T): T
}

let demo5: demof4<string>
demo5 = function(a) {
  return ''
}

/*
  类的泛型
*/

class Person1<T, U> {
  name: T
  age: U
}

let p1 = new Person1<string, number>()

/*
  泛型作为一种特殊类型，可以继承接口 extends Interface
  限制了参数必须有接口中的属性
*/
interface Person2 {
  age: number
  name: string
}

function getPerson<T extends Person2>(p: T): string {
  return p.age + ' ' + p.name // 直接提示age & name 的数据
}
