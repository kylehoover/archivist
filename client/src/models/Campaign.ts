import { makeObservable, observable } from 'mobx'

class Campaign {
  public name: string

  constructor(name: string) {
    makeObservable(this, {
      name: observable,
    })
    
    this.name = name
  }
}

export default Campaign
