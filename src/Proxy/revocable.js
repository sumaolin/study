let target = {}
let handler = {}
let { proxy, revoke } = Proxy.revocable(target, handler)

target.name = 'su'
console.log(proxy.name)

revoke()
/*
  TypeError: Cannot perform 'get' on a proxy that has been revoked
*/
// console.log(proxy.name)

let sensitiveData = { username: 'devbryce' }

const { sensitiveDataproxy, revokeAccess } = Proxy.revocable(
  sensitiveData,
  handler
)

function handleSuspectedHack() {
  revokeAccess()
}

console.log(sensitiveDataproxy.username)
handleSuspectedHack()
console.log(sensitiveDataproxy.username)
