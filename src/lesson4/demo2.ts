let add1 = function(x: number, y: number): number {
  return x + y
}

function add2(x: number, y: number): number {
  return x + y
}

let add3: (x: string, y: number) => string = function(x, y) {
  return x + y
}
/*

没大括号的表达式，默认第一个表达式的结果为函数的 返回结果

*/
let add4 = (x: any, y: any) => x + y

/*
  add5 默认推断 void
*/
let add5 = (x: number, y: string) => {
  x + y
}

let add6: (a: number, b: number) => number = function(
  x: number,
  y: number
): number {
  return x + y
}
/*
  错误示范
*/

let add7: (a: number, b: number) => number = function add8(
  x: number,
  y: number
): number {
  return x + y
}

// add8()

let add10: (a: string, b: string) => string = function(x, y) {
  return x
}

function add11(x: string, y: string): string {
  return x
}

interface Add {
  (x: string, y: string): string
}

let a1: Add = function(x, y) {
  return x + y
}

a1('2', '2')
