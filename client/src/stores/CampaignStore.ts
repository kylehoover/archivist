import RootStore from './RootStore'

class CampaignStore {
  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore
  }
}

export default CampaignStore
