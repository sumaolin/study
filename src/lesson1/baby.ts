export class Baby {
  private _name: string

  constructor(name: string) {
    this._name = name
    console.log('小宝贝正在哭泣，哇哇哇……')
  }

  static smile() {
    console.log('小宝贝正在笑！')
  }
  /**
   * getBabyName
   */
  public getBabyName(): string {
    return this._name
  }
}

export let baby = new Baby('Nico')
