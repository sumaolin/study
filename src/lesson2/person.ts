enum Choose {
  wife,
  mother = 5
}

function question(choose: Choose): void {
  console.log('你老婆和你妈妈同时掉水里你先救哪个？')
  console.log('你的选择是：' + choose)
}
class Person {
  name: string
  age: number
  labels: Array<string>
  wives: string[]
  contract: [string, number]
  other: any
  saveMother: boolean = true

  constructor() {}

  answer(): Choose {
    if (this.saveMother === false) {
      return Choose.wife
    } else {
      return Choose.mother
    }
  }

  hello(): void {
    console.log(`hello~ i'm ` + this.name)
    // return undefined
    // return null
  }

  empty() {}
  down(): never {
    while (true) {}
    // throw new Error('error')
  }
}

let zhangsan = new Person()
zhangsan.name = '张三'
zhangsan.age = 28
zhangsan.labels = ['f2e', 'coder']
zhangsan.wives = ['z1', 'z2', 'z2']
zhangsan.contract = ['Beijing', 123]
zhangsan.saveMother = false
zhangsan.other = 'no good guys'

let len = (<string>zhangsan.other).length
console.log(len)

question(zhangsan.answer())

zhangsan.hello()

console.log(zhangsan.empty())
