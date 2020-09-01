import { action, observable, runInAction } from 'mobx'

import RootStore from './RootStore'
import { User } from '../models'
import { getCurrentUser, loginUser, logoutUser } from '../graphql'

class UserStore {
  private rootStore: RootStore

  @observable public currentUser?: User

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }

  @action.bound
  public clearCurrentUser(): void {
    this.currentUser = undefined
  }

  public async loadCurrentUser(): Promise<void> {
    if (this.currentUser !== undefined) {
      return
    }

    const user = await getCurrentUser()

    runInAction(() => {
      this.currentUser = User.fromGraphQLType(user)
    })
  }

  public loginUser = async (email: string, password: string): Promise<void> => {
    if (this.currentUser !== undefined) {
      throw new Error('User is already logged in')
    }

    const user = await loginUser({ email, password })

    runInAction(() => {
      this.currentUser = User.fromGraphQLType(user)
    })
  }

  public async logoutUser(): Promise<void> {
    if (this.currentUser === undefined) {
      throw new Error('User is not logged in')
    }

    await logoutUser()

    runInAction(() => {
      this.currentUser = undefined
    })
  }
}

export default UserStore
