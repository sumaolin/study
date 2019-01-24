interface GrandFather {
  readonly jiyin: string
}

class Father implements GrandFather {
  readonly jiyin: string
  protected surname: string
  private sifangqian: number
  public age: number
  name: string
  constructor() {
    this.jiyin = 'dou bi!'
    this.surname = '陈'
  }
}

class Son extends Father {
  constructor(name: string, age: number) {
    super()
    this.name = name
    this.age = age
    console.log(
      `${this.age}岁的${this.surname} ${this.name}具有${this.jiyin}的基因`
    )
  }
}

const s = new Son('小米', 32)

console.log(s.jiyin)
