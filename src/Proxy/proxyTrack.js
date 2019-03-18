const defaultOptions = {
  trackFunctions: true,
  trackProps: true,
  trackTime: true,
  trackCaller: true,
  trackCount: true,
  stdout: null,
  filter: null
}
let callerMap = {}

function trackObject(obj, opt) {
  const { trackFunctions, trackProps } = opt
  let resultObj = obj
  if (trackFunctions) {
    proxyFunctions(resultObj, opt)
  }

  if (trackProps) {
    resultObj = new Proxy(resultObj, {
      get: trackPropertyGet(opt), // proverty get proxy
      set: trackPropertySet(opt)
    })
  }
  return resultObj
}
/*
  代理object上的function
  reference: http://es6.ruanyifeng.com/#docs/proxy#apply
*/
function proxyFunctions(trackedEntity, opt) {
  if (typeof trackedEntity === 'function') return
  Object.getOwnPropertyNames(trackedEntity).forEach(name => {
    if (typeof trackedEntity[name] === 'function') {
      trackedEntity[name] = new Proxy(trackedEntity[name], {
        apply: trackFunctionCall(opt)
      })
    }
  })
}

function trackPropertySet(opts = {}) {
  return function set(target, prop, value, receiver) {
    const { trackCaller, trackCount, stdout, filter } = opts
    const error = trackCaller && new Error()
    const caller = getCaller(error) // 调用函数

    const contextName =
      target.constructor.name === 'Object' ? '' : `${target.constructor.name}`
    const name = `${contextName}.${prop} `
    const hashkey = `set_${name}`

    if (trackCount) {
      if (!callerMap[hashkey]) {
        callerMap[hashkey] = 1
      } else {
        callerMap[hashkey]++
      }
    }

    let output = `${name} is being set `
    if (trackCaller) {
      output += `by ${caller.name} `
    }
    if (trackCount) {
      output += `for the ${callerMap[hashkey]} `
    }
    let canReport = true
    if (filter) {
      canReport = filter({
        type: 'get',
        prop,
        name,
        caller,
        count: callerMap[hashkey],
        value
      })
    }
    if (canReport) {
      if (stdout) {
        stdout(output)
      } else {
        console.log(output)
      }
    }
    return Reflect.set(target, prop, value, receiver) // 继续设置原理对象的属性设置
  }
}

function trackPropertyGet(opt = {}) {
  return function get(target, prop, receiver) {
    const { trackCaller, trackCount, filter, stdout } = opt
    if (typeof target[prop] === 'function' || prop === 'prototype') {
      return target[prop]
    }
    const error = trackCaller && new Error()
    const caller = getCaller(error)
    const contextName =
      target.constructor.name === 'Object' ? '' : `${target.constructor.name}`
    const name = `${contextName}.${prop}`
    const hashkey = `get_${name}`

    if (trackCount) {
      if (!callerMap[hashkey]) {
        callerMap[hashkey] = 1
      } else {
        callerMap[hashkey]++
      }
    }

    let output = ''
    if (trackCaller) {
      output = `${name} is being get `
    }

    if (trackCount) {
      output += `for the ${callerMap[hashkey]} time `
    }

    let canReport = true
    if (filter) {
      canReport = {
        type: 'get',
        prop,
        name,
        caller,
        count: callerMap[hashkey]
      }
    }

    if (canReport) {
      if (stdout) {
        stdout(output)
      } else {
        console.log(output)
      }
    }
    return target[prop]
  }
}
/*

*/
function trackFunctionCall(opts = {}) {
  return function(target, thisArg, argumentsList) {
    const { trackTime, trackCaller, trackCount, stdout, filter } = opts

    const error = trackCaller && new Error()
    const caller = getCaller(error)
    const name = getFunctionName(target, thisArg)
    if (trackCount) {
      if (!callerMap[name]) {
        callerMap[name] = 1
      } else {
        callerMap[name]++
      }
    }

    let start, end
    if (trackTime) {
      start = Date.now()
    }

    const retVal = target.apply(thisArg, argumentsList)
    if (trackTime) {
      end = Date.now()
    }

    let output = `${name} was called `
    if (trackCaller) {
      output += `by ${caller.name}（） `
    }

    if (trackCount) {
      output += `for the ${callerMap[name]} time `
    }
    if (trackTime) {
      output += `and took ${end - start} mils. `
    }

    let canReport = true
    if (filter) {
      canReport = filter({
        type: 'function',
        name,
        caller,
        count: callerMap[name],
        time: end - start
      })
    }
    if (canReport) {
      if (stdout) {
        stdout(output)
      } else {
        console.log(output)
      }
    }
    return retVal
  }
}

function getFunctionName(fn, context) {
  let contextName = ''
  if (typeof context === 'function') {
    contextName = `${context.name}`
  } else if (
    context &&
    context.constructor &&
    context.constructor.name !== 'Object'
  ) {
    contextName = `${context.constructor.name}`
  }

  return `${contextName}.${fn.name}`
}
function getCaller(e) {
  if (e && e.stack) {
    const lines = e.stack.split('\n')
    console.log(lines)
    if (lines.length > 2) {
      let match = lines[2].match(/at ([a-zA-Z\-_$.]+) (.*)/)
      if (match) {
        return {
          name: match[1].replace(/^Proxy\./, ''),
          file: match[2]
        }
      } else {
        match = lines[2].match(/at (.*)/)
        if (match) {
          return {
            name: 'unknown',
            file: match[1]
          }
        }
      }
    }
  }

  return {
    name: 'unknown',
    file: ''
  }
}

function trackClass(cls, opts) {
  cls.prototype = trackObject(cls.prototype, opts)
  cls.prototype.constructor = cls

  return new Proxy(cls, {
    construct(Target, args) {
      const newObj = new Target(...args)
      return new Proxy(newObj, {
        get: trackPropertyGet(opts),
        set: trackPropertySet(opts)
      })
    },
    apply: trackFunctionCall(opts)
  })
}

function proxyTrack(entity, options = defaultOptions) {
  // what difference  trackClass with trackObject ? just one leval
  if (typeof entity === 'function') {
    return trackClass(entity, options)
  } else {
    return trackObject(entity, options)
  }
}
/*

  proxyTrack use
*/
function myClass() {}

myClass.prototype = {
  isPrime: function() {
    const num = this.num
    for (let i = 2; i < num; i++) {
      if (num % i === 0) {
        return false
      }
    }
    return num !== 1 && num !== 0
  }
}

myClass.prototype.constructor = myClass

const TrackedClass = proxyTrack(myClass)

function start() {
  const my = new TrackedClass()
  my.num = 2343
  if (!my.isPrime()) {
    return `${my.num} is not prime`
  }
}

function main() {
  start()
}

main()
