function createValidator(target, validator) {
  return new Proxy(target, {
    _validator: validator,
    set(target, prop, value, receiver) {
      if (target.hasOwnProperty(prop)) {
        let validator = this._validator[prop]
        if (validator(value)) {
          return Reflect.set(target, prop, value, receiver)
        } else {
          console.log(`cannot set ${prop} to ${value}. Invalid`)
          throw Error(`cannot set ${prop} to ${value}. Invalid`)
        }
      } else {
        throw Error(`${prop} is not a valid proverty`)
      }
    }
  })
}

class Person {
  constructor(name, age) {
    this.age = age
    this.name = name
    return createValidator(this, personValidators)
  }
}

const personValidators = {
  name(val) {
    return typeof val === 'string'
  },
  age(val) {
    return typeof val === 'number' && val > 18
  }
}

let su = new Person('Sumaolin', 12) // new时候不校验
console.log(su)

// su.age = 'su'

su.wo = 'maolin' //
// su.age = 70
console.log(su)
