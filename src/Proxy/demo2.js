import { proxyTrack } from './proxyTrack'

const Car = {
  maker: 'BMW',
  year: '2019'
}

const proxyCar = new Proxy(Car, {
  set(obj, prop, value) {
    if (prop === 'maker' && value === '') {
      throw new Error('Invalid maker')
    }

    if (prop === 'year' && typeof value !== 'number') {
      throw new Error('Invalid year!')
    }

    obj[prop] = value
    return true
  }
})

// proxyCar.maker = ''
// proxyCar.year = 'sl'
proxyCar.year = 1986

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
