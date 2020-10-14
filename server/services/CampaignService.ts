import { DataService } from './DataService'
import { Campaign, NewCampaignFields, UpdatedCampaignFields } from '../models'
import { UserIdService } from './types'

export interface CampaignService extends
  DataService<Campaign, NewCampaignFields, UpdatedCampaignFields>,
  UserIdService<Campaign> {}
