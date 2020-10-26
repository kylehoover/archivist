import { DataService } from './DataService'
import { Campaign, CampaignFields, NewCampaignFields, UpdatedCampaignFields } from '../models'

export interface CampaignService extends
  DataService<Campaign, NewCampaignFields, UpdatedCampaignFields, CampaignFields> {}
