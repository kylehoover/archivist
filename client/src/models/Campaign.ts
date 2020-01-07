import { observable } from 'mobx'

class Campaign {
  @observable public name: string

  constructor(name: string) {
    this.name = name
  }
}

export default Campaign
