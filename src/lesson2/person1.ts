enum Choose {
  wife,
  mother
}

function question(choose: Choose): void {
  console.log('你老婆和你妈妈同时掉水里你先救哪个？')
  console.log('你的选择是：' + choose)
}

question(Choose.mother)
