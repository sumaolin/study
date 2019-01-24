interface Db {
  host: string
  port: number
}

interface connectFun {
  (option: DB): string
}

let connect: connectFun = function(opt: Db) {
  return ''
}
