import { CampaignStore } from '../campaign'
import { UserStore } from '../user'

export class RootStore {
  public readonly campaignStore: CampaignStore
  public readonly userStore: UserStore

  constructor() {
    this.campaignStore = new CampaignStore(this)
    this.userStore = new UserStore(this)
  }

  public clearStores = (): void => {
    this.userStore.clear()
    this.campaignStore.clear()
  }
}
