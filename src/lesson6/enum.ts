enum enumA {
  a
}

console.log(enumA.a)

let str = 'something'

enum test {
  test01
}

enum FileAccess {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  Test = test.test01
  // O = str.length
}

console.log(FileAccess.None)

enum enumDemo2 {
  c,
  a = 4,
  b
}

console.log(enumDemo2.c)
/*

常量 枚举 编译后不会输出代码，只可以在ts中访问

*/
const enum FileAccess2 {
  None,
  Read = 1 << 1,
  Write = 1 << 2,
  ReadWrite = Read | Write,
  Test = test.test01
}

// console.log(FileAccess2)
