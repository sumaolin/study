module.exports = {
  login: async (username, password) => {
    if (username == 'sumaolin' && password == '123456') {
      return `welcome ${username}`
    } else {
      return 'error password!'
    }
  }
}
