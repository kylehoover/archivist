import { action, observable } from 'mobx'

import Campaign from '../models/Campaign'

class CampaignStore {
  @observable public campaigns: Campaign[] = []

  @action.bound
  public addCampaign(name: string): void {
    this.campaigns.push(new Campaign(name))
  }
}

export default CampaignStore
