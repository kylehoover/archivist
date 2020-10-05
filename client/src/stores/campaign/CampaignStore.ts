import { action, computed, makeObservable, observable } from 'mobx'

import RootStore from '../RootStore'
import { Campaign } from '../../models'

class CampaignStore {
  public campaigns: { [campaignId: string]: Campaign }
  public hasLoadedOnce: boolean

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    makeObservable(this, {
      addCampaigns: action.bound,
      campaigns: observable,
      campaignsList: computed,
      hasLoadedOnce: observable,
      setHasLoadedOnce: action.bound,
    })

    this.campaigns = {}
    this.hasLoadedOnce = false
    this.rootStore = rootStore
  }

  public get campaignsList(): Campaign[] {
    return Object.values(this.campaigns)
  }

  public addCampaigns(campaigns: Campaign[]): void {
    campaigns.forEach(campaign => {
      this.campaigns[campaign.id] = campaign
    })
  }

  public setHasLoadedOnce(value: boolean): void {
    this.hasLoadedOnce = value
  }
}

export default CampaignStore
