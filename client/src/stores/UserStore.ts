import { action, observable, runInAction } from 'mobx'

import RootStore from './RootStore'
import { User } from '../models'
// import { getCurrentUser } from '../graphql'

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
    // if (this.currentUser !== undefined) {
    //   return
    // }

    // const response = await getCurrentUser()

    // if (!response.hasError)
  }

  public async loginUser(email: string, password: string): Promise<void> {
    if (this.currentUser !== undefined) {
      return
    }

    this.currentUser = new User('1', 'Name', 'email', {
      canApproveUserRegistrationRequests: false,
      canEditAppSettings: false,
      canEditUserRoles: false,
      canInviteUsers: false,
    })
  }
}

export default UserStore
