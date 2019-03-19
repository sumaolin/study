let target = {
  _prop: 'foo',
  prop: 'foo2'
}
let handler = {
  get: function(target, prop, receiver) {
    return Reflect.get(target, prop, receiver)
  },
  set: function(target, prop, value, receiver) {
    let originVal = target[prop]
    // let argeVal = value
    console.log(`originValue : ${originVal}`)
    console.log(`will set value : ${value}`)
    target[prop] = value // 这个是改变 值的设置，不写不获取不到新赋值的属性值
    // return false
    // return value
    return true // 测试写不写都没问题
  }
}

let proxy = new Proxy(target, handler)
/*
  对target 的添加新属性，proxy也会有
  对proxy设置新属性，target属性也会更新
*/
proxy._prop = 'bar'
target.name = 'su'

console.log(target._prop)
console.log(proxy._prop)
console.log(proxy.name)
