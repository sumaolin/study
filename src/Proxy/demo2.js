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

proxyCar.maker = ''
proxyCar.year = 'sl'
proxyCar.year = 1986
