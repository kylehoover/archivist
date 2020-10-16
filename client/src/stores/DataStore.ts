import { action, makeObservable, observable } from 'mobx'

export class DataStore {
  public hasCompletedInitialLoad: boolean
  public needsToLoadData: boolean

  constructor() {
    makeObservable(this, {
      clear: action.bound,
      handleDidLoadData: action.bound,
      hasCompletedInitialLoad: observable,
      needsToLoadData: observable,
      setNeedsToLoadData: action.bound,
    })

    this.hasCompletedInitialLoad = false
    this.needsToLoadData = true
  }

  public clear(): void {
    this.hasCompletedInitialLoad = false
    this.needsToLoadData = true
  }

  public handleDidLoadData(): void {
    this.hasCompletedInitialLoad = true
    this.needsToLoadData = false
  }

  public setNeedsToLoadData(): void {
    this.needsToLoadData = true
  }
}
