import RootStore from './RootStore'

class UserStore {
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  public get userName(): string {
    return 'The user\'s name'
  }
}

export default UserStore
