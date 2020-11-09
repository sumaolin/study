const count: number = 1
const name2: string = 'su'

const xiaojie: {
  name: string
  age: number
} = {
  name: 'dajia',
  age: 2,
}

function add({ one, two }: { one: number; two: number }) {
  return one + two
}

const total = add({ one: 2, two: 1 })
