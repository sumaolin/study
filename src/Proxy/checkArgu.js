let obj = {
  pickyMethodOne: function(obj, str, num) {},
  pickyMethodTwo: function(num, boj) {}
}

const argTypes = {
  pickyMethodOne: ['object', 'string', 'number'],
  pickyMethodTwo: ['number', 'object']
}

obj = new Proxy(obj, {
  get: function(target, prop, receiver) {
    let val = target[prop]
    return function(...args) {
      // console.log(args)
      argeChecker(prop, args, argTypes[prop])
      return Reflect.apply(val, target, args)
    }
  }
})

function argeChecker(name, args, checkers) {
  // console.log(args.length)
  for (let idx = 0; idx <= args.length - 1; idx++) {
    var arg = args[idx]
    var type = checkers[idx]
    // console.log(arg)
    // console.log(type)
    // eslint-disable-next-line valid-typeof
    if (!arg || typeof arg !== type) {
      console.warn(
        `you are incorrectly implementing the signature ${name}. check the ${idx +
          1} param`
      )
    }
  }
}
/*
  提示第几个参数错误，如果没有后面的参数就提示更多
*/
// obj.pickyMethodOne()

// obj.pickyMethodTwo('sting')

obj.pickyMethodOne({}, 'a little string', 123)
obj.pickyMethodOne(123, {})
