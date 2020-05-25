import CampaignStore from './CampaignStore'
import UserStore from './UserStore'

class RootStore {
  private _campaignStore: CampaignStore
  private _userStore: UserStore

  constructor() {
    this._campaignStore = new CampaignStore(this)
    this._userStore = new UserStore(this)
  }

  public get campaignStore(): CampaignStore {
    return this._campaignStore
  }

  public get userStore(): UserStore {
    return this._userStore
  }
}

export default RootStore