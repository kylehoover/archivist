import { action, computed, makeObservable, observable } from 'mobx'

import { Campaign } from '../../models'
import { CampaignType } from '../../graphql'
import { DataStore } from '../DataStore'
import { RootStore } from '../root'

export class CampaignStore extends DataStore {
  public campaigns: { [campaignId: string]: Campaign }

  private rootStore: RootStore

  constructor(rootStore: RootStore) {
    super()

    makeObservable(this, {
      addCampaigns: action.bound,
      campaigns: observable,
      campaignsList: computed,
    })

    this.campaigns = {}
    this.rootStore = rootStore
  }

  public get campaignsList(): Campaign[] {
    return Object.values(this.campaigns)
  }

  public addCampaigns(campaigns: CampaignType[]): void {
    campaigns
      .map(campaignType => Campaign.fromGraphQLType(campaignType))
      .forEach(campaign => {
        this.campaigns[campaign.id] = campaign
      })
  }
}
