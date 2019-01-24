interface myDate {
  year: string
  month: string
  day: string
}
interface MyDateInit {
  new (year: string, month: string, day: string): myDate
}

// class DateClass implements myDate {
//   year: string
//   month: string
//   day: string
//   constructor(year: string, month: string, day: string) {
//     this.year = year
//     this.month = month
//     this.day = day
//     return this
//   }
// }

// function getDate(Class: MyDateInit, { year, month, day }): myDate {
//   return new Class(year, month, day)
// }

// getDate(DateClass, { year: '2017', month: '2', day: '3' })

let some: MyDateInit = class SomeDate implements myDate {
  year: string
  month: string
  day: string
  constructor(year: string, month: string, day: string) {}
}

let d = new some('2019', '01', '24')
