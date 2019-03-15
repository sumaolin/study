const defaultOptions = {
  trackFunctions: true,
  trackProps: true,
  trackTime: true,
  trackCaller: true,
  trackCount: true,
  stdout: null,
  filter: null
}
let callerMap

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

function proxyFunctions(trackedEntity, opt) {
  if (typeof trackedEntity === 'function') return
  Object.getOwnPropertyNames.forEach(name => {
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
    const name = `${contextName}${prop}`
    const hashkey = `set_${name}`

    if (trackCount) {
      if (!callerMap[hashkey]) {
        callerMap[hashkey] = 1
      } else {
        callerMap[hashkey]++
      }
    }

    let output = `${name} is being set`
    if (trackCaller) {
      output += ` by ${caller.name}`
    }
    if (trackCount) {
      output += ` for the ${callerMap[hashkey]}`
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

function trackPropertyGet(opt) {}
function trackFunctionCall(opt) {}
function getCaller(e) {}

function trackClass(cls, opts) {
  cls.prototype = trackObject(cls.prototype, opts)
  cls.prototype.constructor = cls

  return new Proxy(cls, {
    construct(target, args) {
      const newObj = new target(...args)
      return new Proxy(newObj, {
        get: trackPropertyGet(opts),
        set: trackPropertySet(opts)
      })
    },
    apply: trackFunctionCall(opts)
  })
}

export function proxyTrack(entity, options = defaultOptions) {
  // what difference  trackClass with trackObject ? just one leval
  if (typeof entity === 'function') return trackClass(entity, options)
  return trackObject(entity, options)
}
