// let [a, b, c] = [1, 2, 3]
// console.log(a, b, c)

// let [, , alex] = [2, 4, 8]
// console.log(alex)

// let [alex, ...restV] = [1, 3, 5]
// console.log(alex)
// console.log(restV)

function say1({ x, y } = { x: 9, y: 10 }) {
  console.log(x, y)
}

function say2({ x = 0, y = 2 }) {
  console.log(x, y)
}
function say3({ x = 0, y = 2 } = { x: 10, y: 8 }) {
  console.log(x, y)
}

say1()
say1({ x: 3, y: 5 })

say2({})
say2({ x: 3, y: 5 })

say3()
say3({})
