import { action, makeObservable, observable, runInAction } from 'mobx'

import { RootStore } from '../root'
import { User } from '../../models'
import { fetchCurrentUser, loginUser, logoutUser } from '../../graphql'

export class UserStore {
  public currentUser?: User

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      clearCurrentUser: action.bound,
      currentUser: observable,
      loadCurrentUser: action.bound,
      loginUser: action.bound,
      logoutUser: action.bound,
    })

    this.rootStore = rootStore
  }

  public clearCurrentUser(): void {
    this.currentUser = undefined
  }

  public async loadCurrentUser(): Promise<void> {
    if (this.currentUser !== undefined) {
      return
    }

    const user = await fetchCurrentUser()

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
