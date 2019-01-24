interface DB {
  host: string
  port: number
}

class Mysql implements DB {
  host: string
  port: number
  constructor(host: string, port: number) {
    this.host = host
    this.port = port
    console.log(`正在连接${this.host} : ${this.port}数据库`)
  }
}

const driver = new Mysql('localhost', 2019)
