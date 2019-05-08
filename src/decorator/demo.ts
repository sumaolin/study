/*
 * @Author: Kevin.Su
 * @Date: 2019-05-08 11:55:00
 * @Last Modified by: Kevin.su
 * @Last Modified time: 2019-05-08 14:25:15
 */

/* 类的 decorator */
// class Cat {
//   say() {
//     console.log('meow ~')
//   }
// }

function isAnimate(target: any) {
  target.isAnimate = true
  return target
}

@isAnimate
class Cat {
  static isAnimate: false
}

console.log(Cat.isAnimate)
