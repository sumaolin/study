interface Counter {
  (start: string): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = <Counter>function(start: string) {
    console.log('start is ' + start)
  }

  counter.interval = 10
  counter.reset = function() {
    console.log('do you want reset you counter?')
  }

  return counter
}

let c = getCounter()
c('10')
c.reset()
c.interval = 1
console.dir(c)
