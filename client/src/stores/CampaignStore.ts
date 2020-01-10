import { action, observable } from 'mobx'

import Campaign from '../models/Campaign'

class CampaignStore {
  @observable public campaigns: Campaign[] = []

  @action.bound
  public addCampaign(): void {
    this.campaigns.push(new Campaign('NEW Campaign'))
  }
}

export default CampaignStore
