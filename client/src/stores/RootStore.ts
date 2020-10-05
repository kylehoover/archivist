import UserStore from './UserStore'
import { CampaignStore } from './campaign'

class RootStore {
  public readonly campaignStore: CampaignStore
  public readonly userStore: UserStore

  constructor() {
    this.campaignStore = new CampaignStore(this)
    this.userStore = new UserStore(this)
  }
}

export default RootStore