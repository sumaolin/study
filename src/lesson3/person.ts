interface PersonID {
  readonly IdCard: string
  [propsName: string]: string
}

class Ergou implements PersonID {
  readonly IdCard: string
  [propsName: string]: string
  constructor() {}
}

const SanGou: PersonID = { IdCard: '1323424', wo: '32', w2: '234' }

function getPerson(p: PersonID) {}

getPerson({ IdCard: '342342423', name: 'err', b: 'we' })
