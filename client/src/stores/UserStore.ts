import { action, observable } from 'mobx'

import RootStore from './RootStore'
import { User } from '../models'

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

  public async loginUser(email: string, password: string): Promise<User> {
    if (this.currentUser !== undefined) {
      throw new Error('User is already logged in')
    }

    this.currentUser = new User('1', 'Name', 'email', {
      canApproveUserRegistrationRequests: false,
      canEditAppSettings: false,
      canEditUserRoles: false,
      canInviteUsers: false,
    })

    return this.currentUser
  }
}

export default UserStore
