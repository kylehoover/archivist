import { DataService } from './DataService'
import { Campaign, NewCampaignFields, UpdatedCampaignFields } from '../models'

export interface CampaignService extends DataService<
  Campaign,
  NewCampaignFields,
  UpdatedCampaignFields
> {}
