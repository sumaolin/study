/*
  泛型继承类
*/
class BeeKeeper {
  hasMask: boolean
}

class ZooKeeper {
  constructor(public nametag: string) {}
}

class Animal {
  numLegs: number
}

class Bee extends Animal {
  keeper: BeeKeeper
}

class Lion extends Animal {
  static keeper: ZooKeeper = new ZooKeeper('Kevin')
}

function findKeeper<A extends Animal, K>(a: { new (): A; keeper: K }): K {
  return a.keeper
}

let kname = findKeeper(Lion).nametag
console.log(kname)

/*
  第二种写法
*/

interface FindK<A, K> {
  new (): A
  keeper: K
}

function findK<A, K>(a: FindK<A, K>): K {
  return a.keeper
}
